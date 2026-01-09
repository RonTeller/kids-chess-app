import { motion } from 'framer-motion'
import { ChessPiece } from './ChessPiece'
import { Target } from './Target'
import type { Piece, Position } from '../../chess/types'

interface SquareProps {
  position: Position
  piece?: Piece
  isLight: boolean
  isSelected: boolean
  isValidMove: boolean
  isTarget: boolean
  onClick: () => void
}

export function Square({
  piece,
  isLight,
  isSelected,
  isValidMove,
  isTarget,
  onClick
}: SquareProps) {
  return (
    <motion.div
      className={`
        square
        ${isLight ? 'square--light' : 'square--dark'}
        ${isSelected ? 'square--selected' : ''}
        ${isValidMove ? 'square--valid-move' : ''}
      `}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isTarget && <Target />}
      {piece && <ChessPiece piece={piece} isSelected={isSelected} />}
      {isValidMove && !piece && (
        <motion.div
          className="valid-move-dot"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
        />
      )}
    </motion.div>
  )
}
