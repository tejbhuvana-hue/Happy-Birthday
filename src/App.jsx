import React, { useState } from 'react';
import AmbientCanvas from './components/AmbientCanvas';
import MusicPlayer from './components/MusicPlayer';
import OpeningScreen from './sections/OpeningScreen';
import AlphabetIntro from './sections/AlphabetIntro';
import ChapterView from './sections/ChapterView';
import SurpriseScreen from './sections/SurpriseScreen';
import VideoInterlude from './components/VideoInterlude';
import FinaleScreen from './sections/FinaleScreen';
import { STORY_CHAPTERS } from './data/storyData';
import './styles/index.css';
import './styles/components.css';

export default function App() {
  // Screen states: 'OPENING' | 'INTRO' | 'CHAPTERS' | 'SURPRISE' | 'VIDEO' | 'FINALE'
  const [currentScreen, setCurrentScreen] = useState('OPENING');
  const [chapterIndex, setChapterIndex] = useState(0);
  const [isMusicStarted, setIsMusicStarted] = useState(false);

  // User initiates story from Opening Screen
  const handleOpenStory = () => {
    setIsMusicStarted(true);
    setCurrentScreen('INTRO');
  };

  // User begins Chapter A from Alphabet Intro
  const handleBeginChapters = () => {
    setChapterIndex(0);
    setCurrentScreen('CHAPTERS');
  };

  // Next chapter handler: A through Z
  const handleNextChapter = () => {
    if (chapterIndex < STORY_CHAPTERS.length - 1) {
      setChapterIndex((prev) => prev + 1);
    } else {
      // Reached past Z -> Transition to Surprise Screen
      setCurrentScreen('SURPRISE');
    }
  };

  // Previous chapter handler
  const handlePreviousChapter = () => {
    if (chapterIndex > 0) {
      setChapterIndex((prev) => prev - 1);
    }
  };

  // Jump to specific letter
  const handleSelectChapter = (index) => {
    setChapterIndex(index);
    setCurrentScreen('CHAPTERS');
  };

  // User clicks OPEN on Surprise Screen -> Start Video
  const handleOpenSurprise = () => {
    setCurrentScreen('VIDEO');
  };

  // After video completes -> Transition to Finale (resumes background music)
  const handleContinueFromVideo = () => {
    setCurrentScreen('FINALE');
  };

  // Replay story from Finale
  const handleReplayStory = () => {
    setChapterIndex(0);
    setCurrentScreen('OPENING');
  };

  return (
    <div className="app-container">
      {/* Background ambient floating hearts & particles */}
      <AmbientCanvas />

      {/* Floating persistent music player (automatically pauses in VIDEO section and resumes after) */}
      <MusicPlayer
        isStarted={isMusicStarted}
        isPausedByVideo={currentScreen === 'VIDEO'}
      />

      {/* View router */}
      {currentScreen === 'OPENING' && (
        <OpeningScreen onOpenStory={handleOpenStory} />
      )}

      {currentScreen === 'INTRO' && (
        <AlphabetIntro onBeginStory={handleBeginChapters} />
      )}

      {currentScreen === 'CHAPTERS' && (
        <ChapterView
          currentIndex={chapterIndex}
          onPrevious={handlePreviousChapter}
          onNext={handleNextChapter}
          onSelectIndex={handleSelectChapter}
          onOpenVideo={() => setCurrentScreen('VIDEO')}
        />
      )}

      {currentScreen === 'SURPRISE' && (
        <SurpriseScreen onOpenSurprise={handleOpenSurprise} />
      )}

      {currentScreen === 'VIDEO' && (
        <VideoInterlude onContinue={handleContinueFromVideo} autoPlay={true} />
      )}

      {currentScreen === 'FINALE' && (
        <FinaleScreen onReplayStory={handleReplayStory} />
      )}
    </div>
  );
}
