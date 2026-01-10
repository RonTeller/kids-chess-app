import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ChessBoard } from '../board/ChessBoard'
import { Celebration } from '../feedback/Celebration'
import { LessonHeader } from './LessonHeader'
import { LessonPrompt } from './LessonPrompt'
import { useGameStore } from '../../stores/gameStore'
import { useLessonStore } from '../../stores/lessonStore'
import { getLessonForPiece } from '../../lessons/lessonData'
import { playMoveSound, playStarSound, playCelebrationSound, playFireworksSound } from '../../audio/sounds'
import { calculateEscapeMove } from '../../chess/chaseAI'
import { getValidMoves } from '../../chess/moveValidation'
import { positionToKey, positionsEqual } from '../../chess/types'
import type { Position, Piece } from '../../chess/types'
import './LessonScreen.css'

interface LessonScreenProps {
  onBack: () => void
}

export function LessonScreen({ onBack }: LessonScreenProps) {
  const { t } = useTranslation()
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
  const [isAIMoving, setIsAIMoving] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const enemyPositionRef = useRef<Position | null>(null)

  const step = getCurrentStep()
  const lesson = getLessonForPiece(currentPiece)

  // Generate a safe random position for the enemy king (not reachable on first move)
  const generateSafeEnemyPosition = (playerPiece: Piece, playerPosition: Position): Position => {
    const board = new Map<string, Piece>()
    board.set(positionToKey(playerPosition), playerPiece)

    const playerMoves = getValidMoves(playerPiece, playerPosition, board, 8)
    const reachableKeys = new Set(playerMoves.map(p => positionToKey(p)))
    reachableKeys.add(positionToKey(playerPosition)) // Also exclude player's position

    // Find all safe positions
    const safePositions: Position[] = []
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const key = positionToKey({ row, col })
        if (!reachableKeys.has(key)) {
          safePositions.push({ row, col })
        }
      }
    }

    // Pick a random safe position
    const randomIndex = Math.floor(Math.random() * safePositions.length)
    return safePositions[randomIndex]
  }

  // Generate random target positions for challenge step
  const generateRandomTargets = (count: number, piecePosition: Position): Position[] => {
    const targets: Position[] = []
    const pieceKey = `${piecePosition.row},${piecePosition.col}`

    // For bishops, targets must be on same color squares (same parity of row+col)
    const isBishop = currentPiece === 'bishop'
    const bishopParity = (piecePosition.row + piecePosition.col) % 2

    while (targets.length < count) {
      const row = Math.floor(Math.random() * 8)
      const col = Math.floor(Math.random() * 8)
      const key = `${row},${col}`

      // Make sure target doesn't overlap with piece or other targets
      const isOccupied = key === pieceKey || targets.some(t => t.row === row && t.col === col)

      // For bishops, ensure target is on a reachable square (same color)
      const isReachable = !isBishop || (row + col) % 2 === bishopParity

      if (!isOccupied && isReachable) {
        targets.push({ row, col })
      }
    }

    return targets
  }

  // Setup board when step changes
  useEffect(() => {
    let targets = step.targets
    let piecesToPlace = [...step.pieces]

    // Randomize target positions for challenge step
    if (step.type === 'challenge' && step.pieces.length > 0) {
      const piecePos = step.pieces[0].position
      targets = generateRandomTargets(3, piecePos)
    }

    // For chase mode, add the enemy piece to the board with a safe random position
    if (step.type === 'chase' && step.enemyPiece && step.pieces.length > 0) {
      const playerPiece = step.pieces[0].piece
      const playerPosition = step.pieces[0].position
      const safePosition = generateSafeEnemyPosition(playerPiece, playerPosition)

      piecesToPlace.push({
        piece: step.enemyPiece.piece,
        position: safePosition
      })
      enemyPositionRef.current = safePosition
    } else {
      enemyPositionRef.current = null
    }

    setupBoard({
      boardSize: 8,
      pieces: piecesToPlace,
      targets
    })
  }, [step, setupBoard])

  const handleMoveComplete = (_from: Position, to: Position, hitTarget: boolean) => {
    incrementMoves()

    // Read fresh state from stores
    const currentStep = useLessonStore.getState().getCurrentStep()
    const currentMoves = useLessonStore.getState().movesMade
    const currentTargets = useGameStore.getState().targets
    const piece = useLessonStore.getState().currentPiece

    // Handle chase mode
    if (currentStep.type === 'chase') {
      playMoveSound()

      // Check if player caught the enemy
      const enemyPos = enemyPositionRef.current
      if (enemyPos && positionsEqual(to, enemyPos)) {
        // Player caught the enemy!
        setIsTransitioning(true)
        enemyPositionRef.current = null
        playFireworksSound()
        markPieceComplete(piece)
        setCelebrationType('fireworks')
        setShowCelebration(true)
        setTimeout(() => {
          setShowCelebration(false)
          onBack()
        }, 3000)
        return
      }

      // Enemy needs to escape - trigger AI move after delay
      setIsAIMoving(true)
      setTimeout(() => {
        makeAIMove(to)
        setIsAIMoving(false)
      }, 800)
      return
    }

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
      shouldAdvance = currentMoves >= (currentStep.requiredMoves || 5)
    } else if (currentStep.type === 'challenge') {
      shouldAdvance = currentTargets.length === 0
    }

    if (shouldAdvance) {
      setIsTransitioning(true)
      setTimeout(() => {
        if (currentStep.type === 'challenge') {
          // Challenge complete - show confetti and move to chase (if not pawn)
          playCelebrationSound()
          setCelebrationType('confetti')
          setShowCelebration(true)
          setTimeout(() => {
            setShowCelebration(false)
            // Check if there's a chase step (pawns don't have one)
            const lesson = getLessonForPiece(piece)
            if (lesson.steps.length > 2) {
              nextStep()
              setIsTransitioning(false)
            } else {
              // Pawn - no chase step, complete the lesson
              playFireworksSound()
              markPieceComplete(piece)
              setCelebrationType('fireworks')
              setShowCelebration(true)
              setTimeout(() => {
                setShowCelebration(false)
                onBack()
              }, 3000)
            }
          }, 2000)
        } else {
          // Practice complete
          const lesson = getLessonForPiece(piece)
          if (lesson.steps.length === 1) {
            // Only practice step (e.g., pawn) - complete the lesson
            playFireworksSound()
            markPieceComplete(piece)
            setCelebrationType('fireworks')
            setShowCelebration(true)
            setTimeout(() => {
              setShowCelebration(false)
              onBack()
            }, 3000)
          } else {
            // Show confetti and move to challenge
            playCelebrationSound()
            setCelebrationType('confetti')
            setShowCelebration(true)
            setTimeout(() => {
              setShowCelebration(false)
              nextStep()
              setIsTransitioning(false)
            }, 2000)
          }
        }
      }, 500)
    }
  }

  // Make the AI escape move
  const makeAIMove = (playerPosition: Position) => {
    const enemyPos = enemyPositionRef.current
    if (!enemyPos) return

    const { pieces, boardSize } = useGameStore.getState()
    const enemyPiece = pieces.get(positionToKey(enemyPos))
    if (!enemyPiece) return

    const escapeMove = calculateEscapeMove(
      enemyPiece,
      enemyPos,
      playerPosition,
      pieces,
      boardSize
    )

    if (escapeMove) {
      // Move the enemy piece
      useGameStore.getState().movePiece(enemyPos, escapeMove)
      enemyPositionRef.current = escapeMove
      playMoveSound()
    }
    // If no escape move, enemy is trapped - player wins on next move
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
        pieceName={t(`pieces.${currentPiece}.friendly`)}
        currentStep={currentStepIndex + 1}
        totalSteps={lesson.steps.length}
        themeColor={lesson.themeColor}
        onBack={onBack}
      />

      <div className="lesson-content">
        <LessonPrompt stepType={step.type} pieceName={t(`pieces.${currentPiece}.friendly`)} />

        {step.type === 'practice' && (
          <motion.div
            className="move-counter"
            key={movesMade}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {movesMade} / {step.requiredMoves || 5}
          </motion.div>
        )}

        <div className="lesson-board-container">
          <ChessBoard
            showValidMoves={true}
            onMoveComplete={handleMoveComplete}
            disabled={isAIMoving || isTransitioning}
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
