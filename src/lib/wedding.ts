// All wedding content lives here so it can be edited in one place.
export const WEDDING_START = new Date("2026-11-29T11:30:00+05:30"); // Asia/Kolkata

export const events = [
  {
    no: "01",
    title: "Wedding Ceremony",
    date: "Sunday, 29 November 2026",
    time: "11:30 AM – 12:30 PM",
    venue: "St. Mathews Knanaya Church",
    place: "Njaliyakuzhi, Vakathanam",
    map: "https://www.google.com/maps/search/?api=1&query=St.+Mathews+Knanaya+Church+Njaliyakuzhi+Vakathanam",
  },
  {
    no: "02",
    title: "Post-Wedding Reception",
    date: "Sunday, 29 November 2026",
    time: "6:00 PM",
    venue: "St. Mary's Knanaya Catholic Church",
    place: "Kothanalloor",
    map: "https://www.google.com/maps/search/?api=1&query=St+Mary%27s+Knanaya+Catholic+Church+Kothanalloor",
  },
];

export const families = [
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

export function timeLeft(target: Date, now: Date) {
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const s = Math.floor(ms / 1000);
  return {
    done: false,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}
