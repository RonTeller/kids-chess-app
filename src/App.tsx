import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { HomeScreen } from './components/screens/HomeScreen'
import { LessonScreen } from './components/lessons/LessonScreen'
import { useLessonStore } from './stores/lessonStore'
import type { PieceType } from './chess/types'

export default function App() {
  const [screen, setScreen] = useState<'home' | 'lesson'>('home')
  const { setCurrentPiece, resetLesson } = useLessonStore()

  const handleSelectPiece = (piece: PieceType) => {
    setCurrentPiece(piece)
    resetLesson()
    setScreen('lesson')
  }

  const handleBackToHome = () => {
    setScreen('home')
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {screen === 'home' ? (
          <HomeScreen key="home" onSelectPiece={handleSelectPiece} />
        ) : (
          <LessonScreen key="lesson" onBack={handleBackToHome} />
        )}
      </AnimatePresence>
    </div>
  )
}
