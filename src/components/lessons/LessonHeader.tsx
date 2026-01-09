import { motion } from 'framer-motion'

interface LessonHeaderProps {
  pieceName: string
  currentStep: number
  totalSteps: number
  themeColor: string
  onBack: () => void
}

export function LessonHeader({
  pieceName,
  currentStep,
  totalSteps,
  themeColor,
  onBack
}: LessonHeaderProps) {
  return (
    <header className="lesson-header">
      <motion.button
        className="back-button"
        onClick={onBack}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      </motion.button>

      <div className="lesson-title">
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {pieceName}
        </motion.span>
      </div>

      <div className="progress-dots">
        {Array.from({ length: totalSteps }, (_, i) => (
          <motion.div
            key={i}
            className={`progress-dot ${i < currentStep ? 'progress-dot--complete' : ''} ${i === currentStep - 1 ? 'progress-dot--current' : ''}`}
            style={{
              backgroundColor: i < currentStep ? themeColor : 'rgba(255,255,255,0.3)'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      </div>
    </header>
  )
}
