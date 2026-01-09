import type { Piece, Position, PieceType } from './types'
import { positionToKey } from './types'

type Board = Map<string, Piece>

function isOnBoard(pos: Position, boardSize: number): boolean {
  return pos.row >= 0 && pos.row < boardSize && pos.col >= 0 && pos.col < boardSize
}

function isBlocked(pos: Position, board: Board): boolean {
  return board.has(positionToKey(pos))
}

function getStraightMoves(position: Position, board: Board, boardSize: number): Position[] {
  const moves: Position[] = []
  const directions = [
    { row: -1, col: 0 },  // up
    { row: 1, col: 0 },   // down
    { row: 0, col: -1 },  // left
    { row: 0, col: 1 },   // right
  ]

  for (const dir of directions) {
    let current = { row: position.row + dir.row, col: position.col + dir.col }
    while (isOnBoard(current, boardSize)) {
      if (isBlocked(current, board)) {
        moves.push(current) // Can capture
        break
      }
      moves.push(current)
      current = { row: current.row + dir.row, col: current.col + dir.col }
    }
  }

  return moves
}

function getDiagonalMoves(position: Position, board: Board, boardSize: number): Position[] {
  const moves: Position[] = []
  const directions = [
    { row: -1, col: -1 },  // up-left
    { row: -1, col: 1 },   // up-right
    { row: 1, col: -1 },   // down-left
    { row: 1, col: 1 },    // down-right
  ]

  for (const dir of directions) {
    let current = { row: position.row + dir.row, col: position.col + dir.col }
    while (isOnBoard(current, boardSize)) {
      if (isBlocked(current, board)) {
        moves.push(current) // Can capture
        break
      }
      moves.push(current)
      current = { row: current.row + dir.row, col: current.col + dir.col }
    }
  }

  return moves
}

function getRookMoves(position: Position, board: Board, boardSize: number): Position[] {
  return getStraightMoves(position, board, boardSize)
}

function getBishopMoves(position: Position, board: Board, boardSize: number): Position[] {
  return getDiagonalMoves(position, board, boardSize)
}

function getQueenMoves(position: Position, board: Board, boardSize: number): Position[] {
  return [
    ...getStraightMoves(position, board, boardSize),
    ...getDiagonalMoves(position, board, boardSize)
  ]
}

function getKingMoves(position: Position, board: Board, boardSize: number): Position[] {
  const moves: Position[] = []
  const directions = [
    { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
    { row: 0, col: -1 },                        { row: 0, col: 1 },
    { row: 1, col: -1 },  { row: 1, col: 0 },  { row: 1, col: 1 },
  ]

  for (const dir of directions) {
    const newPos = { row: position.row + dir.row, col: position.col + dir.col }
    if (isOnBoard(newPos, boardSize)) {
      moves.push(newPos)
    }
  }

  return moves
}

function getKnightMoves(position: Position, board: Board, boardSize: number): Position[] {
  const moves: Position[] = []
  const offsets = [
    { row: -2, col: -1 }, { row: -2, col: 1 },
    { row: -1, col: -2 }, { row: -1, col: 2 },
    { row: 1, col: -2 },  { row: 1, col: 2 },
    { row: 2, col: -1 },  { row: 2, col: 1 },
  ]

  for (const offset of offsets) {
    const newPos = { row: position.row + offset.row, col: position.col + offset.col }
    if (isOnBoard(newPos, boardSize)) {
      moves.push(newPos)
    }
  }

  return moves
}

function getPawnMoves(position: Position, color: 'white' | 'black', board: Board, boardSize: number): Position[] {
  const moves: Position[] = []
  const direction = color === 'white' ? -1 : 1 // White moves up (negative row), black moves down

  // Forward move
  const forward = { row: position.row + direction, col: position.col }
  if (isOnBoard(forward, boardSize) && !isBlocked(forward, board)) {
    moves.push(forward)
  }

  // Capture diagonals
  const captureLeft = { row: position.row + direction, col: position.col - 1 }
  const captureRight = { row: position.row + direction, col: position.col + 1 }

  if (isOnBoard(captureLeft, boardSize) && isBlocked(captureLeft, board)) {
    moves.push(captureLeft)
  }
  if (isOnBoard(captureRight, boardSize) && isBlocked(captureRight, board)) {
    moves.push(captureRight)
  }

  return moves
}

export function getValidMoves(
  piece: Piece,
  position: Position,
  board: Board,
  boardSize: number = 8
): Position[] {
  switch (piece.type) {
    case 'rook':
      return getRookMoves(position, board, boardSize)
    case 'bishop':
      return getBishopMoves(position, board, boardSize)
    case 'queen':
      return getQueenMoves(position, board, boardSize)
    case 'king':
      return getKingMoves(position, board, boardSize)
    case 'knight':
      return getKnightMoves(position, board, boardSize)
    case 'pawn':
      return getPawnMoves(position, piece.color, board, boardSize)
    default:
      return []
  }
}

export function isValidMove(
  piece: Piece,
  from: Position,
  to: Position,
  board: Board,
  boardSize: number = 8
): boolean {
  const validMoves = getValidMoves(piece, from, board, boardSize)
  return validMoves.some(m => m.row === to.row && m.col === to.col)
}
