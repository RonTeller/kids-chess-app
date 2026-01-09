interface PieceProps {
  color: 'white' | 'black'
}

export function RookPiece({ color }: PieceProps) {
  const fill = color === 'white' ? '#FFFFFF' : '#333333'
  const stroke = color === 'white' ? '#333333' : '#FFFFFF'

  return (
    <svg viewBox="0 0 100 100">
      {/* Base */}
      <rect x="20" y="70" width="60" height="20" rx="5" fill={fill} stroke={stroke} strokeWidth="3" />

      {/* Body */}
      <rect x="25" y="40" width="50" height="35" rx="5" fill={fill} stroke={stroke} strokeWidth="3" />

      {/* Battlements */}
      <rect x="20" y="20" width="15" height="25" rx="3" fill={fill} stroke={stroke} strokeWidth="3" />
      <rect x="42" y="20" width="16" height="25" rx="3" fill={fill} stroke={stroke} strokeWidth="3" />
      <rect x="65" y="20" width="15" height="25" rx="3" fill={fill} stroke={stroke} strokeWidth="3" />

      {/* Friendly face */}
      <circle cx="40" cy="55" r="4" fill={stroke} />
      <circle cx="60" cy="55" r="4" fill={stroke} />
      <path d="M 40 65 Q 50 72 60 65" stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}
