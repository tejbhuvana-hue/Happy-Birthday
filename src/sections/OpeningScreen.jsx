import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function OpeningScreen({ onOpenStory }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Progressive timed cinematic text reveals
    const timers = [
      setTimeout(() => setStep(1), 600),   // "A story..."
      setTimeout(() => setStep(2), 2200),  // "written with 26 letters..."
      setTimeout(() => setStep(3), 3800),  // "A → Z"
      setTimeout(() => setStep(4), 5400),  // "One story. Two hearts. One love."
      setTimeout(() => setStep(5), 7200),  // "Some feelings are too big for a single sentence."
      setTimeout(() => setStep(6), 9000),  // "OPEN OUR STORY ❤️"
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <main className="opening-screen" aria-label="Welcome screen">
      <div className="opening-content">
        {/* Step 1: "A story..." */}
        <div className={`opening-step ${step >= 1 ? 'visible' : ''}`}>
          <h1 className="opening-subtext">A story...</h1>
        </div>

        {/* Step 2: "written with 26 letters..." */}
        <div className={`opening-step ${step >= 2 ? 'visible' : ''}`}>
          <p className="opening-subtext" style={{ fontSize: 'clamp(1.2rem, 3.2vw, 1.8rem)' }}>
            written with 26 letters...
          </p>
        </div>

        {/* Step 3: "A → Z" */}
        <div className={`opening-step ${step >= 3 ? 'visible' : ''}`}>
          <div className="opening-az-highlight">A → Z</div>
        </div>

        {/* Step 4: "One story. Two hearts. One love." */}
        <div className={`opening-step ${step >= 4 ? 'visible' : ''}`}>
          <div className="opening-triad">
            One story.<br />
            Two hearts.<br />
            One love.
          </div>
        </div>

        {/* Step 5: "Some feelings are too big for a single sentence." */}
        <div className={`opening-step ${step >= 5 ? 'visible' : ''}`}>
          <p className="opening-quote">
            “Some feelings are too big for a single sentence.”
          </p>
        </div>

        {/* Step 6: "OPEN OUR STORY ❤️" */}
        <div className={`opening-step ${step >= 6 ? 'visible' : ''}`}>
          <button
            id="btn-open-story"
            onClick={onOpenStory}
            className="btn-open-story"
            aria-label="Open Our Story"
          >
            <span>OPEN OUR STORY</span>
            <Heart size={20} fill="#ffffff" color="#ffffff" style={{ animation: 'heartbeat 1.8s infinite' }} />
          </button>
        </div>
      </div>
    </main>
  );
}
