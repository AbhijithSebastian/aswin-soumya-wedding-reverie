import { useCallback, useEffect, useRef, useState } from "react";

interface MusicToggleProps {
  shouldPlay?: boolean;
}

const PRIMARY_AUDIO_SRC = "/andriih-wedding-wedding-music-601619.mp3";
const FALLBACK_AUDIO_SRC = "/audio/andriih-wedding-wedding-music-601619.mp3";

export function MusicToggle({ shouldPlay = false }: MusicToggleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasTriggeredPlayRef = useRef(false);

  useEffect(() => {
    const audio = new Audio();
    audio.src = PRIMARY_AUDIO_SRC;
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };
    const onError = () => {
      if (!audio.src.includes("/audio/")) {
        audio.src = FALLBACK_AUDIO_SRC;
        audio.load();
        if (hasTriggeredPlayRef.current) {
          audio.play().catch(() => {});
        }
      }
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    // Immediate play triggered from user's tap on the wax seal
    const handleImmediatePlay = () => {
      if (!hasTriggeredPlayRef.current) {
        hasTriggeredPlayRef.current = true;
        audio.loop = true;
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Audio play error on gesture:", err);
          });
      }
    };
    window.addEventListener("wedding-music-play", handleImmediatePlay);

    return () => {
      window.removeEventListener("wedding-music-play", handleImmediatePlay);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // When shouldPlay becomes true (hero section is open), ensure music is playing on loop
  useEffect(() => {
    if (shouldPlay && audioRef.current && !hasTriggeredPlayRef.current) {
      hasTriggeredPlayRef.current = true;
      audioRef.current.loop = true;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio autoplay blocked by browser policy, unlocking on next touch:", err);
          const unlock = () => {
            if (audioRef.current && audioRef.current.paused) {
              audioRef.current.loop = true;
              audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {});
            }
            window.removeEventListener("click", unlock);
            window.removeEventListener("touchstart", unlock);
          };
          window.addEventListener("click", unlock, { once: true });
          window.addEventListener("touchstart", unlock, { once: true });
        });
    }
  }, [shouldPlay]);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.loop = true;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio playback was prevented by browser:", err);
          setIsPlaying(false);
        });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
      title={isPlaying ? "Pause background music" : "Play background music"}
      className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] right-[calc(1.5rem+env(safe-area-inset-right,0px))] z-40 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-[#d0b37c]/85 shadow-[0_4px_22px_rgba(0,0,0,0.45),0_0_14px_rgba(208,179,124,0.22)] transition-all duration-300 hover:scale-105 hover:border-[#e2c792] hover:shadow-[0_6px_26px_rgba(0,0,0,0.55),0_0_18px_rgba(208,179,124,0.38)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d0b37c] focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none select-none cursor-pointer"
      style={{
        background: "radial-gradient(circle at 35% 35%, #1c3628 0%, #13241b 60%, #0c1711 100%)",
      }}
    >
      {/* Subtle concentric champagne-gold ring for luxury depth */}
      <span className="pointer-events-none absolute inset-[3px] rounded-full border border-[#d0b37c]/25" />

      {/* Icon: Play / Pause */}
      <span className="relative flex items-center justify-center transition-all duration-200">
        {isPlaying ? (
          // Pause capsule bars matching visual reference
          <svg
            className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-[#eeddbd] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] transition-all duration-300"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <rect x="6.5" y="4" width="3.5" height="16" rx="1.75" />
            <rect x="14" y="4" width="3.5" height="16" rx="1.75" />
          </svg>
        ) : (
          // Play triangle with smooth rounded corners
          <svg
            className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-[#eeddbd] ml-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] transition-all duration-300"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M7.5 4.8C7.5 3.9 8.5 3.35 9.3 3.8l10 6.4c.75.48.75 1.56 0 2.04l-10 6.4c-.8.5-1.8-.05-1.8-.96V4.8z" />
          </svg>
        )}
      </span>
    </button>
  );
}
