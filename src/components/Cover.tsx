import { useEffect, useRef, useState } from "react";

interface CoverProps {
  isOpen?: boolean;
}

const SCENIC_POSTER = "/images/scenic.png";

export function Cover({ isOpen = false }: CoverProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (!hasAnimated) {
        setHasAnimated(true);
      }
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.loop = true;
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isOpen, hasAnimated]);

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("invitation");
    if (target) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
    }
  };

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
      {/* Cinematic Hero Video with Poster Fallback */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={SCENIC_POSTER}
        className="cover-video absolute inset-0 h-full w-full object-cover object-center"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        <img
          src={SCENIC_POSTER}
          alt="Stone arch with blossoms opening onto a golden-hour mountain lake"
          className="cover-img absolute inset-0 h-full w-full object-cover object-[50%_60%]"
        />
      </video>

      {/* Cinematic Contrast Overlay to make video deep & rich */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.25)_0%,transparent_75%)]" />

      {/* Floating Standout Hero Typography */}
      <div
        className={`hero-text-container ${hasAnimated ? "is-revealed" : ""} relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-4 sm:px-6 text-center text-ivory-soft`}
      >
        <p className="hero-anim-item hero-eyebrow font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.42em] text-[#fae29c] [text-shadow:_0_1px_3px_rgba(0,0,0,1),_0_2px_10px_rgba(0,0,0,0.95),_0_0_20px_rgba(0,0,0,0.9)]">
          The Wedding of
        </p>

        <h1 className="mt-3 sm:mt-5 font-serif text-[clamp(2.5rem,7.5vw,5.6rem)] font-normal leading-[1.08] tracking-tight text-[#fbf7ee] [text-shadow:_0_2px_4px_rgba(0,0,0,0.8),_0_4px_24px_rgba(0,0,0,0.9),_0_0_35px_rgba(212,175,106,0.25)] flex flex-wrap items-center justify-center">
          <span className="hero-anim-item hero-name-aswin inline-block">Aswin</span>
          <span className="hero-anim-item hero-amp inline-block font-serif italic font-normal text-[#fae29c] text-[1em] mx-3.5 sm:mx-5.5 drop-shadow-[0_2px_12px_rgba(250,226,156,0.55)] [text-shadow:_0_1px_3px_rgba(0,0,0,1),_0_3px_14px_rgba(0,0,0,0.95),_0_0_22px_rgba(250,226,156,0.5)]">
            &amp;
          </span>
          <span className="hero-anim-item hero-name-soumya inline-block">Soumya</span>
        </h1>
      </div>

      {/* Exact bottom-middle SCROLL DOWN indicator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 sm:bottom-6 z-20 flex flex-col items-center justify-center pb-[env(safe-area-inset-bottom,0px)]">
        <a
          href="#invitation"
          onClick={handleScrollClick}
          aria-label="Scroll down to invitation"
          className={`hero-scroll-indicator ${hasAnimated ? "is-revealed" : ""} pointer-events-auto group flex flex-col items-center gap-1.5 select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[#fae29c]/60`}
        >
          <svg
            className="scroll-arrow w-3.5 h-3.5 text-[#fae29c] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <span className="font-sans text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.34em] text-[#faecc8] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] group-hover:text-white transition-colors duration-200">
            SCROLL DOWN
          </span>
        </a>
      </div>
    </section>
  );
}
