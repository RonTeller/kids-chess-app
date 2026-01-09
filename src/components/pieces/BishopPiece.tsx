interface PieceProps {
  color: 'white' | 'black'
}

export function BishopPiece({ color }: PieceProps) {
  const fill = color === 'white' ? '#FFFFFF' : '#333333'
  const stroke = color === 'white' ? '#333333' : '#FFFFFF'

  return (
    <svg viewBox="0 0 100 100">
      {/* Base */}
      <ellipse cx="50" cy="85" rx="25" ry="8" fill={fill} stroke={stroke} strokeWidth="3" />

      {/* Body */}
      <path
        d="M 35 80 Q 30 60 35 45 Q 40 30 50 20 Q 60 30 65 45 Q 70 60 65 80 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="3"
      />

      {/* Hat tip */}
      <circle cx="50" cy="15" r="8" fill={fill} stroke={stroke} strokeWidth="3" />

      {/* Slit */}
      <path d="M 45 35 L 55 35" stroke={stroke} strokeWidth="3" strokeLinecap="round" />

      {/* Friendly face */}
      <circle cx="42" cy="55" r="4" fill={stroke} />
      <circle cx="58" cy="55" r="4" fill={stroke} />
      <path d="M 42 68 Q 50 75 58 68" stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}
