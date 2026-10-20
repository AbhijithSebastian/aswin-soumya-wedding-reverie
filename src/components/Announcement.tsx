import { useEffect, useState } from "react";
import { CEREMONY_TARGET, RECEPTION_TARGET, timeLeft } from "@/lib/wedding";
import { Reveal } from "@/components/common/Reveal";

type EventKey = "ceremony" | "reception";

interface EventDef {
  label: string;
  iconType: "rings" | "champagne";
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  target: Date;
  countdownLabel: string;
}

const EVENT_DATA: Record<EventKey, EventDef> = {
  ceremony: {
    label: "Wedding Ceremony",
    iconType: "rings",
    title: "The Wedding Ceremony",
    date: "Sunday, 29 November 2026",
    time: "11:30 AM – 12:30 PM",
    venue: "St. Mathews Knanaya Church",
    location: "Njaliyakuzhi, Vakathanam",
    target: CEREMONY_TARGET,
    countdownLabel: "COUNTING DOWN TO THE WEDDING CEREMONY",
  },
  reception: {
    label: "Post-Wedding Reception",
    iconType: "champagne",
    title: "The Post-Wedding Reception",
    date: "Sunday, 29 November 2026",
    time: "6:00 PM",
    venue: "St. Mary’s Knanaya Catholic Church",
    location: "Kothanalloor",
    target: RECEPTION_TARGET,
    countdownLabel: "COUNTING DOWN TO THE POST-WEDDING RECEPTION",
  },
};

function RingsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8.5" cy="10" r="4.5" />
      <circle cx="15.5" cy="10" r="4.5" />
      <path d="M12 6.8a4.5 4.5 0 0 1 0 6.4" />
    </svg>
  );
}

function ChampagneIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 22V11a4 4 0 0 1 8 0v11" />
      <path d="M6 11h12" />
      <path d="M12 11V5" />
      <path d="M9 5c0-1.7 1.3-3 3-3s3 1.3 3 3" />
    </svg>
  );
}

function EventIcon({ type, className }: { type: "rings" | "champagne"; className?: string }) {
  return type === "rings" ? (
    <RingsIcon className={className ?? "w-4 h-4"} />
  ) : (
    <ChampagneIcon className={className ?? "w-4 h-4"} />
  );
}

function EventCountdown({ now }: { now: Date | null }) {
  const [active, setActive] = useState<EventKey>("ceremony");
  const [panelVisible, setPanelVisible] = useState(true);

  const switchEvent = (key: EventKey) => {
    if (key === active) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setActive(key);
      return;
    }
    setPanelVisible(false);
    setTimeout(() => {
      setActive(key);
      setPanelVisible(true);
    }, 220);
  };

  const ev = EVENT_DATA[active];
  const t = now ? timeLeft(ev.target, now) : null;

  const units: [string, number][] = [
    ["DAYS", t ? t.days : 0],
    ["HOURS", t ? t.hours : 0],
    ["MINUTES", t ? t.minutes : 0],
    ["SECONDS", t ? t.seconds : 0],
  ];

  return (
    <div className="flex flex-col items-center">
      {/* -------- Pill Selector -------- */}
      <div
        role="tablist"
        aria-label="Select wedding event"
        className="inline-flex items-center rounded-full border border-[#c5a66a]/70 bg-[#fdfaf4] p-1 shadow-[0_2px_12px_rgba(197,166,106,0.14)]"
      >
        {(["ceremony", "reception"] as EventKey[]).map((key) => {
          const isActive = key === active;
          const e = EVENT_DATA[key];
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              type="button"
              id={`tab-${key}`}
              onClick={() => switchEvent(key)}
              className={[
                "inline-flex items-center gap-2 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a66a] cursor-pointer",
                isActive
                  ? "bg-[#b8955a] text-[#fdf7ee] shadow-[0_2px_10px_rgba(184,149,90,0.38)]"
                  : "text-[#132734]/70 hover:text-[#132734] bg-transparent",
              ].join(" ")}
            >
              <EventIcon
                type={e.iconType}
                className={["w-4 h-4", isActive ? "text-[#fdf7ee]" : "text-[#b8955a]"].join(" ")}
              />
              <span className="whitespace-nowrap">{e.label}</span>
            </button>
          );
        })}
      </div>

      {/* -------- Animated Panel -------- */}
      <div
        aria-live="polite"
        className="w-full"
        style={{
          opacity: panelVisible ? 1 : 0,
          transition: "opacity 220ms ease",
        }}
      >
        {/* Event Icon + Title */}
        <div className="mt-7 sm:mt-8 flex flex-col items-center gap-1.5">
          <span className="text-[#b8955a]" aria-hidden="true">
            <EventIcon type={ev.iconType} className="w-5 h-5" />
          </span>
          <h3 className="font-serif text-[clamp(1.45rem,3vw,2.1rem)] font-normal text-[#132734] leading-snug">
            {ev.title}
          </h3>
          <img
            src="/images/lotus-heading-divider.svg"
            alt=""
            aria-hidden="true"
            className="w-[90px] sm:w-[110px] h-auto select-none mt-0.5"
          />
        </div>

        {/* Date / Time / Venue row */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-center gap-5 sm:gap-10 text-left">
          {/* Date & Time */}
          <div className="flex items-start gap-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#b8955a"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 shrink-0 mt-0.5"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <div>
              <p className="font-serif text-[15px] sm:text-[16px] text-[#132734] leading-snug">
                {ev.date}
              </p>
              <p className="mt-0.5 font-sans text-[13px] sm:text-[14px] font-semibold text-[#b8955a]">
                {ev.time}
              </p>
            </div>
          </div>

          {/* Thin vertical rule (desktop only) */}
          <span className="hidden sm:block h-10 w-px bg-[#c5a66a]/35" aria-hidden="true" />

          {/* Venue */}
          <div className="flex items-start gap-3">
            <svg
              viewBox="0 0 24 24"
              fill="#b8955a"
              className="w-5 h-5 shrink-0 mt-0.5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C7.58172 2 4 5.58172 4 10C4 15.25 12 22 12 22C12 22 20 15.25 20 10C20 5.58172 16.4183 2 12 2ZM12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10C15 11.6569 13.6569 13 12 13Z"
              />
            </svg>
            <div>
              <p className="font-serif text-[15px] sm:text-[16px] text-[#132734] leading-snug">
                {ev.venue}
              </p>
              <p className="mt-0.5 font-sans text-[13px] sm:text-[14px] text-[#132734]/60">
                {ev.location}
              </p>
            </div>
          </div>
        </div>

        {/* -------- Countdown -------- */}
        <div className="mt-10 sm:mt-12">
          {/* Countdown rule + label */}
          <div className="mx-auto flex max-w-xl items-center justify-center gap-3 sm:gap-4">
            <span className="h-px flex-1 bg-[#c5a66a]/45" aria-hidden="true" />
            <p className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.34em] text-slate-ink whitespace-nowrap px-1">
              {ev.countdownLabel}
            </p>
            <span className="h-px flex-1 bg-[#c5a66a]/45" aria-hidden="true" />
          </div>

          {/* Numbers or 'event passed' message */}
          {t?.done ? (
            <p className="mt-6 font-serif text-2xl sm:text-3xl text-ink">
              {active === "ceremony"
                ? "The ceremony has begun — may your blessings be with them."
                : "The celebration has begun — joy fills the air!"}
            </p>
          ) : (
            <div className="mt-7 sm:mt-8 grid grid-cols-4 max-w-lg mx-auto">
              {units.map(([label, val], idx) => (
                <div
                  key={label}
                  className="relative flex flex-col items-center justify-center px-1 sm:px-3"
                >
                  {idx > 0 && (
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center h-14 sm:h-16 pointer-events-none"
                      aria-hidden="true"
                    >
                      <span className="w-px flex-1 bg-[#c5a66a]/45" />
                      <span className="h-1.5 w-1.5 rotate-45 bg-[#c5a66a]/80 my-0.5" />
                      <span className="w-px flex-1 bg-[#c5a66a]/45" />
                    </div>
                  )}
                  <div className="font-serif text-[clamp(2.3rem,5.5vw,4.2rem)] font-light tabular-nums leading-none text-[#132734]">
                    {String(val).padStart(2, "0")}
                  </div>
                  <div className="mt-2 sm:mt-2.5 font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-slate-ink">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Announcement() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const intervalId = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      id="invitation"
      className="relative overflow-hidden bg-ivory px-4 py-20 sm:px-6 sm:py-28"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 90% 70% at 50% 50%, #fffdf8 0%, #f8f4eb 65%, #f1ebdc 100%)",
      }}
    >
      {/* Left Lotus Flower Decorative Asset */}
      <img
        src="/images/decor-lotus.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -left-12 sm:-left-6 lg:left-0 w-[240px] sm:w-[320px] md:w-[380px] lg:w-[440px] max-w-[34vw] select-none opacity-85 hidden md:block"
      />

      {/* Right Lotus Flower Decorative Asset (Mirrored) */}
      <img
        src="/images/decor-lotus.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-12 sm:-right-6 lg:right-0 w-[240px] sm:w-[320px] md:w-[380px] lg:w-[440px] max-w-[34vw] select-none opacity-85 -scale-x-100 hidden md:block"
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <Reveal>
          {/* Eyebrow */}
          <p className="font-sans text-[clamp(10px,1vw,13px)] uppercase tracking-[0.45em] text-gold-deep">
            The Invitation
          </p>

          {/* Primary Heading */}
          <h2 className="mt-3 font-serif text-[clamp(2.4rem,4.8vw,4.4rem)] font-light leading-[1.08] text-ink">
            With joy in our hearts
          </h2>

          {/* Gold Lotus Divider SVG */}
          <img
            src="/images/lotus-heading-divider.svg"
            alt=""
            aria-hidden="true"
            className="mx-auto my-4 sm:my-5 w-[190px] sm:w-[220px] lg:w-[240px] h-auto select-none"
          />

          {/* Invitation Text */}
          <p className="mt-5 sm:mt-6 font-serif text-[clamp(16px,1.5vw,21px)] font-light leading-relaxed text-ink/85 max-w-xl mx-auto">
            We, the families of Soumya and Aswin, joyfully invite you to bless the wedding of our
            children, and to share in the happiness of the day.
          </p>

          {/* Wedding Date */}
          <p className="mt-7 sm:mt-8 font-sans text-[clamp(11px,1vw,13px)] uppercase tracking-[0.38em] text-slate-ink font-medium">
            Sunday, 29 November 2026
          </p>
        </Reveal>

        {/* Switchable Event Selector + Countdown */}
        <Reveal className="mt-10 sm:mt-12">
          <EventCountdown now={now} />
        </Reveal>
      </div>
    </section>
  );
}
