import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { STORY_CHAPTERS } from '../data/storyData';

export default function SwipeIndicator({ currentIndex, totalLetters = 26 }) {
  const currentChapter = STORY_CHAPTERS[currentIndex] || STORY_CHAPTERS[0];
  const progressPercent = ((currentIndex + 1) / totalLetters) * 100;

  return (
    <footer className="swipe-navigation-footer" aria-label="Swipe navigation helper">
      {/* Chapter Badge & Indicator */}
      <div className="swipe-status-row">
        <div className="chapter-counter-pill">
          <Heart size={13} fill="var(--accent-pink)" color="var(--accent-pink)" />
          <span>{currentChapter.letter} / {totalLetters}</span>
        </div>

        {/* Subtle Swipe Hint */}
        <div className="swipe-gesture-hint" aria-hidden="true">
          <span className="swipe-arrow-left">‹</span>
          <span className="swipe-hint-text">Swipe to turn page</span>
          <span className="swipe-arrow-right">›</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="swipe-progress-track">
        <div
          className="swipe-progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </footer>
  );
}
