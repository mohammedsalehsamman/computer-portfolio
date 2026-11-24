import { useRef, useState, type FormEvent } from "react";
import { profile } from "@/content/profile";
import { useT } from "@/i18n/locale";
import { s } from "@/i18n/strings";
import { sfx } from "@/sound/sfx";

type Status = "idle" | "sending" | "sent" | "error" | "limited";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const empty = { name: "", email: "", subject: "", message: "", website: "" };

export default function Mail() {
  const { t } = useT();
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<Status>("idle");
  const [problem, setProblem] = useState<string | null>(null);
  const startedAt = useRef(Date.now());

  const set = (key: keyof typeof empty) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(form.email.trim())) return setProblem(t(s.mail.invalidEmail));
    if (form.message.trim().length < 10) return setProblem(t(s.mail.shortMessage));
    setProblem(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, startedAt: startedAt.current }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm(empty);
        sfx.chime();
      } else setStatus(res.status === 429 ? "limited" : "error");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    startedAt.current = Date.now();
    setStatus("idle");
  };

  if (status === "sent")
    return (
      <div className="doc mail-done">
        <div className="mail-check" aria-hidden="true">
          ✓
        </div>
        <p role="status">{t(s.mail.sent)}</p>
        <button className="btn" onClick={reset}>
          {t(s.mail.newMessage)}
        </button>
      </div>
    );

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message)}`;

  return (
    <form className="doc mail" onSubmit={submit} noValidate>
      <p className="muted">{t(s.mail.intro)}</p>
      <div className="mail-to bevel-in" dir="ltr">
        <span>To:</span> {t(profile.name)} &lt;{profile.email}&gt;
      </div>
      <div className="mail-row">
        <label>
          {t(s.mail.name)}
          <input className="field" value={form.name} onChange={set("name")} maxLength={100} required autoComplete="name" />
        </label>
        <label>
          {t(s.mail.email)}
          <input className="field" type="email" dir="ltr" value={form.email} onChange={set("email")} maxLength={200} required autoComplete="email" />
        </label>
      </div>
      <label>
        {t(s.mail.subject)}
        <input className="field" value={form.subject} onChange={set("subject")} maxLength={150} />
      </label>
      <label>
        {t(s.mail.message)}
        <textarea className="field" rows={7} value={form.message} onChange={set("message")} maxLength={5000} required />
      </label>
      {/* Honeypot: hidden from people, tempting for bots. */}
      <input className="mail-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={set("website")} name="website" />

      <div className="btn-row mail-actions">
        <button className="btn btn-primary" type="submit" disabled={status === "sending" || !form.name.trim()}>
          {status === "sending" ? t(s.mail.sending) : t(s.mail.send)}
        </button>
        <span className="mail-status" role="status" aria-live="polite">
          {problem ??
            (status === "limited" ? t(s.mail.tooMany) : status === "error" ? t(s.mail.failed) : "")}
        </span>
      </div>
      {status === "error" && (
        <a className="btn" href={mailto}>
          {t(s.mail.fallback)} ↗
        </a>
      )}
    </form>
  );
}
