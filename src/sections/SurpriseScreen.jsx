import React from 'react';
import { Gift, Heart, Sparkles } from 'lucide-react';

export default function SurpriseScreen({ onOpenSurprise }) {
  return (
    <main className="surprise-screen" aria-label="Surprise for you">
      <div className="surprise-content">
        <div className="surprise-icon-wrapper" aria-hidden="true">
          <Gift size={42} className="surprise-gift-icon" />
          <Sparkles size={20} className="surprise-sparkle-icon" />
        </div>

        <h1 className="surprise-title">
          I have a surprise for you... ❤️
        </h1>

        <p className="surprise-subtitle">
          One little piece of our world that words could never completely hold.
        </p>

        <button
          id="btn-open-surprise"
          onClick={onOpenSurprise}
          className="btn-open-story btn-surprise"
          aria-label="Open Surprise"
        >
          <span>OPEN</span>
          <Heart size={20} fill="#ffffff" color="#ffffff" style={{ animation: 'heartbeat 1.8s infinite' }} />
        </button>
      </div>
    </main>
  );
}
