import type { PieceType, PiecePlacement, Position } from '../chess/types'

export type LessonStepType = 'practice' | 'challenge' | 'chase'

export interface LessonStep {
  id: string
  type: LessonStepType
  boardSize: 8
  pieces: PiecePlacement[]
  targets?: Position[]
  showValidMoves: boolean
  requiredMoves?: number
  enemyPiece?: PiecePlacement  // For chase mode - the piece to catch
}

export interface PieceLesson {
  pieceType: PieceType
  displayName: string
  friendlyName: string
  themeColor: string
  steps: LessonStep[]
}

// Rook lessons
const rookLessons: PieceLesson = {
  pieceType: 'rook',
  displayName: 'Rook',
  friendlyName: 'Rocky the Rook',
  themeColor: '#4A90D9',
  steps: [
    {
      id: 'rook-practice',
      type: 'practice',
      boardSize: 8,
      pieces: [{ piece: { type: 'rook', color: 'white' }, position: { row: 4, col: 4 } }],
      showValidMoves: true,
      requiredMoves: 10
    },
    {
      id: 'rook-challenge',
      type: 'challenge',
      boardSize: 8,
      pieces: [{ piece: { type: 'rook', color: 'white' }, position: { row: 4, col: 4 } }],
      targets: [{ row: 0, col: 4 }, { row: 4, col: 0 }, { row: 7, col: 4 }],
      showValidMoves: true
    },
    {
      id: 'rook-chase',
      type: 'chase',
      boardSize: 8,
      pieces: [{ piece: { type: 'rook', color: 'white' }, position: { row: 4, col: 4 } }],
      enemyPiece: { piece: { type: 'knight', color: 'black' }, position: { row: 1, col: 1 } },
      showValidMoves: true
    }
  ]
}

// Bishop lessons
const bishopLessons: PieceLesson = {
  pieceType: 'bishop',
  displayName: 'Bishop',
  friendlyName: 'Bella the Bishop',
  themeColor: '#9B59B6',
  steps: [
    {
      id: 'bishop-practice',
      type: 'practice',
      boardSize: 8,
      pieces: [{ piece: { type: 'bishop', color: 'white' }, position: { row: 4, col: 4 } }],
      showValidMoves: true,
      requiredMoves: 10
    },
    {
      id: 'bishop-challenge',
      type: 'challenge',
      boardSize: 8,
      pieces: [{ piece: { type: 'bishop', color: 'white' }, position: { row: 4, col: 4 } }],
      targets: [{ row: 0, col: 0 }, { row: 7, col: 7 }, { row: 1, col: 7 }],
      showValidMoves: true
    },
    {
      id: 'bishop-chase',
      type: 'chase',
      boardSize: 8,
      pieces: [{ piece: { type: 'bishop', color: 'white' }, position: { row: 4, col: 4 } }],
      enemyPiece: { piece: { type: 'knight', color: 'black' }, position: { row: 1, col: 2 } },
      showValidMoves: true
    }
  ]
}

// Queen lessons
const queenLessons: PieceLesson = {
  pieceType: 'queen',
  displayName: 'Queen',
  friendlyName: 'Queen Queenie',
  themeColor: '#E91E63',
  steps: [
    {
      id: 'queen-practice',
      type: 'practice',
      boardSize: 8,
      pieces: [{ piece: { type: 'queen', color: 'white' }, position: { row: 4, col: 4 } }],
      showValidMoves: true,
      requiredMoves: 10
    },
    {
      id: 'queen-challenge',
      type: 'challenge',
      boardSize: 8,
      pieces: [{ piece: { type: 'queen', color: 'white' }, position: { row: 4, col: 4 } }],
      targets: [{ row: 0, col: 0 }, { row: 0, col: 7 }, { row: 7, col: 4 }],
      showValidMoves: true
    },
    {
      id: 'queen-chase',
      type: 'chase',
      boardSize: 8,
      pieces: [{ piece: { type: 'queen', color: 'white' }, position: { row: 4, col: 4 } }],
      enemyPiece: { piece: { type: 'knight', color: 'black' }, position: { row: 1, col: 1 } },
      showValidMoves: true
    }
  ]
}

// King lessons
const kingLessons: PieceLesson = {
  pieceType: 'king',
  displayName: 'King',
  friendlyName: 'King Kenny',
  themeColor: '#F39C12',
  steps: [
    {
      id: 'king-practice',
      type: 'practice',
      boardSize: 8,
      pieces: [{ piece: { type: 'king', color: 'white' }, position: { row: 4, col: 4 } }],
      showValidMoves: true,
      requiredMoves: 10
    },
    {
      id: 'king-challenge',
      type: 'challenge',
      boardSize: 8,
      pieces: [{ piece: { type: 'king', color: 'white' }, position: { row: 4, col: 4 } }],
      targets: [{ row: 3, col: 3 }, { row: 5, col: 5 }, { row: 3, col: 5 }],
      showValidMoves: true
    },
    {
      id: 'king-chase',
      type: 'chase',
      boardSize: 8,
      pieces: [{ piece: { type: 'king', color: 'white' }, position: { row: 4, col: 4 } }],
      enemyPiece: { piece: { type: 'knight', color: 'black' }, position: { row: 1, col: 1 } },
      showValidMoves: true
    }
  ]
}

// Knight lessons
const knightLessons: PieceLesson = {
  pieceType: 'knight',
  displayName: 'Knight',
  friendlyName: 'Nelly the Knight',
  themeColor: '#27AE60',
  steps: [
    {
      id: 'knight-practice',
      type: 'practice',
      boardSize: 8,
      pieces: [{ piece: { type: 'knight', color: 'white' }, position: { row: 4, col: 4 } }],
      showValidMoves: true,
      requiredMoves: 10
    },
    {
      id: 'knight-challenge',
      type: 'challenge',
      boardSize: 8,
      pieces: [{ piece: { type: 'knight', color: 'white' }, position: { row: 4, col: 4 } }],
      targets: [{ row: 2, col: 3 }, { row: 6, col: 5 }, { row: 3, col: 6 }],
      showValidMoves: true
    },
    {
      id: 'knight-chase',
      type: 'chase',
      boardSize: 8,
      pieces: [{ piece: { type: 'knight', color: 'white' }, position: { row: 4, col: 4 } }],
      enemyPiece: { piece: { type: 'knight', color: 'black' }, position: { row: 1, col: 1 } },
      showValidMoves: true
    }
  ]
}

// Pawn lessons
const pawnLessons: PieceLesson = {
  pieceType: 'pawn',
  displayName: 'Pawn',
  friendlyName: 'Penny the Pawn',
  themeColor: '#3498DB',
  steps: [
    {
      id: 'pawn-practice',
      type: 'practice',
      boardSize: 8,
      pieces: [{ piece: { type: 'pawn', color: 'white' }, position: { row: 6, col: 4 } }],
      showValidMoves: true,
      requiredMoves: 10
    },
    {
      id: 'pawn-challenge',
      type: 'challenge',
      boardSize: 8,
      pieces: [{ piece: { type: 'pawn', color: 'white' }, position: { row: 6, col: 4 } }],
      targets: [{ row: 5, col: 4 }, { row: 4, col: 4 }, { row: 3, col: 4 }],
      showValidMoves: true
    }
  ]
}

const allLessons: Record<PieceType, PieceLesson> = {
  rook: rookLessons,
  bishop: bishopLessons,
  queen: queenLessons,
  king: kingLessons,
  knight: knightLessons,
  pawn: pawnLessons
}

export function getLessonForPiece(pieceType: PieceType): PieceLesson {
  return allLessons[pieceType]
}

export function getAllLessons(): PieceLesson[] {
  return [
    rookLessons,
    bishopLessons,
    queenLessons,
    kingLessons,
    knightLessons,
    pawnLessons
  ]
}
