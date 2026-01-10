import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { LessonStepType } from '../../lessons/lessonData'

interface LessonPromptProps {
  stepType: LessonStepType
  pieceName: string
}

export function LessonPrompt({ stepType }: LessonPromptProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      className="lesson-prompt"
      key={stepType}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
    >
      <span className="lesson-prompt-text">{t(`prompts.${stepType}`)}</span>
    </motion.div>
  )
}
