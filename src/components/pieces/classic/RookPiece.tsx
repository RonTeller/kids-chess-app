interface PieceProps {
  color: 'white' | 'black'
}

export function RookPiece({ color }: PieceProps) {
  if (color === 'white') {
    return (
      <svg viewBox="0 0 45 45">
        <g fill="#fff" fillRule="evenodd" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
          <path strokeLinecap="butt" d="M9 39h27v-3H9v3zm3-3v-4h21v4H12zm-1-22V9h4v2h5V9h5v2h5V9h4v5" />
          <path d="m34 14-3 3H14l-3-3" />
          <path strokeLinecap="butt" strokeLinejoin="miter" d="M31 17v12.5H14V17" />
          <path d="m31 29.5 1.5 2.5h-20l1.5-2.5" />
          <path fill="none" strokeLinejoin="miter" d="M11 14h23" />
        </g>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 45 45">
      <g fillRule="evenodd" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path strokeLinecap="butt" d="M9 39h27v-3H9v3zm3.5-7 1.5-2.5h17l1.5 2.5h-20zm-.5 4v-4h21v4H12z" />
        <path strokeLinecap="butt" strokeLinejoin="miter" d="M14 29.5v-13h17v13H14z" />
        <path strokeLinecap="butt" d="M14 16.5 11 14h23l-3 2.5H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z" />
        <path fill="none" stroke="#ececec" strokeLinejoin="miter" strokeWidth="1" d="M12 35.5h21m-20-4h19m-18-2h17m-17-13h17M11 14h23" />
      </g>
    </svg>
  )
}
