import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import p1 from "@/assets/photo1.jpg.asset.json";
import p2 from "@/assets/photo2.jpg.asset.json";
import p3 from "@/assets/photo3.jpg.asset.json";
import p4 from "@/assets/photo4.jpg.asset.json";
import { events, families, timeLeft, WEDDING_START } from "@/lib/wedding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aswin & Soumya · Wedding Invitation · 29 November 2026" },
      { name: "description", content: "You are warmly invited to the wedding of Aswin & Soumya on Sunday, 29 November 2026 at Vakathanam, Kottayam." },
      { property: "og:title", content: "Aswin & Soumya · The Wedding" },
      { property: "og:description", content: "Sunday, 29 November 2026 · Vakathanam, Kottayam. Your presence and blessings will make our day complete." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

const photos = [
  { src: p1.url, alt: "Aswin and Soumya — portrait 1" },
  { src: p2.url, alt: "Aswin and Soumya — portrait 2" },
  { src: p3.url, alt: "Aswin and Soumya — portrait 3" },
  { src: p4.url, alt: "Aswin and Soumya — portrait 4" },
];

function Invitation() {
  const [stage, setStage] = useState<"sealed" | "opening" | "open">("sealed");

  useEffect(() => {
    document.body.style.overflow = stage === "open" ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [stage]);

  const open = () => {
    if (stage !== "sealed") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStage("opening");
    window.setTimeout(() => setStage("open"), reduced ? 300 : 2600);
  };

  return (
    <main className="overflow-x-clip bg-background text-foreground">
      {stage !== "open" && <Envelope opening={stage === "opening"} onOpen={open} />}
      <Cover />
      <Announcement />
      <Events />
      <Families />
      <Gallery />
      <Closing />
      {stage === "open" && (
        <a href="#events" className="fixed right-4 top-4 z-40 rounded-full border border-gold/60 bg-ivory-soft/90 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.3em] text-ink">
          Events
        </a>
      )}
    </main>
  );
}

/* ---------------- Envelope (native, responsive) ---------------- */
function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={`emboss ${className}`}>
      <path d="M10 110 C40 80 60 60 110 10" />
      {[20, 38, 56, 74, 92].map((p, i) => (
        <g key={p}>
          <path d={`M${p} ${120 - p} q ${i % 2 ? 14 : -4} ${i % 2 ? 2 : -14} ${i % 2 ? 18 : 6} ${i % 2 ? -10 : -20}`} />
          <circle cx={p + (i % 2 ? 20 : 7)} cy={120 - p - (i % 2 ? 10 : 22)} r="3.5" />
        </g>
      ))}
    </svg>
  );
}

function Seal() {
  const petals = Array.from({ length: 18 }, (_, i) => i * 20);
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full">
      <defs>
        <radialGradient id="wax" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#f3e2b4" />
          <stop offset=".45" stopColor="#c9a65e" />
          <stop offset="1" stopColor="#8a6a30" />
        </radialGradient>
      </defs>
      <g fill="url(#wax)">
        {petals.map((a) => <circle key={a} cx={100 + 78 * Math.cos((a * Math.PI) / 180)} cy={100 + 78 * Math.sin((a * Math.PI) / 180)} r="16" />)}
        <circle cx="100" cy="100" r="82" />
      </g>
      <circle cx="100" cy="100" r="62" fill="none" stroke="#7a5c26" strokeOpacity=".55" strokeWidth="2" />
      <circle cx="100" cy="100" r="56" fill="none" stroke="#fff3cf" strokeOpacity=".5" strokeWidth="1" />
      <text x="100" y="114" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="46" fontStyle="italic" fill="#6e5222" fillOpacity=".85">A&amp;S</text>
    </svg>
  );
}

function Envelope({ opening, onOpen }: { opening: boolean; onOpen: () => void }) {
  return (
    <div className={`env fixed inset-0 z-50 overflow-hidden bg-envelope-inner ${opening ? "is-opening" : ""}`}>
      {/* invitation card, tucked inside */}
      <div className="env-card absolute inset-x-0 top-[14%] mx-auto flex h-[52%] w-[min(80vw,440px)] flex-col items-center justify-center border border-gold/60 bg-ivory-soft px-6 text-center">
        <div className="absolute inset-2 border border-gold/30" />
        <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-gold-deep">The Wedding of</p>
        <p className="mt-3 font-serif text-[clamp(2rem,8vw,3rem)] leading-tight text-ink">Aswin <span className="italic text-gold">&amp;</span> Soumya</p>
        <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.35em] text-ink/70">29 · 11 · 2026</p>
      </div>

      {/* pocket: side + bottom folds */}
      <div className="env-pocket pointer-events-none absolute inset-0">
        <div className="fold-l absolute inset-0" />
        <div className="fold-r absolute inset-0" />
        <div className="fold-b absolute inset-0" />
        <Sprig className="absolute bottom-[4%] left-[4%] w-[min(26vw,170px)]" />
        <Sprig className="absolute bottom-[4%] right-[4%] w-[min(26vw,170px)] -scale-x-100" />
      </div>

      {/* top flap */}
      <div className="env-flap pointer-events-none absolute inset-x-0 top-0 h-[56%]">
        <div className="flap-face absolute inset-0" />
        <Sprig className="absolute left-1/2 top-[8%] w-[min(22vw,130px)] -translate-x-1/2 rotate-[135deg] opacity-80" />
      </div>

      <button
        type="button"
        onClick={onOpen}
        aria-label="Break the seal to open the invitation"
        className="env-seal absolute left-1/2 top-[56%] z-10 -ml-[var(--s)] -mt-[var(--s)] h-[calc(var(--s)*2)] w-[calc(var(--s)*2)] cursor-pointer rounded-full [--s:clamp(46px,11vmin,80px)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        <span className="seal-ring absolute inset-[6%] rounded-full" />
        <Seal />
      </button>
      <p className="env-hint pointer-events-none absolute bottom-[7%] w-full text-center font-sans text-[10px] uppercase tracking-[0.4em] text-ink/60">
        Tap the seal to open
      </p>
    </div>
  );
}

/* ---------------- Cover (native, responsive) ---------------- */
function Landscape() {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--powder)" />
          <stop offset=".75" stopColor="var(--ivory-soft)" />
          <stop offset="1" stopColor="#f4e3c0" />
        </linearGradient>
        <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9dcc0" />
          <stop offset="1" stopColor="#a9c0cf" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sky)" />
      <circle cx="200" cy="168" r="14" fill="#f6d898" opacity=".9" className="sun" />
      <path d="M0 212 L40 180 L70 196 L120 150 L160 186 L200 160 L250 190 L290 156 L340 192 L370 176 L400 196 V214 H0Z" fill="#b8c9d4" />
      <path d="M0 214 L50 196 L95 206 L150 184 L210 204 L260 188 L320 206 L400 194 V216 H0Z" fill="#8fa6b5" />
      <rect y="214" width="400" height="86" fill="url(#lake)" />
      <ellipse cx="200" cy="222" rx="10" ry="3" fill="#f6d898" opacity=".7" />
      {[230, 246, 264, 284].map((y, i) => (
        <path key={y} className="ripple" style={{ animationDelay: `${i * 0.8}s` }} d={`M${150 - i * 30} ${y} q ${50 + i * 30} -4 ${100 + i * 60} 0`} stroke="#fffcf7" strokeOpacity=".55" fill="none" strokeWidth=".8" />
      ))}
      {[[168, 258], [236, 272], [252, 240], [150, 286], [120, 262], [290, 280]].map(([x, y]) => (
        <g key={x} className="float" transform={`translate(${x} ${y})`}>
          {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} rx="2.4" ry="1.2" transform={`rotate(${a}) translate(2 0)`} fill="#fffcf7" />)}
          <circle r="1" fill="#e2c27e" />
        </g>
      ))}
    </svg>
  );
}

function Arch() {
  const blossoms = [[60, 70], [92, 38], [140, 22], [200, 16], [260, 22], [308, 38], [340, 70], [38, 120], [362, 120], [30, 180], [370, 190]];
  return (
    <svg viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
      {/* stone frame: everything outside the arch */}
      <path fillRule="evenodd" fill="var(--ivory)" d="M0 0H400V600H0Z M26 600 V200 C26 70 120 26 200 26 C280 26 374 70 374 200 V600Z" />
      <path fill="none" stroke="var(--gold)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" d="M26 600 V200 C26 70 120 26 200 26 C280 26 374 70 374 200 V600" />
      <path fill="none" stroke="var(--gold)" strokeOpacity=".45" strokeWidth="1" vectorEffect="non-scaling-stroke" d="M16 600 V200 C16 62 116 14 200 14 C284 14 384 62 384 200 V600" />
      {/* curtains */}
      <path className="curtain-l" fill="var(--ivory-soft)" opacity=".85" d="M26 200 C26 120 60 70 100 50 C70 140 60 300 70 600 H26Z" />
      <path className="curtain-r" fill="var(--ivory-soft)" opacity=".85" d="M374 200 C374 120 340 70 300 50 C330 140 340 300 330 600 H374Z" />
      {/* vines */}
      <g fill="none" stroke="#6f8a5e" strokeWidth="1.4" vectorEffect="non-scaling-stroke" className="vine">
        <path d="M30 230 C50 150 90 60 200 30 C310 60 350 150 370 230" />
        <path d="M60 80 C58 130 64 170 56 230" />
        <path d="M340 80 C342 130 336 170 344 240" />
        <path d="M120 40 C118 80 124 100 118 130" />
        <path d="M280 40 C282 80 276 100 282 140" />
      </g>
      <g fill="#7f9b6c">
        {[[48, 160], [62, 120], [118, 110], [282, 120], [340, 130], [352, 190], [74, 60], [326, 60], [160, 28], [240, 28]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="6" ry="3" transform={`rotate(${i * 37} ${x} ${y})`} />
        ))}
      </g>
      <g>
        {blossoms.map(([x, y]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} rx="4.5" ry="2.6" transform={`rotate(${a}) translate(3.5 0)`} fill="#fffcf7" stroke="#e8dcc4" strokeWidth=".5" />)}
            <circle r="1.8" fill="var(--gold)" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function Cover() {
  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ivory">
      <div className="absolute inset-0">
        <Landscape />
        <Arch />
      </div>
      <div className="relative z-10 mx-auto flex h-full max-w-md flex-col items-center px-8 pt-[max(16svh,90px)] text-center text-ink">
        <p className="rise font-sans text-[10px] uppercase tracking-[0.45em] text-slate-ink" style={{ animationDelay: ".3s" }}>The Wedding of</p>
        <h1 className="rise mt-4 font-serif text-[clamp(2.8rem,13vw,5.5rem)] leading-[0.95] text-ink" style={{ animationDelay: ".6s" }}>
          Aswin <span className="block font-light italic text-gold-deep">&amp;</span> Soumya
        </h1>
        <div className="rise mt-6 flex items-center gap-4 text-ink" style={{ animationDelay: ".9s" }}>
          <span className="font-sans text-[10px] uppercase tracking-[0.35em]">Sunday</span>
          <span className="border-x border-gold px-4 font-serif text-4xl">29</span>
          <span className="font-sans text-[10px] uppercase tracking-[0.35em]">November 2026</span>
        </div>
      </div>
      <a href="#invitation" aria-label="Scroll to invitation" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <span className="scroll-line block h-10 w-px bg-slate-ink/70" />
      </a>
    </section>
  );
}

/* ---------------- Helpers ---------------- */
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${shown ? "is-in" : ""} ${className}`}>{children}</div>;
}

function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-gold-deep">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">{title}</h2>
      <div className="mx-auto mt-5 flex w-32 items-center gap-2"><span className="h-px flex-1 bg-gold/60" /><span className="h-1.5 w-1.5 rotate-45 bg-gold" /><span className="h-px flex-1 bg-gold/60" /></div>
    </div>
  );
}

/* ---------------- Announcement + countdown ---------------- */
function Announcement() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => { setNow(new Date()); const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const t = now ? timeLeft(WEDDING_START, now) : null;
  const units = t ? [["Days", t.days], ["Hours", t.hours], ["Minutes", t.minutes], ["Seconds", t.seconds]] as const : [];
  return (
    <section id="invitation" className="bg-ivory px-6 py-24">
      <Reveal className="mx-auto max-w-xl text-center">
        <Heading eyebrow="The Invitation" title="With joy in our hearts" />
        <p className="mt-8 font-serif text-xl leading-relaxed text-ink/85 sm:text-2xl">
          We, the families of Soumya and Aswin, joyfully invite you to bless the wedding of our children, and to share in the happiness of the day.
        </p>
        <p className="mt-8 font-sans text-xs uppercase tracking-[0.35em] text-slate-ink">Sunday, 29 November 2026</p>
      </Reveal>
      <Reveal className="mx-auto mt-16 max-w-xl">
        <div className="bg-powder px-4 py-10 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-slate-ink">Counting down to the ceremony</p>
          {t?.done ? (
            <p className="mt-5 font-serif text-3xl text-ink">The day has arrived — thank you for your blessings.</p>
          ) : (
            <div className="mt-6 grid grid-cols-4 divide-x divide-gold/40">
              {(units.length ? units : [["Days", 0], ["Hours", 0], ["Minutes", 0], ["Seconds", 0]] as const).map(([l, v]) => (
                <div key={l} className="min-w-0 px-1">
                  <div className="font-serif text-4xl tabular-nums text-ink sm:text-5xl">{String(v).padStart(2, "0")}</div>
                  <div className="mt-1 font-sans text-[9px] uppercase tracking-[0.25em] text-slate-ink sm:text-[10px]">{l}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- Events ---------------- */
function Events() {
  return (
    <section id="events" className="scroll-mt-4 bg-ivory-soft px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <Heading eyebrow="Celebrations" title="Wedding Events" />
        <div className="mt-14 divide-y divide-gold/40 border-y border-gold/40">
          {events.map((e) => (
            <Reveal key={e.no} className="grid grid-cols-[auto_minmax(0,1fr)] gap-5 py-10 sm:gap-10">
              <span className="font-serif text-5xl font-light italic text-gold sm:text-6xl">{e.no}</span>
              <div className="min-w-0">
                <h3 className="font-serif text-3xl text-ink">{e.title}</h3>
                <dl className="mt-5 space-y-3 font-sans text-sm text-ink/80">
                  <div><dt className="text-[10px] uppercase tracking-[0.3em] text-slate-ink">Date</dt><dd>{e.date}</dd></div>
                  <div><dt className="text-[10px] uppercase tracking-[0.3em] text-slate-ink">Time</dt><dd>{e.time}</dd></div>
                  <div><dt className="text-[10px] uppercase tracking-[0.3em] text-slate-ink">Venue</dt><dd>{e.venue}, {e.place}</dd></div>
                </dl>
                <a href={e.map} target="_blank" rel="noreferrer" className="maps-btn mt-7 inline-flex min-h-12 items-center gap-3 rounded-full border border-gold bg-gold/15 px-6 font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-ink">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-gold-deep"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
                  Open in Maps
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Families ---------------- */
function Families() {
  return (
    <section className="bg-ivory px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Heading eyebrow="Our Families" title="Two Families, One Journey" />
        <div className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-gold/40">
          {families.map((f) => (
            <Reveal key={f.role} className="px-4 text-center">
              <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-gold-deep">{f.role}</p>
              <h3 className="mt-2 font-serif text-5xl text-ink">{f.name}</h3>
              <p className="mt-5 font-serif italic text-slate-ink">{f.relation}</p>
              <p className="mt-1 font-serif text-2xl text-ink">{f.parents[0]} <span className="text-gold">&</span> {f.parents[1]}</p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-ink/70">{f.address[0]}<br />{f.address[1]}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-14 text-center font-serif text-xl italic text-slate-ink">Together with their families, relatives and well-wishers.</p>
      </div>
    </section>
  );
}

/* ---------------- Gallery ---------------- */
function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const touchX = useRef(0);
  const n = photos.length;

  const show = (i: number) => { setIdx(i); requestAnimationFrame(() => setVisible(true)); };
  const close = useCallback(() => {
    setVisible(false);
    setTimeout(() => { setIdx((cur) => { if (cur !== null) triggers.current[cur]?.focus({ preventScroll: true }); return null; }); }, 250);
  }, []);
  const step = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + n) % n)), [n]);

  useEffect(() => {
    if (idx === null) return;
    const y = window.scrollY;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; window.scrollTo({ top: y }); };
  }, [idx === null, close, step]); // eslint-disable-line react-hooks/exhaustive-deps

  const layout = ["col-span-2 aspect-[16/10] object-[50%_35%]", "aspect-[3/4]", "aspect-[3/4]", "col-span-2 aspect-[16/10] object-[50%_40%]"];

  return (
    <section className="bg-ivory-soft px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Heading eyebrow="Moments" title="Gallery" />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5">
          {photos.map((p, i) => (
            <Reveal key={p.src} className={layout[i]!.includes("col-span-2") ? "col-span-2" : ""}>
              <button ref={(el) => { triggers.current[i] = el; }} type="button" onClick={() => show(i)} aria-label={`Open photo ${i + 1}`} className="group block w-full overflow-hidden">
                <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${layout[i]!.replace("col-span-2 ", "")}`} />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {idx !== null && photos[idx] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${idx + 1} of ${n}`}
          className={`fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/95 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          onTouchStart={(e) => { touchX.current = e.touches[0]!.clientX; }}
          onTouchEnd={(e) => { const dx = e.changedTouches[0]!.clientX - touchX.current; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); }}
        >
          <img key={idx} src={photos[idx]!.src} alt={photos[idx]!.alt} className={`max-h-[86svh] max-w-[92vw] object-contain transition-transform duration-300 ${visible ? "scale-100" : "scale-95"}`} />
          <button type="button" autoFocus onClick={close} aria-label="Close" className="absolute right-3 top-3 h-12 w-12 font-sans text-3xl font-light text-ivory-soft">×</button>
          <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-1 top-1/2 h-14 w-12 -translate-y-1/2 font-serif text-4xl text-ivory-soft/80 hover:text-ivory-soft">‹</button>
          <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-1 top-1/2 h-14 w-12 -translate-y-1/2 font-serif text-4xl text-ivory-soft/80 hover:text-ivory-soft">›</button>
          <p className="absolute bottom-5 font-sans text-[10px] uppercase tracking-[0.4em] text-ivory-soft/70">{idx + 1} / {n}</p>
        </div>
      )}
    </section>
  );
}

/* ---------------- Closing ---------------- */
function Closing() {
  return (
    <section className="bg-slate-ink px-6 py-28 text-center text-ivory-soft">
      <Reveal className="mx-auto max-w-lg">
        <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-gold">With love</p>
        <p className="mt-6 font-serif text-3xl leading-snug sm:text-4xl">Your presence and blessings will make our day complete.</p>
        <div className="mx-auto my-8 h-px w-24 bg-gold" />
        <p className="font-serif text-5xl italic">Soumya <span className="text-gold">&</span> Aswin</p>
        <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.35em] text-powder">29 November 2026 · Vakathanam, Kottayam</p>
      </Reveal>
    </section>
  );
}
