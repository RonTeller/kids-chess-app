import { motion } from 'framer-motion'
import './Celebration.css'

interface CelebrationProps {
  type: 'stars' | 'confetti' | 'fireworks'
}

export function Celebration({ type }: CelebrationProps) {
  const particles = Array.from({ length: type === 'stars' ? 15 : 30 }, (_, i) => i)

  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#9B59B6', '#2ECC71', '#E91E63']

  return (
    <motion.div
      className="celebration-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {particles.map((i) => {
        const color = colors[i % colors.length]
        const startX = Math.random() * 100
        const startY = type === 'confetti' ? -10 : 50
        const endX = startX + (Math.random() - 0.5) * 40
        const endY = type === 'confetti' ? 110 : startY + (Math.random() - 0.5) * 60

        return (
          <motion.div
            key={i}
            className={`particle particle--${type}`}
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
              backgroundColor: type !== 'stars' ? color : undefined
            }}
            initial={{
              opacity: 1,
              scale: 0,
              x: 0,
              y: 0,
              rotate: 0
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: type === 'fireworks' ? [0, 1.5, 0] : [0, 1, 0.5],
              x: `${(endX - startX)}vw`,
              y: `${(endY - startY)}vh`,
              rotate: Math.random() * 720 - 360
            }}
            transition={{
              duration: type === 'confetti' ? 2 : 1.5,
              delay: i * 0.05,
              ease: type === 'confetti' ? 'linear' : 'easeOut'
            }}
          >
            {type === 'stars' && (
              <svg viewBox="0 0 100 100" width="40" height="40">
                <path
                  d="M50 5 L61 39 L97 39 L68 61 L79 95 L50 73 L21 95 L32 61 L3 39 L39 39 Z"
                  fill={color}
                />
              </svg>
            )}
          </motion.div>
        )
      })}

      {type === 'fireworks' && (
        <motion.div
          className="celebration-message"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.3 }}
        >
          <span className="celebration-emoji">🎉</span>
        </motion.div>
      )}
    </motion.div>
  )
}
