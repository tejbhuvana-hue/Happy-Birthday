import React, { useState } from 'react';

export default function PolaroidCard({ imageSrc, caption, letter }) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className="polaroid-container">
      <div className="polaroid-frame" tabIndex={0} role="img" aria-label={`Memory photograph for chapter ${letter}`}>
        <div className="polaroid-tape" aria-hidden="true" />
        <div className="polaroid-photo-wrapper">
          {!hasError ? (
            <img
              src={imageSrc}
              alt={`A cherished memory for letter ${letter}`}
              className="polaroid-photo"
              loading="lazy"
              onError={() => setHasError(true)}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #2b0e1b 0%, #4a152e 50%, #1a0818 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffb3c6',
                padding: '16px',
                textAlign: 'center'
              }}
            >
              <span style={{ fontSize: '2.2rem', marginBottom: '6px' }}>❤️</span>
              <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.04em' }}>
                Our Precious Memory
              </span>
            </div>
          )}
        </div>
        {caption && <figcaption className="polaroid-caption">{caption}</figcaption>}
      </div>
    </figure>
  );
}
