interface PieceProps {
  color: 'white' | 'black'
}

export function KnightPiece({ color }: PieceProps) {
  const fill = color === 'white' ? '#FFFFFF' : '#333333'
  const stroke = color === 'white' ? '#333333' : '#FFFFFF'

  return (
    <svg viewBox="0 0 100 100">
      {/* Base */}
      <ellipse cx="50" cy="88" rx="28" ry="8" fill={fill} stroke={stroke} strokeWidth="3" />

      {/* Body/Neck */}
      <path
        d="M 30 85 Q 25 70 30 55 Q 35 40 45 30 L 55 25 Q 70 30 75 45 Q 80 60 75 85 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="3"
      />

      {/* Horse head shape */}
      <path
        d="M 45 30 Q 35 25 30 20 Q 25 18 28 12 Q 35 8 45 15 L 55 25"
        fill={fill}
        stroke={stroke}
        strokeWidth="3"
      />

      {/* Ear */}
      <path d="M 35 12 Q 38 5 45 10" fill={fill} stroke={stroke} strokeWidth="2" />

      {/* Mane */}
      <path d="M 52 25 Q 60 20 55 30 Q 65 28 58 38" stroke={stroke} strokeWidth="2" fill="none" />

      {/* Eye */}
      <circle cx="38" cy="22" r="4" fill={stroke} />

      {/* Nostril */}
      <circle cx="28" cy="18" r="2" fill={stroke} />

      {/* Smile */}
      <path d="M 30 22 Q 33 26 38 24" stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}
