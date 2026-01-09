interface PieceProps {
  color: 'white' | 'black'
}

export function QueenPiece({ color }: PieceProps) {
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
        d="M 30 78 Q 25 60 32 45 L 50 38 L 68 45 Q 75 60 70 78 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
      />

      {/* Crown spikes */}
      <path
        d="M 32 45 L 20 20 L 35 35 L 50 12 L 65 35 L 80 20 L 68 45"
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Crown balls */}
      <circle cx="20" cy="18" r="5" fill={fill} stroke={stroke} strokeWidth="2.5" />
      <circle cx="50" cy="10" r="6" fill={fill} stroke={stroke} strokeWidth="2.5" />
      <circle cx="80" cy="18" r="5" fill={fill} stroke={stroke} strokeWidth="2.5" />
    </svg>
  )
}
