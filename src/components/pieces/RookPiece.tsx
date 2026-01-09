interface PieceProps {
  color: 'white' | 'black'
}

export function RookPiece({ color }: PieceProps) {
  const fill = color === 'white' ? '#FFFFFF' : '#333333'
  const stroke = color === 'white' ? '#333333' : '#FFFFFF'

  return (
    <svg viewBox="0 0 100 100">
      {/* Base */}
      <rect x="20" y="80" width="60" height="12" rx="2" fill={fill} stroke={stroke} strokeWidth="2.5" />

      {/* Lower body */}
      <rect x="25" y="65" width="50" height="18" fill={fill} stroke={stroke} strokeWidth="2.5" />

      {/* Middle section */}
      <path
        d="M 28 65 L 32 45 L 68 45 L 72 65 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
      />

      {/* Upper body */}
      <rect x="30" y="30" width="40" height="18" fill={fill} stroke={stroke} strokeWidth="2.5" />

      {/* Battlements */}
      <rect x="28" y="15" width="12" height="18" fill={fill} stroke={stroke} strokeWidth="2.5" />
      <rect x="44" y="15" width="12" height="18" fill={fill} stroke={stroke} strokeWidth="2.5" />
      <rect x="60" y="15" width="12" height="18" fill={fill} stroke={stroke} strokeWidth="2.5" />
    </svg>
  )
}
