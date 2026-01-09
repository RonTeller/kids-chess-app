interface PieceProps {
  color: 'white' | 'black'
}

export function PawnPiece({ color }: PieceProps) {
  const fill = color === 'white' ? '#FFFFFF' : '#333333'
  const stroke = color === 'white' ? '#333333' : '#FFFFFF'

  return (
    <svg viewBox="0 0 100 100">
      {/* Base */}
      <ellipse cx="50" cy="88" rx="25" ry="8" fill={fill} stroke={stroke} strokeWidth="3" />

      {/* Body */}
      <path
        d="M 30 85 Q 28 70 35 55 Q 40 45 50 42 Q 60 45 65 55 Q 72 70 70 85 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="3"
      />

      {/* Head */}
      <circle cx="50" cy="28" r="18" fill={fill} stroke={stroke} strokeWidth="3" />

      {/* Friendly face */}
      <circle cx="44" cy="26" r="3" fill={stroke} />
      <circle cx="56" cy="26" r="3" fill={stroke} />
      <path d="M 44 35 Q 50 40 56 35" stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}
