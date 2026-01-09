import { motion } from 'framer-motion'
import type { Piece } from '../../chess/types'
import {
  RookPiece,
  BishopPiece,
  KnightPiece,
  QueenPiece,
  KingPiece,
  PawnPiece
} from '../pieces'

interface ChessPieceProps {
  piece: Piece
  isSelected: boolean
}

const pieceComponents = {
  rook: RookPiece,
  bishop: BishopPiece,
  knight: KnightPiece,
  queen: QueenPiece,
  king: KingPiece,
  pawn: PawnPiece
}

export function ChessPiece({ piece, isSelected }: ChessPieceProps) {
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
