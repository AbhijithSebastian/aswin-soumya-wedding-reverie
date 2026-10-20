import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/common/Reveal";

interface PhotoItem {
  src: string;
  alt: string;
  pos: string;
}

const photos: PhotoItem[] = [
  {
    src: "/images/couple1.jpg",
    alt: "Aswin and Soumya",
    pos: "object-[50%_28%]",
  },
  {
    src: "/images/couple2.jpg",
    alt: "Aswin and Soumya",
    pos: "object-[50%_35%]",
  },
  {
    src: "/images/couple3.jpg",
    alt: "Aswin and Soumya",
    pos: "object-[50%_65%]",
  },
  {
    src: "/images/couple4.jpg",
    alt: "Aswin and Soumya",
    pos: "object-[50%_45%]",
  },
  {
    src: "/images/couple5.jpg",
    alt: "Aswin and Soumya",
    pos: "object-[50%_15%]",
  },
  {
    src: "/images/couple6.jpg",
    alt: "Aswin and Soumya",
    pos: "object-[50%_75%]",
  },
  {
    src: "/images/couple7.jpg",
    alt: "Aswin and Soumya",
    pos: "object-[50%_75%]",
  },
];

const cardSpans = [
  "col-span-1 sm:col-span-3 lg:col-span-3",
  "col-span-1 sm:col-span-3 lg:col-span-3",
  "col-span-1 sm:col-span-3 lg:col-span-3",
  "col-span-1 sm:col-span-3 lg:col-span-3",
  "col-span-1 sm:col-span-2 lg:col-span-4",
  "col-span-1 sm:col-span-2 lg:col-span-4",
  "col-span-2 sm:col-span-2 lg:col-span-4",
];

export function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const touchX = useRef(0);
  const n = photos.length;

  const show = (i: number) => {
    setIdx(i);
    requestAnimationFrame(() => setVisible(true));
  };

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setIdx((cur) => {
        if (cur !== null) triggers.current[cur]?.focus({ preventScroll: true });
        return null;
      });
    }, 250);
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
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.scrollTo({ top: y });
    };
  }, [idx, close, step]);

  return (
    <section
      id="gallery"
      className="gallery-section relative flex flex-col justify-center px-4 py-8 sm:px-6 lg:py-8 lg:px-8 lg:min-h-screen"
    >
      <div className="mx-auto w-full max-w-[1260px]">
        {/* Centered Editorial Header */}
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="font-sans text-[clamp(10px,0.85vw,11px)] uppercase tracking-[0.45em] text-gold-deep">
            OUR GALLERY
          </p>
          <h2 className="mt-1 font-serif text-[clamp(1.75rem,2.8vw,2.5rem)] font-light leading-tight text-ink">
            Moments that stay with us
          </h2>
          <img
            src="/images/lotus-heading-divider.svg"
            alt=""
            aria-hidden="true"
            className="mx-auto my-2 w-[90px] sm:w-[110px] h-auto select-none"
          />
          <p className="font-serif text-[clamp(12px,0.95vw,14px)] font-light leading-relaxed text-ink/75 max-w-lg mx-auto">
            A glimpse into the beautiful moments, the people we cherish, and the journey that
            brought us here.
          </p>
        </Reveal>

        {/* 7 Couple Photos Grid */}
        <Reveal className="mt-5 sm:mt-6 lg:mt-7">
          <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-12 gap-2.5 sm:gap-3 lg:gap-3.5 xl:gap-4">
            {photos.map((photo, i) => (
              <button
                key={i}
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                onClick={() => show(i)}
                aria-label={`Open photo ${i + 1}`}
                className={`group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-ivory-soft/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold border border-gold/20 hover:border-gold/60 cursor-pointer ${
                  cardSpans[i] || "col-span-1"
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${photo.pos}`}
                />

                {/* Hover overlay with click to expand badge */}
                <div className="absolute inset-0 bg-charcoal/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center p-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory-soft/95 px-3.5 py-1.5 font-sans text-[11px] font-medium uppercase tracking-wider text-[#132734] shadow-md backdrop-blur-sm transition-transform duration-300 group-hover:scale-100 scale-90 border border-gold/40">
                    <svg
                      className="h-3.5 w-3.5 text-gold-deep"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                    <span>Click to expand</span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Lightbox / Pop-up Modal */}
      {idx !== null && photos[idx] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${idx + 1} of ${n}`}
          className={`fixed inset-0 z-[70] flex flex-col items-center justify-between bg-charcoal/95 backdrop-blur-md px-3 py-4 sm:p-6 transition-opacity duration-300 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          onTouchStart={(e) => {
            touchX.current = e.touches[0]!.clientX;
          }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0]!.clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}
        >
          {/* Top Bar: Counter & Close button */}
          <div className="w-full max-w-5xl flex items-center justify-between z-10">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#eeddbd] font-medium">
              PHOTO {idx + 1} OF {n}
            </span>
            <button
              type="button"
              autoFocus
              onClick={close}
              aria-label="Close Pop-up"
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/10 text-ivory-soft hover:bg-gold hover:text-white transition-colors duration-200 backdrop-blur-md text-2xl font-light cursor-pointer"
            >
              ×
            </button>
          </div>

          {/* Center Stage: Photo with Previous / Next Arrows */}
          <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-2 sm:my-3">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute left-1 sm:left-3 z-10 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-black/40 hover:bg-gold text-white font-serif text-3xl sm:text-4xl transition-colors backdrop-blur-md cursor-pointer"
            >
              ‹
            </button>

            <img
              key={idx}
              src={photos[idx]!.src}
              alt={photos[idx]!.alt}
              className={`max-h-[68vh] sm:max-h-[74vh] max-w-[90vw] sm:max-w-[85vw] object-contain rounded-xl shadow-2xl transition-all duration-300 ring-1 ring-white/10 select-none ${
                visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            />

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute right-1 sm:right-3 z-10 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-black/40 hover:bg-gold text-white font-serif text-3xl sm:text-4xl transition-colors backdrop-blur-md cursor-pointer"
            >
              ›
            </button>
          </div>

          {/* Bottom Bar: Mini Thumbnail Strip */}
          <div className="w-full max-w-5xl flex flex-col items-center z-10 pb-1">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full px-2 py-1 scrollbar-none">
              {photos.map((p, thumbIdx) => (
                <button
                  key={thumbIdx}
                  type="button"
                  onClick={() => setIdx(thumbIdx)}
                  aria-label={`Jump to photo ${thumbIdx + 1}`}
                  className={`relative h-9 w-12 sm:h-11 sm:w-16 flex-shrink-0 rounded-md overflow-hidden transition-all duration-200 cursor-pointer ${
                    thumbIdx === idx
                      ? "ring-2 ring-gold scale-105 opacity-100"
                      : "opacity-45 hover:opacity-80 ring-1 ring-white/20"
                  }`}
                >
                  <img
                    src={p.src}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
