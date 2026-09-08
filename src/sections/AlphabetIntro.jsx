import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { INTRO_TEXTS } from '../data/storyData';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AlphabetIntro({ onBeginStory }) {
  const [activeLetters, setActiveLetters] = useState([]);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // 1. Reveal letters A to Z progressively
    let letterIndex = 0;
    const letterInterval = setInterval(() => {
      if (letterIndex < ALPHABET.length) {
        const nextChar = ALPHABET[letterIndex];
        setActiveLetters((prev) => [...prev, nextChar]);
        letterIndex++;
      } else {
        clearInterval(letterInterval);
        // Stage 1: Fade out all except A and Z
        setTimeout(() => setStage((s) => Math.max(s, 1)), 600);
        // Stage 2: Show "A → Z" focal
        setTimeout(() => setStage((s) => Math.max(s, 2)), 1400);
        // Stage 3: "Every letter has a meaning."
        setTimeout(() => setStage((s) => Math.max(s, 3)), 2400);
        // Stage 4: "Every meaning has a feeling."
        setTimeout(() => setStage((s) => Math.max(s, 4)), 3600);
        // Stage 5: "Every feeling has you."
        setTimeout(() => setStage((s) => Math.max(s, 5)), 4800);
        // Stage 6: Show begin button
        setTimeout(() => setStage((s) => Math.max(s, 6)), 5800);
      }
    }, 60);

    return () => clearInterval(letterInterval);
  }, []);

  // Quick skip function on user click if in early stages
  const handleSkipOrProceed = () => {
    if (stage < 6) {
      setStage(6);
      setActiveLetters(ALPHABET);
    } else {
      onBeginStory();
    }
  };

  return (
    <main
      className="intro-screen"
      aria-label="Alphabet prologue"
      onClick={handleSkipOrProceed}
      style={{ cursor: stage < 6 ? 'pointer' : 'default' }}
    >
      {/* Alphabet Grid showing A..Z sequence */}
      {stage < 2 && (
        <div className="alphabet-grid" aria-hidden="true">
          {ALPHABET.map((char) => {
            const isShown = activeLetters.includes(char);
            const isFading = stage === 1 && char !== 'A' && char !== 'Z';
            return (
              <span
                key={char}
                className={`alphabet-letter ${isShown ? 'active' : ''} ${isFading ? 'faded' : ''}`}
              >
                {char}
              </span>
            );
          })}
        </div>
      )}

      {/* Prominent A → Z reveal */}
      {stage >= 2 && (
        <div className="intro-focal-az" role="heading" aria-level={1}>
          A → Z
        </div>
      )}

      {/* Poetic Lines Reveal */}
      <div className="intro-lines">
        <p className={`intro-line ${stage >= 3 ? 'visible' : ''}`}>
          {INTRO_TEXTS[0]}
        </p>
        <p className={`intro-line ${stage >= 4 ? 'visible' : ''}`}>
          {INTRO_TEXTS[1]}
        </p>
        <p className={`intro-line highlight ${stage >= 5 ? 'visible' : ''}`}>
          {INTRO_TEXTS[2]}
        </p>
      </div>

      {/* Begin Chapter A */}
      {stage >= 6 && (
        <button
          id="btn-begin-story"
          onClick={(e) => {
            e.stopPropagation();
            onBeginStory();
          }}
          className="btn-open-story"
          style={{ marginTop: '36px' }}
          aria-label="Begin Chapter A"
        >
          <span>Begin Chapter A</span>
          <ArrowRight size={18} />
        </button>
      )}

      {stage < 6 && (
        <p style={{ marginTop: '24px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
          (Tap anywhere to skip sequence)
        </p>
      )}
    </main>
  );
}
