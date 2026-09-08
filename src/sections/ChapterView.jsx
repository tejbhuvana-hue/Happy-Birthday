import React, { useState, useEffect, useRef } from 'react';
import PolaroidCard from '../components/PolaroidCard';
import SwipeIndicator from '../components/SwipeIndicator';
import { STORY_CHAPTERS } from '../data/storyData';

export default function ChapterView({
  currentIndex,
  onPrevious,
  onNext,
  onSelectIndex,
  onOpenVideo
}) {
  const current = STORY_CHAPTERS[currentIndex] || STORY_CHAPTERS[0];

  // Gesture state for touch & mouse drag
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const cardRef = useRef(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        onNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        onPrevious();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onNext, onPrevious]);

  // Touch handlers
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startX.current;
    const diffY = currentY - startY.current;

    // Only drag horizontally if horizontal movement is greater
    if (Math.abs(diffX) > Math.abs(diffY)) {
      setDragOffset(diffX);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset < -45) {
      // Swiped left -> Next
      onNext();
    } else if (dragOffset > 45) {
      // Swiped right -> Previous
      onPrevious();
    }
    setDragOffset(0);
  };

  // Mouse Drag handlers for desktop swipe
  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diffX = e.clientX - startX.current;
    setDragOffset(diffX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset < -45) {
      onNext();
    } else if (dragOffset > 45) {
      onPrevious();
    }
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
    }
  };

  // Emotional Pacing
  const progressRatio = currentIndex / 25;
  const glowOpacity = 0.15 + progressRatio * 0.35;
  const cardBorderGlow = `rgba(255, 77, 109, ${0.12 + progressRatio * 0.28})`;

  // Calculate dynamic card drag transformation
  const cardTransform = isDragging
    ? `translateX(${dragOffset * 0.85}px) rotate(${dragOffset * 0.04}deg)`
    : 'translateX(0px) rotate(0deg)';

  return (
    <main
      className="chapter-container no-scroll-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      aria-label={`Chapter ${current.letter} of our love story`}
    >
      {/* Tap zones for effortless page turning on edges */}
      <div
        className="swipe-touch-edge left"
        onClick={onPrevious}
        aria-label="Previous page tap zone"
        title="Tap or swipe left to go back"
      />
      <div
        className="swipe-touch-edge right"
        onClick={onNext}
        aria-label="Next page tap zone"
        title="Tap or swipe right to advance"
      />

      <div className="chapter-card-wrapper">
        <article
          ref={cardRef}
          className="chapter-card"
          key={current.letter}
          style={{
            borderColor: cardBorderGlow,
            transform: cardTransform,
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
            boxShadow: `0 16px 45px rgba(0, 0, 0, 0.75), 0 0 ${25 + progressRatio * 40}px rgba(201, 24, 74, ${glowOpacity})`
          }}
        >
          {/* Watermark Letter */}
          <div className="chapter-watermark" aria-hidden="true">
            {current.letter}
          </div>

          {/* Header */}
          <header className="chapter-header">
            <span className="chapter-badge">Chapter {current.letter}</span>
            <h1 className="chapter-title">{current.title}</h1>
          </header>

          {/* Polaroid Photo if present for designated letters */}
          {current.image && (
            <PolaroidCard
              imageSrc={current.image}
              caption={current.imageCaption}
              letter={current.letter}
            />
          )}

          {/* EXACT LOCKED CONTENT: Verbatim characters, spaces, and line breaks */}
          <div className="chapter-text-box">
            <p className="chapter-locked-text">{current.text}</p>
          </div>
        </article>
      </div>

      {/* Swipe Progress & Gesture Indicator */}
      <SwipeIndicator
        currentIndex={currentIndex}
        totalLetters={STORY_CHAPTERS.length}
      />
    </main>
  );
}
