import { useState, useCallback, useEffect } from "react";
import "./EnvelopeOpening.css";

type EnvelopeOpeningProps = {
  onOpen: () => void;
  showHint?: boolean;
  stage?: "sealed" | "opening" | "open";
  isOpening?: boolean;
};

/**
 * Procedural audio synthesis for tactile envelope feedback.
 * Generates an organic wax seal "crack" followed by a whisper of paper sliding.
 */
function playEnvelopeSound() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // 1. Wax crack sound (crisp organic snap)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.12);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);

    // 2. Paper slide whisper (gentle bandpass filtered noise)
    const bufferSize = Math.floor(ctx.sampleRate * 0.45);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(750, now + 0.2);
    filter.frequency.linearRampToValueAtTime(1400, now + 0.6);
    filter.Q.value = 1.1;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, now + 0.2);
    noiseGain.gain.linearRampToValueAtTime(0.07, now + 0.4);
    noiseGain.gain.linearRampToValueAtTime(0.001, now + 0.7);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now + 0.2);
    noise.stop(now + 0.75);

    // 3. Luxurious golden harp chime (warm celestial harmonics)
    const chimeNotes = [587.33, 880]; // D5, A5
    chimeNotes.forEach((freq, idx) => {
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = "sine";
      chimeOsc.frequency.setValueAtTime(freq, now + 0.12 + idx * 0.08);
      chimeGain.gain.setValueAtTime(0.001, now + 0.12 + idx * 0.08);
      chimeGain.gain.exponentialRampToValueAtTime(0.05, now + 0.18 + idx * 0.08);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85 + idx * 0.08);
      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc.start(now + 0.12 + idx * 0.08);
      chimeOsc.stop(now + 0.9 + idx * 0.08);
    });
  } catch {
    // Graceful fallback if audio is unsupported
  }
}

/**
 * High-definition floral damask SVG pattern defs — rich organic botanical vines,
 * blooming peony florets, and delicate filigree matching the royal wedding stationery.
 */
function DamaskPatternDefs() {
  return (
    <svg className="envelope-opening__defs" aria-hidden="true">
      <defs>
        <pattern id="envelope-damask" width="160" height="220" patternUnits="userSpaceOnUse">
          <g fill="#c4a559" stroke="#c4a559">
            {/* Center Peony Flower Head */}
            <circle cx="80" cy="110" r="6" fill="#c4a559" opacity="0.22" stroke="none" />
            <circle cx="80" cy="110" r="10" fill="none" strokeWidth="0.8" opacity="0.18" />
            <path d="M80 94 C72 102 88 102 80 94 Z" opacity="0.22" stroke="none" />
            <path d="M80 126 C72 118 88 118 80 126 Z" opacity="0.22" stroke="none" />
            <path d="M64 110 C72 102 72 118 64 110 Z" opacity="0.22" stroke="none" />
            <path d="M96 110 C88 102 88 118 96 110 Z" opacity="0.22" stroke="none" />

            {/* Outer Petals */}
            <path d="M68 98 C60 90 70 82 76 92 Z" opacity="0.16" stroke="none" />
            <path d="M92 98 C100 90 90 82 84 92 Z" opacity="0.16" stroke="none" />
            <path d="M68 122 C60 130 70 138 76 128 Z" opacity="0.16" stroke="none" />
            <path d="M92 122 C100 130 90 138 84 128 Z" opacity="0.16" stroke="none" />

            {/* S-curve sweeping vine tendrils */}
            <path
              d="M80 94 Q65 60 40 45 Q58 64 80 94"
              strokeWidth="0.9"
              fill="none"
              opacity="0.2"
            />
            <path
              d="M80 94 Q95 60 120 45 Q102 64 80 94"
              strokeWidth="0.9"
              fill="none"
              opacity="0.2"
            />
            <path
              d="M80 126 Q65 160 40 175 Q58 156 80 126"
              strokeWidth="0.9"
              fill="none"
              opacity="0.2"
            />
            <path
              d="M80 126 Q95 160 120 175 Q102 156 80 126"
              strokeWidth="0.9"
              fill="none"
              opacity="0.2"
            />

            {/* Serrated Leaf Sprigs */}
            <path d="M40 45 Q30 36 34 48 Q42 46 40 45 Z" opacity="0.22" stroke="none" />
            <path d="M120 45 Q130 36 126 48 Q118 46 120 45 Z" opacity="0.22" stroke="none" />
            <path d="M40 175 Q30 184 34 172 Q42 174 40 175 Z" opacity="0.22" stroke="none" />
            <path d="M120 175 Q130 184 126 172 Q118 174 120 175 Z" opacity="0.22" stroke="none" />

            {/* Secondary Leaflets */}
            <path d="M55 70 Q45 68 50 78 Q57 74 55 70 Z" opacity="0.18" stroke="none" />
            <path d="M105 70 Q115 68 110 78 Q103 74 105 70 Z" opacity="0.18" stroke="none" />
            <path d="M55 150 Q45 152 50 142 Q57 146 55 150 Z" opacity="0.18" stroke="none" />
            <path d="M105 150 Q115 152 110 142 Q103 146 105 150 Z" opacity="0.18" stroke="none" />

            {/* Corner Medallion Flowers */}
            <circle cx="0" cy="0" r="4" opacity="0.18" stroke="none" />
            <circle cx="160" cy="0" r="4" opacity="0.18" stroke="none" />
            <circle cx="0" cy="220" r="4" opacity="0.18" stroke="none" />
            <circle cx="160" cy="220" r="4" opacity="0.18" stroke="none" />

            <path d="M0 0 Q20 15 25 30" strokeWidth="0.8" fill="none" opacity="0.15" />
            <path d="M160 0 Q140 15 135 30" strokeWidth="0.8" fill="none" opacity="0.15" />
            <path d="M0 220 Q20 205 25 190" strokeWidth="0.8" fill="none" opacity="0.15" />
            <path d="M160 220 Q140 205 135 190" strokeWidth="0.8" fill="none" opacity="0.15" />
          </g>
        </pattern>
      </defs>
    </svg>
  );
}

export default function EnvelopeOpening({
  onOpen,
  showHint = true,
  stage,
  isOpening: externalIsOpening,
}: EnvelopeOpeningProps) {
  const [internalOpening, setInternalOpening] = useState(false);

  const isOpening = stage === "opening" || externalIsOpening === true || internalOpening;

  const handleClick = useCallback(() => {
    if (isOpening) return;
    setInternalOpening(true);
    playEnvelopeSound();
    onOpen();
  }, [isOpening, onOpen]);

  useEffect(() => {
    if (stage === "opening" && !internalOpening) {
      setInternalOpening(true);
      playEnvelopeSound();
    }
  }, [stage, internalOpening]);

  return (
    <section
      className={`envelope-opening ${isOpening ? "is-opening" : ""}`}
      aria-label="Wedding Invitation Envelope"
    >
      <DamaskPatternDefs />

      <div className="envelope-opening__stage">
        {/* Layer 1: Interior Pocket Backing with Royal Monogram & Golden Radiance */}
        <div className="envelope-opening__interior" aria-hidden="true">
          <div className="envelope-opening__interior-glow" />
          <div className="envelope-opening__interior-crest">
            <svg
              className="envelope-opening__interior-icon"
              viewBox="0 0 60 60"
              fill="none"
              stroke="#bfa04e"
              strokeWidth="1.2"
              aria-hidden="true"
            >
              <circle cx="30" cy="30" r="25" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="30" cy="30" r="20" opacity="0.4" />
              <path d="M30 10 V50 M10 30 H50" opacity="0.25" />
              <path d="M20 20 L40 40 M40 20 L20 40" opacity="0.18" />
              {/* Laurel leaf sprigs */}
              <path d="M18 30 C16 25 20 20 25 18" stroke="#bfa04e" strokeWidth="1" />
              <path d="M42 30 C44 25 40 20 35 18" stroke="#bfa04e" strokeWidth="1" />
            </svg>
            <div className="envelope-opening__interior-monogram">A &amp; S</div>
            <div className="envelope-opening__interior-date">29 · 11 · 2026</div>
          </div>
        </div>

        {/* Golden Light Burst on Unseal */}
        <div className="envelope-opening__burst" aria-hidden="true" />

        {/* Layer 2: Envelope Pocket Front */}
        <div className="envelope-opening__pocket" aria-hidden="true">
          <svg className="envelope-opening__pocket-pattern" width="100%" height="100%">
            <rect width="100%" height="100%" fill="url(#envelope-damask)" />
          </svg>
        </div>

        {/* Diagonal Gold Piping on the Pocket V cut */}
        <svg
          className="envelope-opening__lines"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Subtle drop shadow line */}
          <line
            x1="0"
            y1="0"
            x2="50"
            y2="50"
            stroke="rgba(80, 55, 20, 0.25)"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1="100"
            y1="0"
            x2="50"
            y2="50"
            stroke="rgba(80, 55, 20, 0.25)"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />

          {/* Crisp gold foil lines */}
          <line
            x1="0"
            y1="0"
            x2="50"
            y2="50"
            stroke="#d4b259"
            strokeWidth="0.45"
            opacity="0.95"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1="100"
            y1="0"
            x2="50"
            y2="50"
            stroke="#d4b259"
            strokeWidth="0.45"
            opacity="0.95"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1="0"
            y1="100"
            x2="50"
            y2="50"
            stroke="#cfa846"
            strokeWidth="0.38"
            opacity="0.75"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1="100"
            y1="100"
            x2="50"
            y2="50"
            stroke="#cfa846"
            strokeWidth="0.38"
            opacity="0.75"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Layer 4: 3D Top Flap (Hinged at top edge, rotates open) */}
        <div className="envelope-opening__flap" aria-hidden="true">
          <div className="envelope-opening__flap-front">
            <svg width="100%" height="100%">
              <rect width="100%" height="100%" fill="url(#envelope-damask)" />
            </svg>
            <svg
              className="envelope-opening__flap-lines"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="0"
                x2="50"
                y2="100"
                stroke="rgba(80, 55, 20, 0.2)"
                strokeWidth="0.8"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1="100"
                y1="0"
                x2="50"
                y2="100"
                stroke="rgba(80, 55, 20, 0.2)"
                strokeWidth="0.8"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1="0"
                y1="0"
                x2="50"
                y2="100"
                stroke="#d4b259"
                strokeWidth="0.45"
                opacity="0.95"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1="100"
                y1="0"
                x2="50"
                y2="100"
                stroke="#d4b259"
                strokeWidth="0.45"
                opacity="0.95"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          <div className="envelope-opening__flap-back">
            <svg
              width="44"
              height="44"
              viewBox="0 0 40 40"
              fill="none"
              stroke="#b89748"
              strokeWidth="1.2"
              opacity="0.45"
              aria-hidden="true"
            >
              <circle cx="20" cy="20" r="14" />
              <circle cx="20" cy="20" r="11" strokeDasharray="2 2" />
              <path d="M20 10 V30 M10 20 H30" />
            </svg>
          </div>
        </div>

        {/* Layer 5: Interactive 3D Wax Seal Button */}
        <button
          type="button"
          className="envelope-opening__seal-btn"
          onClick={handleClick}
          aria-label="Break the seal to open wedding invitation"
        >
          <img
            src="/images/wax-seal.png"
            alt=""
            className="envelope-opening__seal-img"
            aria-hidden="true"
          />
          <span className="envelope-opening__seal-glow" aria-hidden="true" />
        </button>

        {/* Prompt Hint */}
        {showHint && (
          <p className="envelope-opening__hint" aria-live="polite">
            Tap the seal
          </p>
        )}
      </div>
    </section>
  );
}
