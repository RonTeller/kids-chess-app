import { create } from 'zustand'
import type { Piece, Position, PiecePlacement } from '../chess/types'
import { positionToKey, positionsEqual } from '../chess/types'
import { getValidMoves } from '../chess/moveValidation'

interface GameState {
  boardSize: number
  pieces: Map<string, Piece>
  selectedPosition: Position | null
  validMoves: Position[]
  targets: Position[]

  // Actions
  setupBoard: (config: { boardSize: number; pieces: PiecePlacement[]; targets?: Position[] }) => void
  selectSquare: (position: Position) => void
  clearSelection: () => void
  movePiece: (from: Position, to: Position) => void
  removeTarget: (position: Position) => void

  // Computed helpers
  getPieceAt: (position: Position) => Piece | undefined
  isValidMove: (position: Position) => boolean
  isTarget: (position: Position) => boolean
}

export const useGameStore = create<GameState>((set, get) => ({
  boardSize: 8,
  pieces: new Map(),
  selectedPosition: null,
  validMoves: [],
  targets: [],

  setupBoard: ({ boardSize, pieces, targets }) => {
    const pieceMap = new Map<string, Piece>()
    for (const placement of pieces) {
      pieceMap.set(positionToKey(placement.position), placement.piece)
    }
    set({
      boardSize,
      pieces: pieceMap,
      targets: targets || [],
      selectedPosition: null,
      validMoves: []
    })
  },

  selectSquare: (position) => {
    const { pieces, boardSize, selectedPosition, validMoves } = get()
    const piece = pieces.get(positionToKey(position))

    // If clicking a valid move, move the piece
    if (selectedPosition && validMoves.some(m => positionsEqual(m, position))) {
      get().movePiece(selectedPosition, position)
      return
    }

    // If clicking a piece, select it
    if (piece) {
      const moves = getValidMoves(piece, position, pieces, boardSize)
      set({ selectedPosition: position, validMoves: moves })
    } else {
      // Clicking empty square - clear selection
      set({ selectedPosition: null, validMoves: [] })
    }
  },

  clearSelection: () => {
    set({ selectedPosition: null, validMoves: [] })
  },

  movePiece: (from, to) => {
    const pieces = new Map(get().pieces)
    const piece = pieces.get(positionToKey(from))
    if (!piece) return

    pieces.delete(positionToKey(from))
    pieces.delete(positionToKey(to)) // Remove any captured piece
    pieces.set(positionToKey(to), piece)

    // Check if we captured a target
    const { targets } = get()
    const newTargets = targets.filter(t => !positionsEqual(t, to))

    set({
      pieces,
      targets: newTargets,
      selectedPosition: null,
      validMoves: []
    })
  },

  removeTarget: (position) => {
    const { targets } = get()
    set({ targets: targets.filter(t => !positionsEqual(t, position)) })
  },

  getPieceAt: (position) => {
    return get().pieces.get(positionToKey(position))
  },

  isValidMove: (position) => {
    return get().validMoves.some(m => positionsEqual(m, position))
  },

  isTarget: (position) => {
    return get().targets.some(t => positionsEqual(t, position))
  }
}))
