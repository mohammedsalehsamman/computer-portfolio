# Samman OS: 3D portfolio of Mohammed Saleh Samman

This is an interactive portfolio. Visitors sit down at a retro computer on a desk, and the screen runs **Samman OS**, a small desktop with windows.

The OS has these apps: About, Experience, Projects, Skills, Contact, Mail, Resume, Terminal and Solitaire.

It is built with Vite, React, TypeScript, React Three Fiber and zustand. Everything works in both English and Arabic, with right-to-left layout for Arabic.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5173  (add ?mode=2d, ?mode=3d, ?lang=ar or ?lang=en)
pnpm build      # type-check, then build into dist/
pnpm preview
```

The portfolio content (profile, experience, projects, case studies, interface text) lives in `src/content/`. It was copied from portfolio-v2. Edit it there, and both the OS and the plain HTML pages update.

## Deploy on Vercel

1. Import the repository in Vercel. It detects Vite automatically: the build command is `pnpm build` and the output directory is `dist`.
2. Add these **Environment Variables**:

| Name | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes, for the Mail app | API key from <https://resend.com> |
| `CONTACT_TO` | recommended | Inbox that receives messages. While you use the default sender (`onboarding@resend.dev`), Resend only delivers to **the email address of your Resend account**, so put that address here. |
| `CONTACT_FROM` | optional | Sender address, for example `Portfolio <hello@your-domain.com>`. You can use your own address once your domain is verified in Resend. |
| `VITE_SITE_URL` | recommended | Final public URL, for example `https://samman.dev`. It is used for the canonical link, Open Graph tags, `sitemap.xml` and `robots.txt`. Without it, the build falls back to `profile.links.portfolio`. |

3. Redeploy after you change `VITE_SITE_URL`, because it is baked in at build time.

`api/contact.ts` is a Vercel Function (`POST /api/contact`). It checks each message before sending:

- It validates every field.
- It silently drops bots, using a honeypot field and a minimum time to fill the form.
- It limits each IP address to 5 messages per 10 minutes. This limit is best-effort: each serverless instance counts separately.
- It sends the email through Resend with **Reply-To** set to the visitor's address.

During `pnpm dev` the endpoint does not exist. The Mail app then shows an error and a `mailto:` fallback. Use `vercel dev` to run the function locally.

## SEO and sharing

The `seo` plugin in `scripts/seo.ts` generates these at build time from `src/content`:

- Open Graph and Twitter tags, a canonical link and a JSON-LD `Person` block in `index.html`.
- `/simple/` and `/simple/ar/`: fast, fully readable HTML versions of the portfolio, for search engines and busy recruiters.
- `robots.txt` and `sitemap.xml`.

`public/og.png` is the 1200×630 image shown when the link is shared.

## Room interactions

Several objects on the desk open apps:

| Object | Opens |
|---|---|
| Poster | About |
| Floppy disks | Projects |
| Bookshelf | Skills |
| Notebook | Experience |
| Mug | Solitaire |
| Sticky note | Resume |
| Envelope | Mail |

The other interactions:

- **Lamp:** clicking it switches the light on and off.
- **Window:** the view follows the visitor's local time (dawn, day, dusk, night).
- **Screensaver:** starts after one minute without input on the OS. You can also start it from the Start menu.
