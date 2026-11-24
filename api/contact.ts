/**
 * Vercel Function: POST /api/contact
 * Receives a message from the Samman OS "Mail" app and forwards it to the owner via Resend.
 *
 * Env:
 *   RESEND_API_KEY  (required) Resend API key
 *   CONTACT_TO      inbox that receives messages. With the default onboarding sender,
 *                   Resend only delivers to the Resend account's own email address.
 *   CONTACT_FROM    sender, e.g. "Portfolio <hello@your-domain.com>" once a domain is verified.
 *
 * Kept self-contained (no imports from src/) so the function bundles cleanly on its own.
 */
import { Resend } from "resend";

const DEFAULT_TO = "mohammedsalehsamman@gmail.com";
const DEFAULT_FROM = "Samman OS <onboarding@resend.dev>";
const MAX_BODY = 10_000;
const MIN_FILL_MS = 3_000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type Mail = { from: string; to: string; replyTo: string; subject: string; text: string };
export type Sender = (mail: Mail) => Promise<boolean>;
type Env = Record<string, string | undefined>;

/** Best-effort, per-instance limiter: serverless instances don't share memory. */
const hits = new Map<string, number[]>();

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8" } });

const clientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";

function rateLimited(ip: string, now: number) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function resendSender(apiKey: string): Sender {
  const resend = new Resend(apiKey);
  return async (mail) => {
    const { error } = await resend.emails.send(mail);
    if (error) console.error("resend error:", error.name, error.message);
    return !error;
  };
}

export async function handleContact(
  request: Request,
  opts: { send?: Sender; now?: number; env?: Env } = {},
): Promise<Response> {
  const env = opts.env ?? process.env;
  const now = opts.now ?? Date.now();

  if (!(request.headers.get("content-type") ?? "").includes("application/json")) return json(415, { error: "unsupported_type" });
  const raw = await request.text();
  if (raw.length > MAX_BODY) return json(413, { error: "too_large" });
  if (rateLimited(clientIp(request), now)) return json(429, { error: "rate_limited" });

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return json(400, { error: "invalid_json" });
  }

  const name = str(body.name);
  const email = str(body.email);
  const subject = str(body.subject);
  const message = str(body.message);
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : NaN;

  // Bots: a filled honeypot or an instant submit gets a silent success and no email.
  if (str(body.website) || !Number.isFinite(startedAt) || now - startedAt < MIN_FILL_MS) return json(200, { ok: true });

  if (!name || name.length > 100) return json(400, { error: "invalid_name" });
  if (!EMAIL_RE.test(email) || email.length > 200) return json(400, { error: "invalid_email" });
  if (subject.length > 150) return json(400, { error: "invalid_subject" });
  if (message.length < 10 || message.length > 5000) return json(400, { error: "invalid_message" });

  let send = opts.send;
  if (!send) {
    const key = env.RESEND_API_KEY;
    if (!key) return json(500, { error: "not_configured" });
    send = resendSender(key);
  }

  const ok = await send({
    from: env.CONTACT_FROM || DEFAULT_FROM,
    to: env.CONTACT_TO || DEFAULT_TO,
    replyTo: email,
    subject: `[Portfolio] ${subject || `Message from ${name}`}`.slice(0, 200),
    text: `From: ${name} <${email}>\nSent from Samman OS (portfolio contact form)\n\n${message}`,
  });
  return ok ? json(200, { ok: true }) : json(502, { error: "send_failed" });
}

export function POST(request: Request) {
  return handleContact(request);
}
