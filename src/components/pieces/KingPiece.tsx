interface PieceProps {
  color: 'white' | 'black'
}

export function KingPiece({ color }: PieceProps) {
  const fill = color === 'white' ? '#FFFFFF' : '#333333'
  const stroke = color === 'white' ? '#333333' : '#FFFFFF'

  return (
    <svg viewBox="0 0 100 100">
      {/* Base */}
      <ellipse cx="50" cy="88" rx="28" ry="8" fill={fill} stroke={stroke} strokeWidth="3" />

      {/* Body */}
      <path
        d="M 28 85 Q 22 70 28 50 Q 35 35 50 30 Q 65 35 72 50 Q 78 70 72 85 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="3"
      />

      {/* Cross on top */}
      <rect x="46" y="8" width="8" height="25" rx="2" fill={fill} stroke={stroke} strokeWidth="3" />
      <rect x="38" y="12" width="24" height="8" rx="2" fill={fill} stroke={stroke} strokeWidth="3" />

      {/* Friendly face */}
      <circle cx="40" cy="55" r="4" fill={stroke} />
      <circle cx="60" cy="55" r="4" fill={stroke} />
      <path d="M 40 68 Q 50 76 60 68" stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Crown jewel */}
      <circle cx="50" cy="16" r="3" fill="#F39C12" />
    </svg>
  )
}
