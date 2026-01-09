// AI logic for the chase phase - makes the enemy piece run away from the player
import type { Piece, Position } from './types'
import { positionsEqual } from './types'
import { getValidMoves } from './moveValidation'

type Board = Map<string, Piece>

// Calculate Euclidean distance between two positions
function getDistance(a: Position, b: Position): number {
  return Math.sqrt(Math.pow(a.row - b.row, 2) + Math.pow(a.col - b.col, 2))
}

// Calculate escape move for the AI piece
// Returns null if no valid escape moves exist (piece is trapped)
export function calculateEscapeMove(
  enemyPiece: Piece,
  enemyPosition: Position,
  playerPosition: Position,
  board: Board,
  boardSize: number = 8
): Position | null {
  // Get all valid moves for the enemy piece
  const validMoves = getValidMoves(enemyPiece, enemyPosition, board, boardSize)

  // Filter out moves that would capture the player's piece (enemy runs away, never attacks)
  const escapeMoves = validMoves.filter(move => !positionsEqual(move, playerPosition))

  if (escapeMoves.length === 0) {
    return null // No escape moves available
  }

  // Calculate distance from player for each possible move
  const movesWithDistance = escapeMoves.map(move => ({
    move,
    distance: getDistance(move, playerPosition)
  }))

  // Sort by distance (furthest first)
  movesWithDistance.sort((a, b) => b.distance - a.distance)

  // 70% chance: pick the best escape move (furthest from player)
  // 30% chance: pick a random move (makes the AI catchable)
  const useOptimalMove = Math.random() < 0.7

  if (useOptimalMove) {
    return movesWithDistance[0].move
  } else {
    // Pick a random move from all escape moves
    const randomIndex = Math.floor(Math.random() * escapeMoves.length)
    return escapeMoves[randomIndex]
  }
}

// Check if the player can catch the enemy in the current position
export function canPlayerCatch(
  playerPiece: Piece,
  playerPosition: Position,
  enemyPosition: Position,
  board: Board,
  boardSize: number = 8
): boolean {
  const playerMoves = getValidMoves(playerPiece, playerPosition, board, boardSize)
  return playerMoves.some(move => positionsEqual(move, enemyPosition))
}
