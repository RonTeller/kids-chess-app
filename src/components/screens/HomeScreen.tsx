import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { getAllLessons } from '../../lessons/lessonData'
import type { PieceType } from '../../chess/types'
import {
  RookPiece,
  BishopPiece,
  KnightPiece,
  QueenPiece,
  KingPiece,
  PawnPiece
} from '../pieces'
import { LanguageToggle } from '../common/LanguageToggle'
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
  const { t } = useTranslation()
  const lessons = getAllLessons()

  return (
    <motion.div
      className="home-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LanguageToggle />

      <motion.h1
        className="home-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.4 }}
      >
        {t('home.title')}
      </motion.h1>

      <motion.p
        className="home-subtitle"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {t('home.subtitle')}
      </motion.p>

      <div className="piece-grid">
        {lessons.map((lesson, index) => {
          const PieceComponent = pieceComponents[lesson.pieceType]

          return (
            <motion.button
              key={lesson.pieceType}
              className="piece-card"
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
              <span className="piece-card-name">
                {t(`pieces.${lesson.pieceType}.friendly`)}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
