import { motion } from 'framer-motion'
import { getAllLessons } from '../../lessons/lessonData'
import { useLessonStore } from '../../stores/lessonStore'
import type { PieceType } from '../../chess/types'
import {
  RookPiece,
  BishopPiece,
  KnightPiece,
  QueenPiece,
  KingPiece,
  PawnPiece
} from '../pieces'
import './HomeScreen.css'

interface HomeScreenProps {
  onSelectPiece: (piece: PieceType) => void
}

const pieceComponents: Record<PieceType, React.FC<{ color: 'white' | 'black' }>> = {
  rook: RookPiece,
  bishop: BishopPiece,
  knight: KnightPiece,
  queen: QueenPiece,
  king: KingPiece,
  pawn: PawnPiece
}

export function HomeScreen({ onSelectPiece }: HomeScreenProps) {
  const lessons = getAllLessons()
  const { isPieceCompleted } = useLessonStore()

  return (
    <motion.div
      className="home-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        className="home-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.4 }}
      >
        Learn Chess!
      </motion.h1>

      <motion.p
        className="home-subtitle"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Tap a piece to learn how it moves
      </motion.p>

      <div className="piece-grid">
        {lessons.map((lesson, index) => {
          const PieceComponent = pieceComponents[lesson.pieceType]
          const isCompleted = isPieceCompleted(lesson.pieceType)

          return (
            <motion.button
              key={lesson.pieceType}
              className={`piece-card ${isCompleted ? 'piece-card--completed' : ''}`}
              style={{
                '--card-color': lesson.themeColor
              } as React.CSSProperties}
              onClick={() => onSelectPiece(lesson.pieceType)}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                bounce: 0.4,
                delay: index * 0.1
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="piece-card-icon">
                <PieceComponent color="white" />
              </div>
              <span className="piece-card-name">{lesson.friendlyName}</span>
              {isCompleted && (
                <motion.div
                  className="piece-card-check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.6 }}
                >
                  <svg viewBox="0 0 24 24" width="32" height="32">
                    <circle cx="12" cy="12" r="11" fill="#2ECC71" />
                    <path
                      d="M9 12l2 2 4-4"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
