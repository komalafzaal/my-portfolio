export type Project = {
  title: string
  shortName: string // used in the hero app strip
  tagline: string // one-liner under the short name in the hero app strip
  icon: string // square app icon in public/icons/
  description: string
  tech: string[]
  image: string
  link?: string // App Store / main link
  androidLink?: string // adds a Google Play link
  highlights?: string[] // short pills, e.g. "AI-curated events", "100K+ downloads"
}

// Order matters: projects appear in this order in the home page slider, app strip and /projects page.
export const projects: Project[] = [
  {
    title: "Town – See Who's Around",
    shortName: "Town",
    tagline: "AI-curated local events",
    icon: "/icons/town.png",
    description:
      "A location-based social app where AI automatically finds nearby events and curates them for each user's city, so there's always something happening around them. Also features a live people map, real-time private and group chat over WebSockets, AI-generated posts, and verified profiles.",
    tech: ["Flutter", "AI Integration", "WebSockets", "Firebase Cloud Functions", "Firebase Authentication", "Firestore", "App Store Deployment"],
    image: "/town.png",
    link: "https://apps.apple.com/us/app/town-see-whos-around/id6760225958",
    highlights: ["AI-curated local events"],
  },
  {
    title: "NKENNE – Learn African Languages",
    shortName: "NKENNE",
    tagline: "100K+ downloads",
    icon: "/icons/nkenne.png",
    description:
      "A leading African language-learning app with 100K+ downloads. Shipped the NKENNEAI translation feature, a full native-tutor booking flow, audio-lesson captions, and premium subscriptions with RevenueCat.",
    tech: ["Kotlin", "Android SDK", "AI Integration", "Firebase Realtime Database", "Firestore", "RevenueCat", "In-App Subscription"],
    image: "/nkenne.png",
    link: "https://apps.apple.com/us/app/nkenne-learn-african-language/id1587537473",
    androidLink: "https://play.google.com/store/apps/details?id=com.triaxo.nkenne&hl=en",
    highlights: ["100K+ downloads", "AI translation"],
  },
  {
    title: "PowerUp – Personal Performance",
    shortName: "PowerUp",
    tagline: "AI health analysis",
    icon: "/icons/powerup.png",
    description:
      "Cross-platform iOS and Android apps for PowerUp, delivering AI-powered health analysis across 9 dimensions and 70+ metrics. Integrated push notifications, splash screens, and offline handling with store-compliant UI for a smooth production release.",
    tech: ["Capacitor", "iOS Development", "Android App Development", "Push Notifications", "App/Play Store Deployment"],
    image: "/power_up.png",
    link: "https://apps.apple.com/us/app/powerup-individual/id6743502030",
    androidLink: "https://play.google.com/store/apps/details?id=com.powerupglobaluk.powerup&hl=en",
    highlights: ["AI health analysis"],
  },
  {
    title: "LOOKEE® – Sleep Oxygen & ECG Monitor",
    shortName: "LOOKEE®",
    tagline: "Wearable health · Lead",
    icon: "/icons/lookee.png",
    description:
      "Leading development of a wellness-tracking app that pairs with LOOKEE® wearables to monitor oxygen levels, pulse rate, ECG, activity, and sleep. Own production releases and backend, delivering secure multi-user profiles, trend charts, exportable reports, and personalized health insights.",
    tech: ["Team Lead", "Kotlin", "Android SDK", "iOS Development", "Wearable Device Integration", "Backend", "Data Visualization"],
    image: "/lookee.png",
    link: "https://apps.apple.com/us/app/lookee/id6756679054",
    androidLink: "https://play.google.com/store/apps/details?id=com.lookee.android&hl=en",
    highlights: ["Project Lead", "1K+ downloads"],
  },
  {
    title: "Sleepover Shield",
    shortName: "Sleepover Shield",
    tagline: "Safe sleepovers for parents",
    icon: "/icons/sleepover.png",
    description:
      "A secure Flutter app that helps parents organize safe sleepovers by sharing profiles, connecting with trusted families, and chatting in real time, with subscription-based features and reliable backend services.",
    tech: ["Flutter", "Firebase Authentication", "Socket.io", "API Integration", "In-App Subscription", "iOS App Deployment"],
    image: "/sleepover.png",
    link: "https://apps.apple.com/us/app/sleepover-shield/id6736615477",
  },
  {
    title: "Nature Rangers – Outdoor Learning",
    shortName: "Nature Rangers",
    tagline: "Outdoor-learning classes",
    icon: "/icons/nature-rangers.png",
    description:
      "A cross-platform Flutter app for outdoor-learning programs, with class scheduling, real-time parent chat, child profiles, and session photo galleries so parents and admins can coordinate activities safely.",
    tech: ["Flutter", "Firebase", "Socket.io", "API Integration"],
    image: "/natureRangers.png",
  },
  {
    title: "Expense Tracker – Budget & Analytics",
    shortName: "Expense Tracker",
    tagline: "Budgets & analytics",
    icon: "/icons/expense.png",
    description:
      "A personal finance tracker in Flutter with expense logging, interactive charts, budget management, and biometric authentication, helping users understand their spending at a glance.",
    tech: ["Flutter", "iOS Development", "Android App Development", "UI/UX Prototyping", "FlutterFlow"],
    image: "/expenseTracker.png",
    link: "https://www.youtube.com/shorts/_BvgCNVYADU",
  },
  {
    title: "NFC Container Tracking for Logistics",
    shortName: "NFC Reader",
    tagline: "Logistics tracking",
    icon: "/icons/nfc.png",
    description:
      "An Android NFC scanner for logistics: assign containers, track returns and IN/OUT status, with real-time Firebase sync and Cloud Functions that push every record to Google Sheets.",
    tech: ["Kotlin", "NFC", "Firestore", "Firebase Realtime Database", "Google Sheets"],
    image: "/nfcReader.png",
  },
]
