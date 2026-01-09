interface PieceProps {
  color: 'white' | 'black'
}

export function PawnPiece({ color }: PieceProps) {
  const fill = color === 'white' ? '#FFFFFF' : '#333333'
  const stroke = color === 'white' ? '#333333' : '#FFFFFF'

  return (
    <svg viewBox="0 0 100 100">
      {/* Base */}
      <ellipse cx="50" cy="88" rx="28" ry="7" fill={fill} stroke={stroke} strokeWidth="2.5" />

      {/* Lower body */}
      <path
        d="M 25 88 Q 22 78 28 70 L 72 70 Q 78 78 75 88 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
      />

      {/* Middle collar */}
      <ellipse cx="50" cy="68" rx="18" ry="5" fill={fill} stroke={stroke} strokeWidth="2.5" />

      {/* Neck/stem */}
      <path
        d="M 35 68 Q 32 55 38 45 L 62 45 Q 68 55 65 68 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
      />

      {/* Upper collar */}
      <ellipse cx="50" cy="45" rx="14" ry="4" fill={fill} stroke={stroke} strokeWidth="2.5" />

      {/* Head */}
      <circle cx="50" cy="28" r="16" fill={fill} stroke={stroke} strokeWidth="2.5" />
    </svg>
  )
}
