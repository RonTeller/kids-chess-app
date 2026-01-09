import { motion } from 'framer-motion'
import { Square } from './Square'
import { useGameStore } from '../../stores/gameStore'
import type { Position } from '../../chess/types'
import './ChessBoard.css'

interface ChessBoardProps {
  showValidMoves?: boolean
  onMoveComplete?: (from: Position, to: Position, hitTarget: boolean) => void
}

export function ChessBoard({ showValidMoves = true, onMoveComplete }: ChessBoardProps) {
  const {
    boardSize,
    pieces,
    selectedPosition,
    validMoves,
    targets,
    selectSquare,
    getPieceAt,
    isValidMove,
    isTarget
  } = useGameStore()

  const handleSquareClick = (position: Position) => {
    const wasValidMove = selectedPosition && isValidMove(position)
    // Check if target was hit BEFORE selectSquare removes it
    const hitTarget = wasValidMove && isTarget(position)
    selectSquare(position)

    if (wasValidMove && selectedPosition && onMoveComplete) {
      onMoveComplete(selectedPosition, position, hitTarget)
    }
  }

  const rows = Array.from({ length: boardSize }, (_, i) => i)
  const cols = Array.from({ length: boardSize }, (_, i) => i)

  return (
    <motion.div
      className="chess-board"
      style={{
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize}, 1fr)`
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0.4 }}
    >
      {rows.map(row =>
        cols.map(col => {
          const position = { row, col }
          const piece = getPieceAt(position)
          const isLight = (row + col) % 2 === 0
          const isSelected = selectedPosition?.row === row && selectedPosition?.col === col
          const isValid = showValidMoves && isValidMove(position)
          const hasTarget = isTarget(position)

          return (
            <Square
              key={`${row}-${col}`}
              position={position}
              piece={piece}
              isLight={isLight}
              isSelected={isSelected}
              isValidMove={isValid}
              isTarget={hasTarget}
              onClick={() => handleSquareClick(position)}
            />
          )
        })
      )}
    </motion.div>
  )
}
