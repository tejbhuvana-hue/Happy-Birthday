import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

export default function FinaleScreen({ onReplayStory }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Staggered pauses for maximum emotional resonance
    const timers = [
      setTimeout(() => setStep((s) => Math.max(s, 1)), 400),   // A → Z
      setTimeout(() => setStep((s) => Math.max(s, 2)), 1600),  // "26 letters."
      setTimeout(() => setStep((s) => Math.max(s, 3)), 2800),  // "One story."
      setTimeout(() => setStep((s) => Math.max(s, 4)), 4000),  // "Two hearts."
      setTimeout(() => setStep((s) => Math.max(s, 5)), 5200),  // "One love."
      setTimeout(() => setStep((s) => Math.max(s, 6)), 6800),  // "Always." "Forever." "Home." "Love."
      setTimeout(() => setStep((s) => Math.max(s, 7)), 8400),  // ❤️♾️
      setTimeout(() => setStep((s) => Math.max(s, 8)), 9800),  // "Some stories end at Z."
      setTimeout(() => setStep((s) => Math.max(s, 9)), 11200), // "Ours doesn't."
      setTimeout(() => setStep((s) => Math.max(s, 10)), 12600),// "Because there are still so many chapters left to write."
      setTimeout(() => setStep((s) => Math.max(s, 11)), 14000),// "REPLAY OUR STORY ❤️"
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSkipOrProceed = () => {
    if (step < 11) {
      setStep(11);
    }
  };

  return (
    <main
      className="finale-screen"
      aria-label="Finale screen"
      onClick={handleSkipOrProceed}
      style={{ cursor: step < 11 ? 'pointer' : 'default' }}
    >
      <div className="finale-content">
        {/* A → Z Monogram */}
        <div
          className={`finale-monogram finale-sequence-line ${step >= 1 ? 'visible' : ''}`}
          role="heading"
          aria-level={1}
        >
          A → Z
        </div>

        {/* 26 letters. */}
        <p className={`finale-sequence-line ${step >= 2 ? 'visible' : ''}`}>
          26 letters.
        </p>

        {/* One story. */}
        <p className={`finale-sequence-line ${step >= 3 ? 'visible' : ''}`}>
          One story.
        </p>

        {/* Two hearts. */}
        <p className={`finale-sequence-line ${step >= 4 ? 'visible' : ''}`}>
          Two hearts.
        </p>

        {/* One love. */}
        <p className={`finale-sequence-line ${step >= 5 ? 'visible' : ''}`}>
          One love.
        </p>

        {/* Always. Forever. Home. Love. */}
        <div className={`finale-cluster finale-sequence-line ${step >= 6 ? 'visible' : ''}`}>
          <span className="finale-cluster-item">Always.</span>
          <span className="finale-cluster-item">Forever.</span>
          <span className="finale-cluster-item">Home.</span>
          <span className="finale-cluster-item">Love.</span>
        </div>

        {/* ❤️♾️ Symbol */}
        <div className={`finale-symbol finale-sequence-line ${step >= 7 ? 'visible' : ''}`}>
          ❤️♾️
        </div>

        {/* Some stories end at Z. */}
        <p className={`finale-sequence-line ${step >= 8 ? 'visible' : ''}`}>
          Some stories end at Z.
        </p>

        {/* Ours doesn't. */}
        <p
          className={`finale-sequence-line ${step >= 9 ? 'visible' : ''}`}
          style={{ color: 'var(--accent-pink)', fontWeight: 600 }}
        >
          Ours doesn't.
        </p>

        {/* Because there are still so many chapters left to write. */}
        <p className={`finale-closing-text finale-sequence-line ${step >= 10 ? 'visible' : ''}`}>
          Because there are still so many chapters left to write.
        </p>

        {/* REPLAY OUR STORY ❤️ */}
        <div className={`finale-sequence-line ${step >= 11 ? 'visible' : ''}`}>
          <button
            id="btn-replay-story"
            onClick={(e) => {
              e.stopPropagation();
              onReplayStory();
            }}
            className="btn-replay-story"
            aria-label="Replay our story"
          >
            <RotateCcw size={18} />
            <span>REPLAY OUR STORY ❤️</span>
          </button>
        </div>
      </div>
    </main>
  );
}
