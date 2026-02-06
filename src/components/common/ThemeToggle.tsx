import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { usePreferencesStore } from '../../stores/preferencesStore'
import './ThemeToggle.css'

export function ThemeToggle() {
  const { t } = useTranslation()
  const pieceTheme = usePreferencesStore((s) => s.pieceTheme)
  const togglePieceTheme = usePreferencesStore((s) => s.togglePieceTheme)

  return (
    <motion.button
      className="theme-toggle"
      onClick={togglePieceTheme}
      whileTap={{ scale: 0.95 }}
      title={t('theme.toggle')}
    >
      {pieceTheme === 'standard' ? (
        <svg viewBox="0 0 100 100" width="24" height="24">
          {/* Classic pawn silhouette */}
          <circle cx="50" cy="30" r="14" fill="white" />
          <ellipse cx="50" cy="48" rx="12" ry="3" fill="white" />
          <path d="M 36 48 Q 34 58 40 68 L 60 68 Q 66 58 64 48" fill="white" />
          <ellipse cx="50" cy="72" rx="16" ry="4" fill="white" />
          <path d="M 24 90 Q 22 78 28 72 L 72 72 Q 78 78 76 90 Z" fill="white" />
        </svg>
      ) : (
        <svg viewBox="0 0 100 100" width="24" height="24">
          {/* Standard pawn silhouette */}
          <circle cx="50" cy="28" r="16" fill="white" />
          <ellipse cx="50" cy="45" rx="14" ry="4" fill="white" />
          <path d="M 35 45 Q 32 55 38 68 L 62 68 Q 68 55 65 45" fill="white" />
          <ellipse cx="50" cy="68" rx="18" ry="5" fill="white" />
          <ellipse cx="50" cy="88" rx="28" ry="7" fill="white" />
        </svg>
      )}
    </motion.button>
  )
}
