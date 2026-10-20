// All wedding content lives here so it can be edited in one place.

/** Ceremony target date: Sunday, 29 November 2026 at 11:30 AM IST (Asia/Kolkata) */
export const WEDDING_START = new Date("2026-11-29T11:30:00+05:30");
export const CEREMONY_TARGET = WEDDING_START;

/** Reception target date: Sunday, 29 November 2026 at 6:00 PM IST (Asia/Kolkata) */
export const RECEPTION_TARGET = new Date("2026-11-29T18:00:00+05:30");

export interface WeddingEvent {
  no: string;
  title: string;
  sub: string;
  date: string;
  time: string;
  venue: string;
  place: string;
  map: string;
}

export const events: WeddingEvent[] = [
  {
    no: "01",
    title: "Wedding Ceremony",
    sub: "Auspicious Muhurtham",
    date: "Sunday, 29 November 2026",
    time: "11:30 AM – 12:30 PM",
    venue: "St. Mathews Knanaya Church",
    place: "Njaliyakuzhi, Vakathanam",
    map: "https://www.google.com/maps/search/?api=1&query=St.+Mathews+Knanaya+Church+Njaliyakuzhi+Vakathanam",
  },
  {
    no: "02",
    title: "Post-Wedding Reception",
    sub: "Celebration & Dinner",
    date: "Sunday, 29 November 2026",
    time: "6:00 PM",
    venue: "St. Mary's Knanaya Catholic Church",
    place: "Kothanalloor",
    map: "https://www.google.com/maps/search/?api=1&query=St+Mary%27s+Knanaya+Catholic+Church+Kothanalloor",
  },
];

export interface FamilyInfo {
  role: string;
  name: string;
  relation: string;
  parents: [string, string];
  address: [string, string];
}

export const families: FamilyInfo[] = [
  {
    role: "Bride",
    name: "Soumya",
    relation: "Daughter of",
    parents: ["C P Satheesan", "Sobhana"],
    address: ["Chorickanpara, Puthenchandha P O", "Vakathanam, Kottayam."],
  },
  {
    role: "Groom",
    name: "Aswin",
    relation: "Son of",
    parents: ["Anandan", "Lali"],
    address: ["Vadakkirickal House, Kothanalloor", "Kottayam."],
  },
];

export interface TimeLeftResult {
  done: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Calculates remaining time until a target Date.
 * Pure function with integer breakdown for days, hours, minutes, seconds.
 */
export function timeLeft(target: Date, now: Date = new Date()): TimeLeftResult {
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) {
    return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const s = Math.floor(ms / 1000);
  return {
    done: false,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}
