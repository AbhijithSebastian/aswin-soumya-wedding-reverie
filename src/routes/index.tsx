import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import envelope from "@/assets/envelope.png.asset.json";
import scenic from "@/assets/scenic.png.asset.json";
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
      { property: "og:title", content: "Aswin & Soumya · ശുഭ വിവാഹം" },
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

/* ---------------- Envelope ---------------- */
function Envelope({ opening, onOpen }: { opening: boolean; onOpen: () => void }) {
  const bg = { backgroundImage: `url(${envelope.url})` };
  return (
    <div className={`env fixed inset-0 z-50 overflow-hidden bg-ivory ${opening ? "is-opening" : ""}`}>
      {/* invitation card */}
      <div className="env-card absolute left-1/2 top-[18%] flex h-[46%] w-[72%] max-w-sm -translate-x-1/2 flex-col items-center justify-center border border-gold/50 bg-ivory-soft text-center">
        <p className="font-ml text-sm text-gold">ശുഭ വിവാഹം</p>
        <p className="mt-3 font-serif text-4xl text-ink">Aswin <span className="italic text-gold">&</span> Soumya</p>
        <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.35em] text-ink/70">29 · 11 · 2026</p>
      </div>
      {/* bottom pocket hides card's lower part */}
      <div className="env-pocket pointer-events-none absolute inset-0 bg-cover bg-center" style={bg} />
      {/* top flap */}
      <div className="env-flap pointer-events-none absolute inset-0 bg-cover bg-center" style={bg} />
      <button
        type="button"
        onClick={onOpen}
        aria-label="Break the seal to open the invitation"
        className="env-seal absolute z-10 left-1/2 top-1/2 h-[21vh] w-[21vh] max-w-[36vw] max-h-[36vw] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-gold"
      >
        <span className="seal-ring absolute inset-0 rounded-full" />
      </button>
      <p className="env-hint pointer-events-none absolute bottom-[8%] w-full text-center font-sans text-[10px] uppercase tracking-[0.4em] text-ink/60">
        Tap the seal
      </p>
    </div>
  );
}

/* ---------------- Cover ---------------- */
function Cover() {
  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
      <img src={scenic.url} alt="Stone arch with blossoms opening onto a golden-hour mountain lake" className="cover-img absolute inset-0 h-full w-full object-cover object-[50%_60%]" />
      <div className="cover-wash absolute inset-0" />
      <div className="relative z-10 mx-auto flex h-full max-w-md flex-col items-center px-6 pt-[13svh] text-center text-ink">
        <p className="rise font-ml text-lg text-ink sm:text-xl" style={{ animationDelay: ".2s" }}>ശുഭ വിവാഹം</p>
        <p className="rise mt-4 font-sans text-[10px] uppercase tracking-[0.45em] text-ink/80" style={{ animationDelay: ".4s" }}>The Wedding of</p>
        <h1 className="rise mt-3 font-serif text-[clamp(3rem,14vw,5.5rem)] leading-[0.95] text-ink" style={{ animationDelay: ".6s" }}>
          Aswin <span className="block font-light italic text-gold-deep">&</span> Soumya
        </h1>
        <div className="rise mt-6 flex items-center gap-4 text-ink" style={{ animationDelay: ".9s" }}>
          <span className="font-sans text-[10px] uppercase tracking-[0.35em]">Sunday</span>
          <span className="border-x border-gold px-4 font-serif text-4xl">29</span>
          <span className="font-sans text-[10px] uppercase tracking-[0.35em]">Nov 2026</span>
        </div>
      </div>
      <a href="#invitation" aria-label="Scroll to invitation" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-ivory-soft">
        <span className="scroll-line block h-10 w-px bg-ivory-soft/80" />
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
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-slate-ink">Counting down to Muhurtham</p>
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
                <p className="font-ml text-sm text-gold-deep">{e.ml}</p>
                <h3 className="mt-1 font-serif text-3xl text-ink">{e.title}</h3>
                <dl className="mt-5 space-y-3 font-sans text-sm text-ink/80">
                  <div><dt className="text-[10px] uppercase tracking-[0.3em] text-slate-ink">Date</dt><dd>{e.date}</dd></div>
                  <div><dt className="text-[10px] uppercase tracking-[0.3em] text-slate-ink">Time</dt><dd>{e.time}</dd></div>
                  <div><dt className="text-[10px] uppercase tracking-[0.3em] text-slate-ink">Venue</dt><dd>{e.venue}, {e.place}</dd></div>
                </dl>
                <a href={e.map} target="_blank" rel="noreferrer" className="mt-6 inline-block border-b border-gold pb-1 font-sans text-[11px] uppercase tracking-[0.3em] text-ink hover:text-gold-deep">
                  Open in Maps →
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
        <p className="font-ml text-gold">ശുഭ വിവാഹം</p>
        <p className="mt-6 font-serif text-3xl leading-snug sm:text-4xl">Your presence and blessings will make our day complete.</p>
        <div className="mx-auto my-8 h-px w-24 bg-gold" />
        <p className="font-serif text-5xl italic">Soumya <span className="text-gold">&</span> Aswin</p>
        <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.35em] text-powder">29 November 2026 · Vakathanam, Kottayam</p>
      </Reveal>
    </section>
  );
}
