# Komal Afzaal – Portfolio Website

Personal portfolio of **Komal Afzaal**, Android & Flutter Developer. Built with Next.js and exported as a static site, with Capacitor wrappers so the same site can also ship as an Android and iOS app.

- LinkedIn: [linkedin.com/in/komalafzaal](https://www.linkedin.com/in/komalafzaal/)
- Upwork: [Komal Afzaal on Upwork](https://www.upwork.com/freelancers/~016983750864fbeaf5)

## Features

- **Home / Hero** – intro with quick links to projects and contact, plus a stats row (years of experience, users reached, apps shipped, first-try store approvals).
- **About** – profile summary and "What I Offer" (mobile apps, web admin panels & backend, store launch).
- **Skills** – languages, frameworks and tools.
- **Featured Projects** – project cards with cover image, optional download-count badge, description, tech badges and store links. Cards that have both iOS and Android builds show separate **App Store** and **Google Play** links. Current projects:
  - LOOKEE® – Sleep Oxygen & ECG Monitor (Project Lead, 1K+ downloads) – [App Store](https://apps.apple.com/us/app/lookee/id6756679054) · [Google Play](https://play.google.com/store/apps/details?id=com.lookee.android&hl=en)
  - NKENNE: Learn African Language (100K+ downloads) – [App Store](https://apps.apple.com/us/app/nkenne-learn-african-language/id1587537473) · [Google Play](https://play.google.com/store/apps/details?id=com.triaxo.nkenne&hl=en)
  - Sleepover Shield
  - NFC-Based Container Tracking (Tote Inventory)
  - Flutter Expense Tracker
  - PowerUp (iOS & Android via Capacitor)
  - Town – See Who's Around – [App Store](https://apps.apple.com/us/app/town-see-whos-around/id6760225958)
  - Nature Rangers
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

Projects are defined in the `projects` array in [`app/page.tsx`](app/page.tsx). Each entry looks like this:

```ts
{
  title: "App Name",
  description: "Short description of what you built.",
  tech: ["Flutter", "Firebase"],
  image: "/app-name.png",       // file in public/, 1080×1080 works best
  link: "https://...",          // App Store / main link ("#" if none)
  androidLink: "https://...",   // optional – adds a Google Play link
  downloads: "1K+ downloads",   // optional – green badge above the title
}
```

## Project Structure

```
app/
  layout.tsx          # root layout, fonts, metadata
  page.tsx            # whole single-page portfolio (sections, projects, experience data)
  globals.css
components/
  theme-provider.tsx
  ui/                 # shadcn/ui components
hooks/                # use-mobile, use-toast
lib/
  emailjs-config.ts   # EmailJS setup and send helper (reads env vars)
  utils.ts
public/               # project cover images and other static assets
android/  ios/        # Capacitor native projects
capacitor.config.ts
next.config.mjs       # static export, unoptimized images
```
