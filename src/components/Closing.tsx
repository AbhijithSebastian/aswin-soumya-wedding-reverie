export function Closing() {
  return (
    <footer
      className="relative w-full bg-gradient-to-r from-[#8e682e] via-[#a37a3f] to-[#855e27] py-5 sm:py-6 px-6 sm:px-12 lg:px-16 text-[#fdf7ee] select-none shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
      aria-label="Wedding Invitation Footer"
    >
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 text-center sm:text-left">
        {/* Left: Couple's names */}
        <p className="font-serif italic text-2xl sm:text-[27px] font-normal leading-none text-[#fffdf7] tracking-wide">
          Soumya <span className="font-light text-[#f5dfbe]">&amp;</span> Aswin
        </p>

        {/* Center: Date & Place */}
        <p className="font-sans text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.28em] text-[#faedd7]/90">
          29 NOVEMBER 2026 &nbsp;+&nbsp; VAKATHANAM, KOTTAYAM
        </p>

        {/* Right: With Love & Blessings with leading thin rule */}
        <div className="flex items-center gap-3">
          <span
            className="hidden sm:inline-block h-px w-10 sm:w-14 bg-[#f3dec0]/55"
            aria-hidden="true"
          />
          <p className="font-sans text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.28em] text-[#faedd7]/90">
            WITH LOVE &amp; BLESSINGS
          </p>
        </div>
      </div>
    </footer>
  );
}
