import { motion } from 'framer-motion'
import type { LessonStepType } from '../../lessons/lessonData'

interface LessonPromptProps {
  stepType: LessonStepType
  pieceName: string
}

const prompts: Record<LessonStepType, (name: string) => string> = {
  intro: (name) => `Meet ${name}!`,
  demo: () => `Watch where I can go!`,
  guided: () => `Tap where I can move!`,
  practice: () => `You try! Move me around!`,
  challenge: () => `Catch the stars!`,
  celebration: () => `Great job!`
}

export function LessonPrompt({ stepType, pieceName }: LessonPromptProps) {
  const prompt = prompts[stepType](pieceName)

  return (
    <motion.div
      className="lesson-prompt"
      key={stepType}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
    >
      <span className="lesson-prompt-text">{prompt}</span>
    </motion.div>
  )
}
