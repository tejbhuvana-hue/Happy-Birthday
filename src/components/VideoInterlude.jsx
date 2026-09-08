import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { VIDEO_PROMPTS } from '../data/storyData';

export default function VideoInterlude({ onContinue, autoPlay = true }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Video autoplay prevented or file loading:', err.message);
      });
    }
  }, [autoPlay]);

  return (
    <section className="video-interlude-screen" aria-label="Our Video Memory">
      {/* Intro transition phrases */}
      <header className="video-intro-text">
        <p className="video-intro-line1">{VIDEO_PROMPTS.introLine1}</p>
        <p className="video-intro-line2">{VIDEO_PROMPTS.introLine2}</p>
      </header>

      {/* Standard HTML5 Video Player with 16:9 aspect ratio, preload="metadata", playsInline, controls */}
      <div className="video-player-container">
        <video
          ref={videoRef}
          className="video-player-element"
          controls
          preload="metadata"
          playsInline
          poster="/images/image4.jpg"
          aria-label="Our Love Story Video"
        >
          <source
            src="https://res.cloudinary.com/gk5rbuwo/video/upload/love-video.mp4"
            type="video/mp4"
          />
          Your browser does not support HTML5 video.
        </video>
      </div>

      {/* Outro phrase and continue to Finale button */}
      <footer className="video-outro-text">
        <p className="video-outro-line">{VIDEO_PROMPTS.outroLine}</p>
        <button
          onClick={onContinue}
          className="btn-open-story"
          aria-label="Continue to Finale"
        >
          <span>Continue to Finale</span>
          <ArrowRight size={18} />
        </button>
      </footer>
    </section>
  );
}
