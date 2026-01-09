import { motion } from 'framer-motion'

export function Target() {
  return (
    <motion.div
      className="target"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', bounce: 0.6 }}
    >
      <svg viewBox="0 0 100 100" className="target-star">
        <motion.path
          d="M50 5 L61 39 L97 39 L68 61 L79 95 L50 73 L21 95 L32 61 L3 39 L39 39 Z"
          fill="#FFD700"
          stroke="#FFA500"
          strokeWidth="3"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </svg>
    </motion.div>
  )
}
