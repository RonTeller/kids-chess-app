interface PieceProps {
  color: 'white' | 'black'
}

export function BishopPiece({ color }: PieceProps) {
  const fill = color === 'white' ? '#FFFFFF' : '#333333'
  const stroke = color === 'white' ? '#333333' : '#FFFFFF'

  return (
    <svg viewBox="0 0 100 100">
      {/* Base */}
      <ellipse cx="50" cy="88" rx="28" ry="7" fill={fill} stroke={stroke} strokeWidth="2.5" />

      {/* Lower collar */}
      <ellipse cx="50" cy="78" rx="20" ry="5" fill={fill} stroke={stroke} strokeWidth="2.5" />

      {/* Body */}
      <path
        d="M 32 78 Q 28 60 35 45 L 50 25 L 65 45 Q 72 60 68 78 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
      />

      {/* Head/Mitre */}
      <path
        d="M 42 28 Q 42 18 50 10 Q 58 18 58 28 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
      />

      {/* Ball on top */}
      <circle cx="50" cy="10" r="5" fill={fill} stroke={stroke} strokeWidth="2.5" />

      {/* Diagonal slit */}
      <path d="M 44 32 L 56 45" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
