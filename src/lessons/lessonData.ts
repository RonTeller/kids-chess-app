import type { PieceType, PiecePlacement, Position } from '../chess/types'

export type LessonStepType = 'intro' | 'demo' | 'guided' | 'practice' | 'challenge' | 'celebration'

export interface LessonStep {
  id: string
  type: LessonStepType
  boardSize: 4 | 6 | 8
  pieces: PiecePlacement[]
  targets?: Position[]
  showValidMoves: boolean
  demoPath?: Position[]
  requiredMoves?: number
}

export interface PieceLesson {
  pieceType: PieceType
  displayName: string
  friendlyName: string
  themeColor: string
  steps: LessonStep[]
}

// Rook lessons - straight lines, easiest to understand
const rookLessons: PieceLesson = {
  pieceType: 'rook',
  displayName: 'Rook',
  friendlyName: 'Rocky the Rook',
  themeColor: '#4A90D9',
  steps: [
    {
      id: 'rook-intro',
      type: 'intro',
      boardSize: 4,
      pieces: [{ piece: { type: 'rook', color: 'white' }, position: { row: 1, col: 1 } }],
      showValidMoves: false
    },
    {
      id: 'rook-demo',
      type: 'demo',
      boardSize: 4,
      pieces: [{ piece: { type: 'rook', color: 'white' }, position: { row: 1, col: 0 } }],
      showValidMoves: true,
      demoPath: [{ row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }]
    },
    {
      id: 'rook-guided',
      type: 'guided',
      boardSize: 4,
      pieces: [{ piece: { type: 'rook', color: 'white' }, position: { row: 2, col: 2 } }],
      showValidMoves: true
    },
    {
      id: 'rook-practice',
      type: 'practice',
      boardSize: 6,
      pieces: [{ piece: { type: 'rook', color: 'white' }, position: { row: 3, col: 3 } }],
      showValidMoves: false,
      requiredMoves: 3
    },
    {
      id: 'rook-challenge',
      type: 'challenge',
      boardSize: 6,
      pieces: [{ piece: { type: 'rook', color: 'white' }, position: { row: 0, col: 0 } }],
      targets: [{ row: 0, col: 5 }, { row: 5, col: 0 }],
      showValidMoves: false
    },
    {
      id: 'rook-celebration',
      type: 'celebration',
      boardSize: 4,
      pieces: [{ piece: { type: 'rook', color: 'white' }, position: { row: 1, col: 1 } }],
      showValidMoves: false
    }
  ]
}

// Bishop lessons - diagonal lines
const bishopLessons: PieceLesson = {
  pieceType: 'bishop',
  displayName: 'Bishop',
  friendlyName: 'Bella the Bishop',
  themeColor: '#9B59B6',
  steps: [
    {
      id: 'bishop-intro',
      type: 'intro',
      boardSize: 4,
      pieces: [{ piece: { type: 'bishop', color: 'white' }, position: { row: 1, col: 1 } }],
      showValidMoves: false
    },
    {
      id: 'bishop-demo',
      type: 'demo',
      boardSize: 4,
      pieces: [{ piece: { type: 'bishop', color: 'white' }, position: { row: 0, col: 0 } }],
      showValidMoves: true,
      demoPath: [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }, { row: 3, col: 3 }]
    },
    {
      id: 'bishop-guided',
      type: 'guided',
      boardSize: 4,
      pieces: [{ piece: { type: 'bishop', color: 'white' }, position: { row: 2, col: 1 } }],
      showValidMoves: true
    },
    {
      id: 'bishop-practice',
      type: 'practice',
      boardSize: 6,
      pieces: [{ piece: { type: 'bishop', color: 'white' }, position: { row: 3, col: 3 } }],
      showValidMoves: false,
      requiredMoves: 3
    },
    {
      id: 'bishop-challenge',
      type: 'challenge',
      boardSize: 6,
      pieces: [{ piece: { type: 'bishop', color: 'white' }, position: { row: 0, col: 2 } }],
      targets: [{ row: 2, col: 0 }, { row: 2, col: 4 }],
      showValidMoves: false
    },
    {
      id: 'bishop-celebration',
      type: 'celebration',
      boardSize: 4,
      pieces: [{ piece: { type: 'bishop', color: 'white' }, position: { row: 1, col: 1 } }],
      showValidMoves: false
    }
  ]
}

// Queen lessons - combines rook + bishop
const queenLessons: PieceLesson = {
  pieceType: 'queen',
  displayName: 'Queen',
  friendlyName: 'Queen Queenie',
  themeColor: '#E91E63',
  steps: [
    {
      id: 'queen-intro',
      type: 'intro',
      boardSize: 4,
      pieces: [{ piece: { type: 'queen', color: 'white' }, position: { row: 1, col: 1 } }],
      showValidMoves: false
    },
    {
      id: 'queen-demo',
      type: 'demo',
      boardSize: 4,
      pieces: [{ piece: { type: 'queen', color: 'white' }, position: { row: 2, col: 2 } }],
      showValidMoves: true
    },
    {
      id: 'queen-guided',
      type: 'guided',
      boardSize: 4,
      pieces: [{ piece: { type: 'queen', color: 'white' }, position: { row: 2, col: 2 } }],
      showValidMoves: true
    },
    {
      id: 'queen-practice',
      type: 'practice',
      boardSize: 6,
      pieces: [{ piece: { type: 'queen', color: 'white' }, position: { row: 3, col: 3 } }],
      showValidMoves: false,
      requiredMoves: 3
    },
    {
      id: 'queen-challenge',
      type: 'challenge',
      boardSize: 6,
      pieces: [{ piece: { type: 'queen', color: 'white' }, position: { row: 0, col: 0 } }],
      targets: [{ row: 0, col: 5 }, { row: 5, col: 5 }, { row: 3, col: 3 }],
      showValidMoves: false
    },
    {
      id: 'queen-celebration',
      type: 'celebration',
      boardSize: 4,
      pieces: [{ piece: { type: 'queen', color: 'white' }, position: { row: 1, col: 1 } }],
      showValidMoves: false
    }
  ]
}

// King lessons - one square any direction
const kingLessons: PieceLesson = {
  pieceType: 'king',
  displayName: 'King',
  friendlyName: 'King Kenny',
  themeColor: '#F39C12',
  steps: [
    {
      id: 'king-intro',
      type: 'intro',
      boardSize: 4,
      pieces: [{ piece: { type: 'king', color: 'white' }, position: { row: 1, col: 1 } }],
      showValidMoves: false
    },
    {
      id: 'king-demo',
      type: 'demo',
      boardSize: 4,
      pieces: [{ piece: { type: 'king', color: 'white' }, position: { row: 2, col: 2 } }],
      showValidMoves: true
    },
    {
      id: 'king-guided',
      type: 'guided',
      boardSize: 4,
      pieces: [{ piece: { type: 'king', color: 'white' }, position: { row: 2, col: 2 } }],
      showValidMoves: true
    },
    {
      id: 'king-practice',
      type: 'practice',
      boardSize: 6,
      pieces: [{ piece: { type: 'king', color: 'white' }, position: { row: 3, col: 3 } }],
      showValidMoves: false,
      requiredMoves: 3
    },
    {
      id: 'king-challenge',
      type: 'challenge',
      boardSize: 4,
      pieces: [{ piece: { type: 'king', color: 'white' }, position: { row: 0, col: 0 } }],
      targets: [{ row: 1, col: 1 }, { row: 2, col: 2 }, { row: 3, col: 3 }],
      showValidMoves: false
    },
    {
      id: 'king-celebration',
      type: 'celebration',
      boardSize: 4,
      pieces: [{ piece: { type: 'king', color: 'white' }, position: { row: 1, col: 1 } }],
      showValidMoves: false
    }
  ]
}

// Knight lessons - L-shape, hardest
const knightLessons: PieceLesson = {
  pieceType: 'knight',
  displayName: 'Knight',
  friendlyName: 'Nelly the Knight',
  themeColor: '#27AE60',
  steps: [
    {
      id: 'knight-intro',
      type: 'intro',
      boardSize: 6,
      pieces: [{ piece: { type: 'knight', color: 'white' }, position: { row: 2, col: 2 } }],
      showValidMoves: false
    },
    {
      id: 'knight-demo',
      type: 'demo',
      boardSize: 6,
      pieces: [{ piece: { type: 'knight', color: 'white' }, position: { row: 3, col: 3 } }],
      showValidMoves: true
    },
    {
      id: 'knight-guided',
      type: 'guided',
      boardSize: 6,
      pieces: [{ piece: { type: 'knight', color: 'white' }, position: { row: 3, col: 3 } }],
      showValidMoves: true
    },
    {
      id: 'knight-practice',
      type: 'practice',
      boardSize: 6,
      pieces: [{ piece: { type: 'knight', color: 'white' }, position: { row: 3, col: 3 } }],
      showValidMoves: false,
      requiredMoves: 3
    },
    {
      id: 'knight-challenge',
      type: 'challenge',
      boardSize: 6,
      pieces: [{ piece: { type: 'knight', color: 'white' }, position: { row: 0, col: 0 } }],
      targets: [{ row: 2, col: 1 }, { row: 4, col: 2 }],
      showValidMoves: false
    },
    {
      id: 'knight-celebration',
      type: 'celebration',
      boardSize: 6,
      pieces: [{ piece: { type: 'knight', color: 'white' }, position: { row: 2, col: 2 } }],
      showValidMoves: false
    }
  ]
}

// Pawn lessons - special rules
const pawnLessons: PieceLesson = {
  pieceType: 'pawn',
  displayName: 'Pawn',
  friendlyName: 'Penny the Pawn',
  themeColor: '#3498DB',
  steps: [
    {
      id: 'pawn-intro',
      type: 'intro',
      boardSize: 4,
      pieces: [{ piece: { type: 'pawn', color: 'white' }, position: { row: 2, col: 1 } }],
      showValidMoves: false
    },
    {
      id: 'pawn-demo',
      type: 'demo',
      boardSize: 4,
      pieces: [{ piece: { type: 'pawn', color: 'white' }, position: { row: 3, col: 1 } }],
      showValidMoves: true,
      demoPath: [{ row: 3, col: 1 }, { row: 2, col: 1 }, { row: 1, col: 1 }, { row: 0, col: 1 }]
    },
    {
      id: 'pawn-guided',
      type: 'guided',
      boardSize: 4,
      pieces: [{ piece: { type: 'pawn', color: 'white' }, position: { row: 3, col: 2 } }],
      showValidMoves: true
    },
    {
      id: 'pawn-practice',
      type: 'practice',
      boardSize: 6,
      pieces: [{ piece: { type: 'pawn', color: 'white' }, position: { row: 5, col: 3 } }],
      showValidMoves: false,
      requiredMoves: 3
    },
    {
      id: 'pawn-challenge',
      type: 'challenge',
      boardSize: 6,
      pieces: [{ piece: { type: 'pawn', color: 'white' }, position: { row: 5, col: 2 } }],
      targets: [{ row: 4, col: 3 }, { row: 3, col: 2 }],
      showValidMoves: false
    },
    {
      id: 'pawn-celebration',
      type: 'celebration',
      boardSize: 4,
      pieces: [{ piece: { type: 'pawn', color: 'white' }, position: { row: 2, col: 1 } }],
      showValidMoves: false
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
  // Return in recommended learning order
  return [
    rookLessons,
    bishopLessons,
    queenLessons,
    kingLessons,
    knightLessons,
    pawnLessons
  ]
}
