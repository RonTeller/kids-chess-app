interface PieceProps {
  color: 'white' | 'black'
}

export function QueenPiece({ color }: PieceProps) {
  const fill = color === 'white' ? '#FFFFFF' : '#333333'
  const stroke = color === 'white' ? '#333333' : '#FFFFFF'

  return (
    <svg viewBox="0 0 100 100">
      {/* Base */}
      <ellipse cx="50" cy="88" rx="28" ry="8" fill={fill} stroke={stroke} strokeWidth="3" />

      {/* Body */}
      <path
        d="M 25 85 Q 22 70 28 55 L 50 35 L 72 55 Q 78 70 75 85 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="3"
      />

      {/* Crown points */}
      <circle cx="25" cy="25" r="6" fill={fill} stroke={stroke} strokeWidth="3" />
      <circle cx="50" cy="15" r="7" fill={fill} stroke={stroke} strokeWidth="3" />
      <circle cx="75" cy="25" r="6" fill={fill} stroke={stroke} strokeWidth="3" />

      {/* Crown connectors */}
      <path
        d="M 25 30 L 28 55 M 50 22 L 50 35 M 75 30 L 72 55"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Friendly face */}
      <circle cx="40" cy="60" r="4" fill={stroke} />
      <circle cx="60" cy="60" r="4" fill={stroke} />
      <path d="M 40 72 Q 50 80 60 72" stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Crown jewels */}
      <circle cx="50" cy="15" r="3" fill="#E91E63" />
    </svg>
  )
}
