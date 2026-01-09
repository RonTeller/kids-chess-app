import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChessBoard } from '../board/ChessBoard'
import { Celebration } from '../feedback/Celebration'
import { LessonHeader } from './LessonHeader'
import { LessonPrompt } from './LessonPrompt'
import { useGameStore } from '../../stores/gameStore'
import { useLessonStore } from '../../stores/lessonStore'
import { getLessonForPiece } from '../../lessons/lessonData'
import type { Position } from '../../chess/types'
import './LessonScreen.css'

interface LessonScreenProps {
  onBack: () => void
}

export function LessonScreen({ onBack }: LessonScreenProps) {
  const { setupBoard, targets } = useGameStore()
  const {
    currentPiece,
    currentStepIndex,
    movesMade,
    getCurrentStep,
    nextStep,
    incrementMoves,
    markPieceComplete,
    isLastStep
  } = useLessonStore()

  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationType, setCelebrationType] = useState<'stars' | 'confetti' | 'fireworks'>('stars')

  const step = getCurrentStep()
  const lesson = getLessonForPiece(currentPiece)

  // Setup board when step changes
  useEffect(() => {
    setupBoard({
      boardSize: step.boardSize,
      pieces: step.pieces,
      targets: step.targets
    })
  }, [step, setupBoard])

  const handleMoveComplete = (_from: Position, to: Position) => {
    incrementMoves()

    // Check if captured a target
    const hitTarget = step.targets?.some(t => t.row === to.row && t.col === to.col)

    if (hitTarget) {
      setCelebrationType('stars')
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 1500)
    }

    // Check completion conditions
    const shouldAdvance = checkStepComplete()
    if (shouldAdvance) {
      setTimeout(() => {
        if (step.type === 'challenge' || step.type === 'practice') {
          setCelebrationType('confetti')
          setShowCelebration(true)
          setTimeout(() => {
            setShowCelebration(false)
            advanceStep()
          }, 2000)
        } else {
          advanceStep()
        }
      }, 500)
    }
  }

  const checkStepComplete = (): boolean => {
    // Read fresh state from stores - closure values are stale after store updates
    const currentMoves = useLessonStore.getState().movesMade
    const currentTargets = useGameStore.getState().targets

    switch (step.type) {
      case 'intro':
        return true // Always advance on tap
      case 'demo':
        return true // Auto-advance
      case 'guided':
        return currentMoves >= 1
      case 'practice':
        return currentMoves >= (step.requiredMoves || 3)
      case 'challenge':
        return currentTargets.length === 0 // All targets captured
      case 'celebration':
        return false // Manual advance
      default:
        return false
    }
  }

  const advanceStep = () => {
    if (isLastStep()) {
      markPieceComplete(currentPiece)
      setCelebrationType('fireworks')
      setShowCelebration(true)
      setTimeout(() => {
        setShowCelebration(false)
        onBack()
      }, 3000)
    } else {
      nextStep()
    }
  }

  const handleContinue = () => {
    if (step.type === 'intro' || step.type === 'demo') {
      advanceStep()
    } else if (step.type === 'celebration') {
      markPieceComplete(currentPiece)
      onBack()
    }
  }

  return (
    <motion.div
      className="lesson-screen"
      style={{ '--theme-color': lesson.themeColor } as React.CSSProperties}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <LessonHeader
        pieceName={lesson.friendlyName}
        currentStep={currentStepIndex + 1}
        totalSteps={lesson.steps.length}
        themeColor={lesson.themeColor}
        onBack={onBack}
      />

      <div className="lesson-content">
        <LessonPrompt stepType={step.type} pieceName={lesson.friendlyName} />

        <div className="lesson-board-container">
          <ChessBoard
            showValidMoves={step.showValidMoves}
            onMoveComplete={handleMoveComplete}
          />
        </div>

        {(step.type === 'intro' || step.type === 'demo' || step.type === 'celebration') && (
          <motion.button
            className="big-button big-button--primary continue-button"
            onClick={handleContinue}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {step.type === 'celebration' ? 'Done!' : 'Next'}
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showCelebration && (
          <Celebration type={celebrationType} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
