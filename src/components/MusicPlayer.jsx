import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export default function MusicPlayer({ isStarted, isPausedByVideo = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.45); // Medium volume level
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const synthGainRef = useRef(null);
  const isFallbackActiveRef = useRef(false);
  const wasPlayingBeforeVideoRef = useRef(false);

  // Soft romantic ambient synth chord generator as fallback
  const startRomanticSynth = () => {
    try {
      if (audioContextRef.current) return;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      synthGainRef.current = masterGain;

      // Romantic chord notes: F4, A4, C5, E5, G5
      const notes = [349.23, 440.00, 523.25, 659.25, 392.00, 329.63];
      
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.12 + idx * 0.04, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.04, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);
        lfo.start();

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
      });

      isFallbackActiveRef.current = true;
    } catch (e) {
      console.warn('Web Audio Ambient Synth unavailable', e);
    }
  };

  // Start music once user clicks "OPEN OUR STORY ❤️"
  useEffect(() => {
    if (isStarted && !isPlaying && !isPausedByVideo) {
      const audio = audioRef.current;
      if (audio) {
        audio.volume = volume;
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log('Audio file playback fallback to romantic ambient synth:', err.message);
            startRomanticSynth();
            setIsPlaying(true);
          });
      }
    }
  }, [isStarted]);

  // Video Section Mute/Pause handler
  useEffect(() => {
    const audio = audioRef.current;
    if (isPausedByVideo) {
      if (isPlaying) {
        wasPlayingBeforeVideoRef.current = true;
        if (audio && !isFallbackActiveRef.current) {
          audio.pause();
        } else if (audioContextRef.current && audioContextRef.current.state === 'running') {
          audioContextRef.current.suspend();
        }
        setIsPlaying(false);
      }
    } else {
      // Returned from video section: resume background music if it was previously playing
      if (wasPlayingBeforeVideoRef.current && !isPlaying && isStarted) {
        if (audio && !isFallbackActiveRef.current) {
          audio.play().then(() => {
            setIsPlaying(true);
            wasPlayingBeforeVideoRef.current = false;
          }).catch(() => {
            startRomanticSynth();
            setIsPlaying(true);
            wasPlayingBeforeVideoRef.current = false;
          });
        } else if (audioContextRef.current) {
          audioContextRef.current.resume();
          setIsPlaying(true);
          wasPlayingBeforeVideoRef.current = false;
        }
      }
    }
  }, [isPausedByVideo, isStarted]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    if (synthGainRef.current && audioContextRef.current) {
      synthGainRef.current.gain.setValueAtTime(
        isMuted ? 0 : volume * 0.15,
        audioContextRef.current.currentTime
      );
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      if (audio && !isFallbackActiveRef.current) {
        audio.pause();
      } else if (audioContextRef.current) {
        if (audioContextRef.current.state === 'running') {
          audioContextRef.current.suspend();
        }
      }
      setIsPlaying(false);
      wasPlayingBeforeVideoRef.current = false;
    } else {
      if (audio && !isFallbackActiveRef.current) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {
          startRomanticSynth();
          setIsPlaying(true);
        });
      } else if (audioContextRef.current) {
        audioContextRef.current.resume();
        setIsPlaying(true);
      } else {
        startRomanticSynth();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <aside className="floating-music-btn" aria-label="Background music controls">
      <audio
        ref={audioRef}
        src="/music/background-music.mp3"
        loop
        preload="auto"
        onError={() => {
          if (isPlaying && !isFallbackActiveRef.current) {
            startRomanticSynth();
          }
        }}
      />

      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isPlaying ? "Pause music" : "Play music"}
        style={{ display: 'inline-flex', alignItems: 'center' }}
      >
        {isPlaying ? (
          <div className="music-waves" aria-hidden="true">
            <span className="music-wave-bar" />
            <span className="music-wave-bar" />
            <span className="music-wave-bar" />
            <span className="music-wave-bar" />
          </div>
        ) : (
          <div className="music-waves paused" aria-hidden="true">
            <span className="music-wave-bar" />
            <span className="music-wave-bar" />
            <span className="music-wave-bar" />
            <span className="music-wave-bar" />
          </div>
        )}
      </button>

      <button
        onClick={togglePlay}
        title={isPlaying ? "Pause" : "Play"}
        style={{ display: 'inline-flex', alignItems: 'center' }}
      >
        {isPlaying ? <Pause size={15} /> : <Play size={15} />}
      </button>

      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
        title={isMuted ? "Unmute" : "Mute"}
        style={{ display: 'inline-flex', alignItems: 'center' }}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={isMuted ? 0 : volume}
        onChange={(e) => {
          const val = parseFloat(e.target.value);
          setVolume(val);
          if (isMuted && val > 0) setIsMuted(false);
        }}
        className="volume-slider"
        title={`Volume: ${Math.round(volume * 100)}%`}
        aria-label="Volume slider"
      />
    </aside>
  );
}
