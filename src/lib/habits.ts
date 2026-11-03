export type BizKey = "florist" | "beauty" | "candles" | "restaurant" | "dive" | "other";

export const businesses: Record<BizKey, { label: string; emoji: string; who: string; book: string; app: string; money: string }> = {
  florist: { label: "Florist", emoji: "💐", who: "wedding clients", book: "order book", app: "Instagram shop", money: "deposits" },
  beauty: { label: "Beauty & hair", emoji: "💅", who: "regulars", book: "appointment diary", app: "booking app", money: "card payments" },
  candles: { label: "Maker / crafts", emoji: "🕯️", who: "online buyers", book: "product photos and recipes", app: "Etsy or Shopify store", money: "payouts" },
  restaurant: { label: "Food & drink", emoji: "🍝", who: "diners", book: "supplier list and menus", app: "delivery app", money: "takings" },
  dive: { label: "Tours & trips", emoji: "🤿", who: "guests", book: "booking calendar", app: "booking website", money: "trip payments" },
  other: { label: "Something else", emoji: "✨", who: "customers", book: "customer list", app: "online accounts", money: "income" },
};

export type Habit = {
  id: string;
  title: string;
  minutes: number;
  oneLiner: string;
  likeThis: string;
  whyYou: (b: (typeof businesses)[BizKey]) => string;
  steps: string[];
};

export const habits: Habit[] = [
  {
    id: "two-step",
    title: "Add a second lock to your email",
    minutes: 5,
    oneLiner: "A password plus a code sent to your phone.",
    likeThis: "It's like your bank card: someone who steals the card still needs your PIN. A stolen password alone stops being enough.",
    whyYou: (b) => `Your email is the master key. Whoever gets into it can reset your ${b.app}, your bank, everything — and message your ${b.who} pretending to be you.`,
    steps: [
      "Open your email's settings and search for “2-Step” or “two-factor”.",
      "Choose “text me a code” or an authenticator app.",
      "Do the same for your bank and your " + "main selling or booking account.",
    ],
  },
  {
    id: "passwords",
    title: "Stop reusing passwords",
    minutes: 15,
    oneLiner: "Let your phone remember a different one for every account.",
    likeThis: "Using one password everywhere is like one key for your house, car and shop. Lose it once, lose it all.",
    whyYou: (b) => `When some random website gets hacked, criminals try that same password on your ${b.app}. Different passwords keep the damage in one place.`,
    steps: [
      "Use the free password keeper already on your phone (iPhone Passwords or Google Password Manager).",
      "Let it suggest a new password next time you log in anywhere.",
      "Start with your email and bank — the rest can happen as you go.",
    ],
  },
  {
    id: "updates",
    title: "Say yes to updates",
    minutes: 3,
    oneLiner: "Switch on automatic updates and forget about it.",
    likeThis: "Updates are the locksmith quietly fixing a broken latch for free. Ignoring them leaves the window open.",
    whyYou: () => "Most break-ins use holes that were already fixed — just not installed. Automatic updates close them while you sleep.",
    steps: [
      "Phone: Settings → Software Update → turn on Automatic Updates.",
      "Laptop: do the same in System Settings / Windows Update.",
      "When an app says “update”, tap it — don't snooze.",
    ],
  },
  {
    id: "backup",
    title: "Keep a spare copy",
    minutes: 10,
    oneLiner: "Your important files, copied somewhere safe automatically.",
    likeThis: "Like keeping a photocopy of your recipe book at a friend's house. A fire, a theft or a spilled coffee won't wipe you out.",
    whyYou: (b) => `If your phone is lost or locked by a scammer, your ${b.book} survives. You're back in business the same day.`,
    steps: [
      "Turn on iCloud Backup or Google One backup on your phone.",
      "Put business files in one cloud folder (Google Drive, iCloud, Dropbox).",
      "Once a month, check you can open one file from another device.",
    ],
  },
  {
    id: "fake-messages",
    title: "Spot the fake message",
    minutes: 5,
    oneLiner: "Rushed + asking for money or a login? Pause and call.",
    likeThis: "A stranger in a delivery uniform asking for your shop keys. The uniform looks right — the request doesn't.",
    whyYou: (b) => `Scammers pose as your bank, your ${b.app}, or a “supplier” with new bank details. One click can empty your ${b.money}.`,
    steps: [
      "Warning signs: urgent, scary, or too good to be true.",
      "Never use the link or phone number in the message. Open the app or call a number you already know.",
      "Changed bank details from a supplier? Always confirm by phone.",
    ],
  },
  {
    id: "devices",
    title: "Lock your phone & laptop",
    minutes: 5,
    oneLiner: "A screen lock and “Find my device” switched on.",
    likeThis: "Your phone is your till, diary and filing cabinet. You wouldn't leave those on a café table unlocked.",
    whyYou: (b) => `An unlocked phone gives anyone your ${b.who}' details and your money apps in seconds.`,
    steps: [
      "Set a 6-digit code plus Face ID or fingerprint.",
      "Turn on Find My (Apple) or Find My Device (Android).",
      "Set the screen to lock after 1 minute.",
    ],
  },
  {
    id: "wifi",
    title: "Give guests their own Wi‑Fi",
    minutes: 10,
    oneLiner: "Customers on one network, your business on another.",
    likeThis: "Like a staff-only door. Guests are welcome in the shop, just not in the back office.",
    whyYou: (b) => `Your card reader and ${b.book} shouldn't share a network with every visitor's phone.`,
    steps: [
      "Change your router's default password (the one printed on the sticker).",
      "Turn on the “Guest network” option in your router app.",
      "Give customers only the guest password.",
    ],
  },
  {
    id: "plan",
    title: "Write your “uh‑oh” card",
    minutes: 10,
    oneLiner: "Who to call and what to do if something goes wrong.",
    likeThis: "Like knowing where the fuse box is before the lights go out. Panic is much smaller when you have a list.",
    whyYou: () => "When you're hacked, minutes matter. A short list means you act instead of freezing.",
    steps: [
      "List your key accounts: email, bank, selling app, social media.",
      "Note your bank's fraud number and your country's cyber help line (e.g. 1300 CYBER1 in Australia).",
      "If hacked: change your email password first, then call your bank.",
    ],
  },
];
