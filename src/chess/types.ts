export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king'
export type PieceColor = 'white' | 'black'

export interface Piece {
  type: PieceType
  color: PieceColor
}

export interface Position {
  row: number // 0-7
  col: number // 0-7
}

export interface Move {
  from: Position
  to: Position
}

export interface PiecePlacement {
  piece: Piece
  position: Position
}

export function positionToKey(pos: Position): string {
  return `${pos.row},${pos.col}`
}

export function keyToPosition(key: string): Position {
  const [row, col] = key.split(',').map(Number)
  return { row, col }
}

export function positionsEqual(a: Position, b: Position): boolean {
  return a.row === b.row && a.col === b.col
}
