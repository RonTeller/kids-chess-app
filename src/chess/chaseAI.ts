// AI logic for the chase phase - makes the enemy piece move randomly
import type { Piece, Position } from './types'
import { positionsEqual } from './types'
import { getValidMoves } from './moveValidation'

type Board = Map<string, Piece>

// Calculate random move for the AI piece
// Returns null if no valid moves exist (piece is trapped)
export function calculateEscapeMove(
  enemyPiece: Piece,
  enemyPosition: Position,
  playerPosition: Position,
  board: Board,
  boardSize: number = 8
): Position | null {
  // Get all valid moves for the enemy piece
  const validMoves = getValidMoves(enemyPiece, enemyPosition, board, boardSize)

  // Filter out moves that would land on the player's square
  const safeMoves = validMoves.filter(move => !positionsEqual(move, playerPosition))

  if (safeMoves.length === 0) {
    return null // No valid moves available
  }

  // Pick a random move
  const randomIndex = Math.floor(Math.random() * safeMoves.length)
  return safeMoves[randomIndex]
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
