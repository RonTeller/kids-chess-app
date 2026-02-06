import { motion } from 'framer-motion'
import type { Piece } from '../../chess/types'
import { usePreferencesStore } from '../../stores/preferencesStore'
import { getPieceComponents } from '../pieces/pieceComponentMap'

interface ChessPieceProps {
  piece: Piece
  isSelected: boolean
}

export function ChessPiece({ piece, isSelected }: ChessPieceProps) {
  const pieceTheme = usePreferencesStore((s) => s.pieceTheme)
  const pieceComponents = getPieceComponents(pieceTheme)
  const PieceComponent = pieceComponents[piece.type]

  return (
    <motion.div
      className="chess-piece"
      initial={{ scale: 0, rotate: -180 }}
      animate={{
        scale: 1,
        rotate: 0,
        y: isSelected ? -5 : 0
      }}
      transition={{ type: 'spring', bounce: 0.5 }}
      whileHover={{ scale: 1.1 }}
    >
      <PieceComponent color={piece.color} />
    </motion.div>
  )
}
