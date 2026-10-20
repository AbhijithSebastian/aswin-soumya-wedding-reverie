import { events } from "@/lib/wedding";
import { Reveal } from "@/components/common/Reveal";
import { EventMapPreview } from "@/components/common/EventMapPreview";

export function Events() {
  return (
    <section
      id="events"
      className="scroll-mt-4 bg-[#fcf9f2] bg-[radial-gradient(ellipse_90%_75%_at_50%_45%,#fffdf9_0%,#f9f5ec_60%,#f3ebdc_100%)] px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Heading */}
        <Reveal className="text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#b8955a] font-medium">
            CELEBRATIONS
          </p>
          <h2 className="mt-2 font-serif text-[clamp(2.5rem,4.5vw,3.6rem)] font-light leading-tight text-[#132734]">
            Wedding Events
          </h2>
          <img
            src="/images/lotus-heading-divider.svg"
            alt=""
            aria-hidden="true"
            className="mx-auto my-3 sm:my-4 w-[150px] sm:w-[180px] lg:w-[200px] h-auto select-none"
          />
        </Reveal>

        {/* 2-Card Event Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {events.map((e) => (
            <Reveal
              key={e.no}
              className="flex flex-col justify-between rounded-[22px] border border-[#e6dcce] bg-[#fffdfa]/90 p-6 sm:p-8 lg:p-9 shadow-[0_4px_24px_rgba(20,37,48,0.03)] hover:shadow-[0_8px_32px_rgba(20,37,48,0.06)] transition-all duration-300"
            >
              <div>
                {/* Number & Horizontal Accent Line */}
                <div className="flex items-center">
                  <span className="font-serif text-4xl sm:text-5xl italic font-light text-[#b8955a] leading-none select-none">
                    {e.no}
                  </span>
                  <span className="ml-4 h-px w-14 sm:w-16 bg-[#c5a87b]/60 inline-block" />
                </div>

                {/* Subtitle / Eyebrow */}
                {e.sub && (
                  <p className="mt-5 font-sans text-[10.5px] uppercase tracking-[0.28em] text-[#b08c50] font-medium">
                    {e.sub}
                  </p>
                )}

                {/* Event Title */}
                <h3 className="mt-1 font-serif text-[clamp(1.65rem,2.4vw,2.05rem)] font-normal text-[#132734] leading-snug">
                  {e.title}
                </h3>

                {/* Event Details List */}
                <div className="mt-7 sm:mt-8">
                  {/* Date */}
                  <div className="flex items-center gap-4 sm:gap-5 pb-4">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#f4ece0] text-[#9b7b46]">
                      <svg
                        className="w-5 h-5 text-[#9b7b46]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                        <circle cx="8" cy="14" r="0.75" fill="currentColor" />
                        <circle cx="12" cy="14" r="0.75" fill="currentColor" />
                        <circle cx="16" cy="14" r="0.75" fill="currentColor" />
                        <circle cx="8" cy="18" r="0.75" fill="currentColor" />
                        <circle cx="12" cy="18" r="0.75" fill="currentColor" />
                        <circle cx="16" cy="18" r="0.75" fill="currentColor" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#8a8072] font-medium">
                        DATE
                      </p>
                      <p className="mt-0.5 font-serif text-[15px] sm:text-[16px] text-[#132734] leading-normal">
                        {e.date}
                      </p>
                    </div>
                  </div>

                  <div className="border-b border-[#e8dfcf]/70" />

                  {/* Time */}
                  <div className="flex items-center gap-4 sm:gap-5 py-4">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#f4ece0] text-[#9b7b46]">
                      <svg
                        className="w-5 h-5 text-[#9b7b46]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <polyline points="12 7 12 12 15 15" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#8a8072] font-medium">
                        TIME
                      </p>
                      <p className="mt-0.5 font-serif text-[15px] sm:text-[16px] text-[#132734] leading-normal">
                        {e.time}
                      </p>
                    </div>
                  </div>

                  <div className="border-b border-[#e8dfcf]/70" />

                  {/* Venue */}
                  <div className="flex items-start gap-4 sm:gap-5 pt-4">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#f4ece0] text-[#9b7b46] mt-0.5">
                      <svg
                        className="w-5 h-5 text-[#9b7b46]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C7.58172 2 4 5.58172 4 10C4 15.25 12 22 12 22C12 22 20 15.25 20 10C20 5.58172 16.4183 2 12 2ZM12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10C15 11.6569 13.6569 13 12 13Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#8a8072] font-medium">
                        VENUE
                      </p>
                      <p className="mt-0.5 font-serif text-[15px] sm:text-[16px] text-[#132734] leading-relaxed">
                        {e.venue},<br />
                        {e.place}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google Maps Preview */}
                <EventMapPreview
                  eventNo={e.no}
                  directionsUrl={
                    e.no === "01"
                      ? "https://www.google.com/maps/dir/?api=1&destination=St.+Mathews+Knanaya+Church+Njaliyakuzhi+Vakathanam"
                      : "https://www.google.com/maps/dir/?api=1&destination=St+Mary%27s+Knanaya+Catholic+Church+Kothanalloor"
                  }
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
