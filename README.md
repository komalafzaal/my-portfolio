# Komal Afzaal – Portfolio Website

Personal portfolio of **Komal Afzaal**, Android & Flutter Developer. Built with Next.js and exported as a static site, with Capacitor wrappers so the same site can also ship as an Android and iOS app.

- LinkedIn: [linkedin.com/in/komalafzaal](https://www.linkedin.com/in/komalafzaal/)
- Upwork: [Komal Afzaal on Upwork](https://www.upwork.com/freelancers/~016983750864fbeaf5)

## Features

- **Home / Hero** – intro with quick links to projects and contact, then:
  - **App strip** – an endlessly scrolling row of app icons with name and one-line highlight, so visitors see the apps without scrolling. Pauses on hover; clicking an app scrolls to it in the slider.
  - **Stats panel** – years of experience, users reached, apps in production and first-try store approvals, with numbers that count up when they come into view.
- **About** – profile summary and "What I Offer" (mobile apps, web admin panels & backend, store launch).
- **Technical Expertise** – skills grouped into Languages, Mobile Development, Architecture & Quality, APIs & Integrations, State & Data, and Tools & Delivery.
- **Featured Projects slider** – auto-playing carousel (4.5 s per slide) of all projects (cover image + details side by side). Includes a progress bar, dots, prev/next arrows and keyboard arrows; pauses on hover/focus and when the tab is hidden, and doesn't autoplay for users who prefer reduced motion. A **View all projects** button opens the projects page.
- **All Projects page (`/projects`)** – grid of every project with cover, highlight pills, description, tech badges and store links (**App Store** / **Google Play** shown separately when both exist), plus a "Get in touch" call to action. Current projects, in order:
  1. Town – See Who's Around (AI-curated local events) – [App Store](https://apps.apple.com/us/app/town-see-whos-around/id6760225958)
  2. NKENNE – Learn African Languages (100K+ downloads, AI translation) – [App Store](https://apps.apple.com/us/app/nkenne-learn-african-language/id1587537473) · [Google Play](https://play.google.com/store/apps/details?id=com.triaxo.nkenne&hl=en)
  3. PowerUp – Personal Performance (AI health analysis) – [App Store](https://apps.apple.com/us/app/powerup-individual/id6743502030) · [Google Play](https://play.google.com/store/apps/details?id=com.powerupglobaluk.powerup&hl=en)
  4. LOOKEE® – Sleep Oxygen & ECG Monitor (Project Lead, 1K+ downloads) – [App Store](https://apps.apple.com/us/app/lookee/id6756679054) · [Google Play](https://play.google.com/store/apps/details?id=com.lookee.android&hl=en)
  5. Sleepover Shield
  6. Nature Rangers – Outdoor Learning
  7. Expense Tracker – Budget & Analytics
  8. NFC Container Tracking for Logistics
- **Experience** – timeline of roles.
- **Upwork** – nav link to the Upwork profile.
- **Contact** – contact form that sends email through [EmailJS](https://www.emailjs.com/), plus social links.
- Scroll-triggered fade-in animations and a responsive mobile menu.

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, static export via `output: 'export'`)
- React 18 + TypeScript
- Tailwind CSS 4 + [shadcn/ui](https://ui.shadcn.com/) components (Radix UI)
- [lucide-react](https://lucide.dev/) icons
- [EmailJS](https://www.emailjs.com/) (`@emailjs/browser`) for the contact form
- [Capacitor](https://capacitorjs.com/) for the Android and iOS app builds
- Deployed on [Vercel](https://vercel.com/)

## Prerequisites

- Node.js 18 or later and npm
- An EmailJS account (for the contact form)
- For native builds: Android Studio (Android) and Xcode on macOS (iOS)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables. Copy the example file and fill in your EmailJS values:

   ```bash
   cp .env.example .env.local
   ```

   | Variable | Description |
   | --- | --- |
   | `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID |
   | `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS email template ID |
   | `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |

   Never commit `.env.local`. It is already in `.gitignore`.

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Build the static site into `out/` |
| `npm run start` | Start the Next.js production server |
| `npm run lint` | Run Next.js linting |

### Native app builds (Capacitor)

The Capacitor app (`com.komal.portfolio`) serves the static export from `out/`.

```bash
npm run build          # generate out/
npx cap sync           # copy web assets into android/ and ios/
npx cap open android   # open in Android Studio
npx cap open ios       # open in Xcode
```

## Adding a Project

Projects are defined in the `projects` array in [`lib/projects.ts`](lib/projects.ts), which the home page slider, the hero app strip and the `/projects` page all read. Order matters: projects appear in this order everywhere. Each entry looks like this:

```ts
{
  title: "App Name",
  description: "Short description of what you built.",
  tech: ["Flutter", "Firebase"],
  image: "/app-name.png",              // file in public/, 1080×1080 works best
  link: "https://...",                 // optional – App Store / main link
  androidLink: "https://...",          // optional – adds a Google Play link
  highlights: ["100K+ downloads"],     // optional – green pills above the title
  shortName: "App Name",               // name shown in the hero app strip
  tagline: "100K+ downloads",          // one-liner under the name in the app strip
  icon: "/icons/app-name.png",         // square app icon in public/icons/ (128×128)
}
```

## Project Structure

```
app/
  layout.tsx          # root layout, fonts, metadata
  page.tsx            # single-page portfolio (hero, about, skills, featured slider, experience, contact)
  projects/page.tsx   # /projects – full project listing
  globals.css         # Tailwind setup + slider progress-bar and app-strip animations
components/
  project-slider.tsx  # auto-playing featured projects carousel (Embla)
  project-links.tsx   # store link buttons and highlight pills shared by slider and listing
  project-marquee.tsx # scrolling app strip in the hero
  count-up.tsx        # animated stat numbers
  theme-provider.tsx
  ui/                 # shadcn/ui components
hooks/                # use-mobile, use-toast
lib/
  projects.ts         # project data (order = display order)
  emailjs-config.ts   # EmailJS setup and send helper (reads env vars)
  utils.ts
public/               # project cover images and other static assets
  icons/              # 128×128 app icons used by the hero app strip
android/  ios/        # Capacitor native projects
capacitor.config.ts
next.config.mjs       # static export, unoptimized images
```
