interface PieceProps {
  color: 'white' | 'black'
}

export function KingPiece({ color }: PieceProps) {
  const fill = color === 'white' ? '#FFFFFF' : '#333333'
  const stroke = color === 'white' ? '#333333' : '#FFFFFF'

  return (
    <svg viewBox="0 0 100 100">
      {/* Base */}
      <ellipse cx="50" cy="88" rx="28" ry="7" fill={fill} stroke={stroke} strokeWidth="2.5" />

      {/* Lower collar */}
      <ellipse cx="50" cy="78" rx="22" ry="5" fill={fill} stroke={stroke} strokeWidth="2.5" />

      {/* Body */}
      <path
        d="M 30 78 Q 22 60 30 45 Q 38 32 50 28 Q 62 32 70 45 Q 78 60 70 78 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
      />

      {/* Crown band */}
      <ellipse cx="50" cy="32" rx="18" ry="6" fill={fill} stroke={stroke} strokeWidth="2.5" />

      {/* Cross - vertical */}
      <rect x="46" y="5" width="8" height="30" rx="2" fill={fill} stroke={stroke} strokeWidth="2.5" />

      {/* Cross - horizontal */}
      <rect x="36" y="12" width="28" height="8" rx="2" fill={fill} stroke={stroke} strokeWidth="2.5" />
    </svg>
  )
}
