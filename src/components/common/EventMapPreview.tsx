interface GoogleLogoProps {
  className?: string;
}

export function GoogleLogo({ className = "h-3.5 sm:h-4 w-auto" }: GoogleLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 272 92"
      className={className}
      aria-label="Google"
    >
      <path
        fill="#EA4335"
        d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
      />
      <path
        fill="#FBBC05"
        d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
      />
      <path
        fill="#4285F4"
        d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
      />
      <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
      <path
        fill="#EA4335"
        d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
      />
      <path
        fill="#4285F4"
        d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"
      />
    </svg>
  );
}

interface EventMapPreviewProps {
  eventNo: string;
  directionsUrl: string;
}

export function EventMapPreview({ eventNo, directionsUrl }: EventMapPreviewProps) {
  const isCeremony = eventNo === "01";

  return (
    <a
      href={directionsUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`Get directions on Google Maps for ${isCeremony ? "Wedding Ceremony at St. Mathews Knanaya Church" : "Post-Wedding Reception at St. Mary's Knanaya Catholic Church"}`}
      className="group mt-6 sm:mt-7 block relative w-full aspect-[16/8.2] min-h-[175px] max-h-[220px] rounded-2xl overflow-hidden border border-[#ded5c5] shadow-[0_2px_10px_rgba(20,37,48,0.04)] hover:shadow-[0_4px_16px_rgba(20,37,48,0.08)] transition-all duration-300"
    >
      {/* Interactive Map SVG Background */}
      {isCeremony ? (
        // Vakathanam map
        <svg
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          viewBox="0 0 500 240"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="vakathanam-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e4ede3" />
              <stop offset="60%" stopColor="#e9f2e8" />
              <stop offset="100%" stopColor="#dee9dd" />
            </linearGradient>
            <pattern id="terrain-dots-1" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="#cddbc9" opacity="0.4" />
            </pattern>
          </defs>

          {/* Terrain base */}
          <rect width="500" height="240" fill="url(#vakathanam-bg)" />
          <rect width="500" height="240" fill="url(#terrain-dots-1)" />

          {/* Soft foliage clusters */}
          <path d="M20 20 Q70 10 90 40 T150 70 Q110 110 60 90 Z" fill="#d8e8d5" opacity="0.6" />
          <path
            d="M210 120 Q260 100 310 130 T370 190 Q300 220 230 180 Z"
            fill="#d6e6d3"
            opacity="0.6"
          />
          <path
            d="M370 30 Q420 15 470 45 T490 100 Q430 115 390 75 Z"
            fill="#dbeef9"
            opacity="0.3"
          />

          {/* Secondary road network */}
          <path
            d="M-20 60 C80 65, 140 75, 230 68 S390 50, 520 58"
            stroke="#ffffff"
            strokeWidth="6"
            fill="none"
          />
          <path
            d="M120 -20 C125 50, 115 110, 100 170 S85 210, 70 260"
            stroke="#f6f6f4"
            strokeWidth="5"
            fill="none"
          />
          <path
            d="M230 -10 C240 50, 250 100, 265 150 S290 200, 320 250"
            stroke="#ffffff"
            strokeWidth="5.5"
            fill="none"
          />
          <path
            d="M-10 165 C90 155, 190 170, 270 160 S400 145, 520 155"
            stroke="#f6f6f4"
            strokeWidth="4.5"
            fill="none"
          />
          <path
            d="M175 68 C205 105, 220 130, 265 160"
            stroke="#ffffff"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M265 160 C310 150, 360 140, 430 130"
            stroke="#f6f6f4"
            strokeWidth="3.5"
            fill="none"
          />
          <path
            d="M30 110 C80 115, 120 120, 160 110"
            stroke="#ffffff"
            strokeWidth="3.5"
            fill="none"
          />

          {/* MC Road Highway (labeled) */}
          <path
            id="vakathanam-mc-road"
            d="M100 250 L470 170"
            stroke="#ffffff"
            strokeWidth="10"
            fill="none"
          />
          <path d="M100 250 L470 170" stroke="#fafaf7" strokeWidth="8" fill="none" />
          <text dy="-5" className="select-none pointer-events-none">
            <textPath
              href="#vakathanam-mc-road"
              startOffset="16%"
              fill="#7a8479"
              fontSize="9"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="500"
              letterSpacing="0.05em"
            >
              MC Road MC Road
            </textPath>
          </text>

          {/* Neighborhood label */}
          <text
            x="330"
            y="42"
            fill="#455244"
            fontSize="12.5"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="600"
            letterSpacing="0.01em"
            opacity="0.85"
            className="select-none pointer-events-none"
          >
            Vakathanam
          </text>
        </svg>
      ) : (
        // Kothanalloor map with river
        <svg
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          viewBox="0 0 500 240"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="kothanalloor-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e3ede2" />
              <stop offset="60%" stopColor="#e9f2e8" />
              <stop offset="100%" stopColor="#dce8dc" />
            </linearGradient>
            <linearGradient id="river-gradient" x1="0" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#a3d9f7" />
              <stop offset="50%" stopColor="#b5e1fa" />
              <stop offset="100%" stopColor="#9bd3f4" />
            </linearGradient>
          </defs>

          {/* Terrain Base */}
          <rect width="500" height="240" fill="url(#kothanalloor-bg)" />

          {/* Soft foliage clusters */}
          <path d="M30 40 Q70 20 100 50 T130 90 Q80 120 40 90 Z" fill="#d7e6d4" opacity="0.6" />
          <path
            d="M280 140 Q330 110 390 130 T450 190 Q370 230 300 200 Z"
            fill="#d6e6d3"
            opacity="0.6"
          />

          {/* Meandering River Feature */}
          <path
            d="M 215 -10 C 210 35, 218 65, 235 90 C 255 120, 255 145, 235 175 C 210 205, 175 225, 125 245 L 80 245 C 130 220, 168 195, 192 165 C 215 135, 210 112, 195 85 C 180 55, 185 20, 190 -10 Z"
            fill="url(#river-gradient)"
            stroke="#92ccf0"
            strokeWidth="1.2"
          />

          {/* Roads */}
          <path
            d="M-20 75 C90 80, 175 75, 255 70 S400 60, 520 65"
            stroke="#ffffff"
            strokeWidth="6"
            fill="none"
          />
          <path
            d="M165 -10 C175 40, 185 75, 195 120 S215 180, 235 250"
            stroke="#f6f6f4"
            strokeWidth="5"
            fill="none"
          />
          <path
            d="M320 -10 C325 50, 315 100, 310 150 S305 200, 310 250"
            stroke="#ffffff"
            strokeWidth="5"
            fill="none"
          />
          <path
            d="M20 170 C100 165, 210 170, 310 160 S430 155, 520 165"
            stroke="#f6f6f4"
            strokeWidth="4.5"
            fill="none"
          />
          <path
            d="M335 70 C375 110, 405 140, 455 170"
            stroke="#ffffff"
            strokeWidth="3.5"
            fill="none"
          />

          {/* Bridge over River */}
          <line x1="185" y1="73" x2="242" y2="72" stroke="#ebe8e0" strokeWidth="8" />
          <line x1="185" y1="73" x2="242" y2="72" stroke="#ffffff" strokeWidth="6" />

          {/* Neighborhood label */}
          <text
            x="320"
            y="44"
            fill="#455244"
            fontSize="12.5"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="600"
            letterSpacing="0.01em"
            opacity="0.85"
            className="select-none pointer-events-none"
          >
            Kothanalloor
          </text>
        </svg>
      )}

      {/* Red Map Pin & Venue Label */}
      <div
        className="absolute flex items-center pointer-events-none z-10"
        style={
          isCeremony
            ? { left: "54%", top: "54%", transform: "translate(-12px, -85%)" }
            : { left: "46%", top: "54%", transform: "translate(-12px, -85%)" }
        }
      >
        {/* Red Google Maps Pin */}
        <div className="relative shrink-0 flex flex-col items-center">
          <svg
            className="w-6 h-8 sm:w-7 sm:h-9 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
            viewBox="0 0 27 36"
            fill="none"
          >
            <path
              d="M13.5 0C6.044 0 0 6.044 0 13.5C0 23.625 13.5 36 13.5 36C13.5 36 27 23.625 27 13.5C27 6.044 20.956 0 13.5 0Z"
              fill="#D93829"
            />
            <circle cx="13.5" cy="13.5" r="5" fill="#8C1B11" />
          </svg>
          <span className="w-2.5 h-1 rounded-full bg-black/25 blur-[1px] -mt-0.5" />
        </div>

        {/* Text Label with readable white halo */}
        <div className="ml-1.5 leading-[1.18] select-none">
          <p className="font-sans text-[11px] sm:text-[12px] font-semibold text-[#1f2937] [text-shadow:_0_1px_3px_#fff,_0_0_8px_#fff,_0_0_12px_#fff]">
            {isCeremony ? "St. Mathews" : "St. Mary's"}
          </p>
          <p className="font-sans text-[11px] sm:text-[12px] font-semibold text-[#1f2937] [text-shadow:_0_1px_3px_#fff,_0_0_8px_#fff,_0_0_12px_#fff]">
            {isCeremony ? "Knanaya Church" : "Knanaya Catholic Church"}
          </p>
        </div>
      </div>

      {/* Top-Right Google Map Controls (Fullscreen + Zoom) */}
      <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 pointer-events-none select-none">
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white/95 rounded-[3px] shadow-[0_1px_4px_rgba(0,0,0,0.22)] flex items-center justify-center text-[#555]">
          <svg
            className="w-3.5 h-3.5 text-[#555]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </div>
        <div className="w-6 sm:w-7 bg-white/95 rounded-[3px] shadow-[0_1px_4px_rgba(0,0,0,0.22)] flex flex-col items-center divide-y divide-[#ececec] text-[#555]">
          <span className="h-5 sm:h-6 flex items-center justify-center text-xs font-bold leading-none">
            +
          </span>
          <span className="h-5 sm:h-6 flex items-center justify-center text-xs font-bold leading-none">
            −
          </span>
        </div>
      </div>

      {/* Bottom-Left Google Logo */}
      <div className="absolute bottom-2.5 left-3 z-10 pointer-events-none select-none">
        <GoogleLogo className="h-3.5 sm:h-4 w-auto drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]" />
      </div>

      {/* Bottom-Right 'Get directions' Pill Button */}
      <div className="absolute bottom-2.5 right-2.5 z-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#fdfbf7]/95 sm:bg-white/95 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-[11.5px] font-sans font-medium text-[#7a5b28] shadow-[0_2px_8px_rgba(0,0,0,0.14)] border border-[#e2d5c3] group-hover:bg-[#b8955a] group-hover:text-white group-hover:border-[#b8955a] group-hover:shadow-[0_4px_12px_rgba(184,149,90,0.35)] transition-all duration-200">
          <svg className="w-3 h-3 fill-current transform rotate-[-30deg]" viewBox="0 0 24 24">
            <path d="M3 12l18-9-9 18-2-7-7-2z" />
          </svg>
          <span>Get directions</span>
          <svg
            className="w-3 h-3 stroke-current transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>
    </a>
  );
}
