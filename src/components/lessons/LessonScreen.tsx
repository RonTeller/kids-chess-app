import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChessBoard } from '../board/ChessBoard'
import { Celebration } from '../feedback/Celebration'
import { LessonHeader } from './LessonHeader'
import { LessonPrompt } from './LessonPrompt'
import { useGameStore } from '../../stores/gameStore'
import { useLessonStore } from '../../stores/lessonStore'
import { getLessonForPiece } from '../../lessons/lessonData'
import { playMoveSound, playStarSound, playCelebrationSound, playFireworksSound } from '../../audio/sounds'
import type { Position } from '../../chess/types'
import './LessonScreen.css'

interface LessonScreenProps {
  onBack: () => void
}

export function LessonScreen({ onBack }: LessonScreenProps) {
  const { setupBoard } = useGameStore()
  const {
    currentPiece,
    currentStepIndex,
    movesMade,
    getCurrentStep,
    nextStep,
    incrementMoves,
    markPieceComplete
  } = useLessonStore()

  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationType, setCelebrationType] = useState<'stars' | 'confetti' | 'fireworks'>('stars')

  const step = getCurrentStep()
  const lesson = getLessonForPiece(currentPiece)

  // Generate random target positions for challenge step
  const generateRandomTargets = (count: number, piecePosition: Position): Position[] => {
    const targets: Position[] = []
    const pieceKey = `${piecePosition.row},${piecePosition.col}`

    while (targets.length < count) {
      const row = Math.floor(Math.random() * 8)
      const col = Math.floor(Math.random() * 8)
      const key = `${row},${col}`

      // Make sure target doesn't overlap with piece or other targets
      const isOccupied = key === pieceKey || targets.some(t => t.row === row && t.col === col)
      if (!isOccupied) {
        targets.push({ row, col })
      }
    }

    return targets
  }

  // Setup board when step changes
  useEffect(() => {
    let targets = step.targets

    // Randomize target positions for challenge step
    if (step.type === 'challenge' && step.pieces.length > 0) {
      const piecePos = step.pieces[0].position
      targets = generateRandomTargets(3, piecePos)
    }

    setupBoard({
      boardSize: 8,
      pieces: step.pieces,
      targets
    })
  }, [step, setupBoard])

  const handleMoveComplete = (_from: Position, _to: Position, hitTarget: boolean) => {
    incrementMoves()

    // Read fresh state from stores
    const currentStep = useLessonStore.getState().getCurrentStep()
    const currentMoves = useLessonStore.getState().movesMade
    const currentTargets = useGameStore.getState().targets
    const piece = useLessonStore.getState().currentPiece

    if (hitTarget) {
      playStarSound()
      setCelebrationType('stars')
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 1500)
    } else {
      playMoveSound()
    }

    // Check completion conditions
    let shouldAdvance = false
    if (currentStep.type === 'practice') {
      shouldAdvance = currentMoves >= (currentStep.requiredMoves || 10)
    } else if (currentStep.type === 'challenge') {
      shouldAdvance = currentTargets.length === 0
    }

    if (shouldAdvance) {
      setTimeout(() => {
        if (currentStep.type === 'challenge') {
          // Challenge complete - show fireworks and go back to home
          playFireworksSound()
          markPieceComplete(piece)
          setCelebrationType('fireworks')
          setShowCelebration(true)
          setTimeout(() => {
            setShowCelebration(false)
            onBack()
          }, 3000)
        } else {
          // Practice complete - show confetti and move to challenge
          playCelebrationSound()
          setCelebrationType('confetti')
          setShowCelebration(true)
          setTimeout(() => {
            setShowCelebration(false)
            nextStep()
          }, 2000)
        }
      }, 500)
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

        {step.type === 'practice' && (
          <motion.div
            className="move-counter"
            key={movesMade}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {movesMade} / {step.requiredMoves || 10}
          </motion.div>
        )}

        <div className="lesson-board-container">
          <ChessBoard
            showValidMoves={true}
            onMoveComplete={handleMoveComplete}
          />
        </div>
      </div>

      <AnimatePresence>
        {showCelebration && (
          <Celebration type={celebrationType} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
