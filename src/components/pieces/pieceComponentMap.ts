import type { PieceType } from '../../chess/types'
import type { PieceTheme } from '../../stores/preferencesStore'
import * as standard from './index'
import * as classic from './classic/index'

type PieceComponent = React.FC<{ color: 'white' | 'black' }>

const standardPieces: Record<PieceType, PieceComponent> = {
  pawn: standard.PawnPiece,
  rook: standard.RookPiece,
  knight: standard.KnightPiece,
  bishop: standard.BishopPiece,
  queen: standard.QueenPiece,
  king: standard.KingPiece
}

const classicPieces: Record<PieceType, PieceComponent> = {
  pawn: classic.PawnPiece,
  rook: classic.RookPiece,
  knight: classic.KnightPiece,
  bishop: classic.BishopPiece,
  queen: classic.QueenPiece,
  king: classic.KingPiece
}

export function getPieceComponents(theme: PieceTheme): Record<PieceType, PieceComponent> {
  return theme === 'classic' ? classicPieces : standardPieces
}
