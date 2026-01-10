import { useState } from 'react'
import { motion } from 'framer-motion'
import { getCurrentLanguage, setLanguage } from '../../i18n'
import './LanguageToggle.css'

export function LanguageToggle() {
  const [lang, setLang] = useState(getCurrentLanguage())

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'he' : 'en'
    setLanguage(newLang)
    setLang(newLang)
  }

  return (
    <motion.button
      className="language-toggle"
      onClick={toggleLanguage}
      whileTap={{ scale: 0.95 }}
      title={lang === 'en' ? 'Switch to Hebrew' : 'החלף לאנגלית'}
    >
      {lang === 'en' ? 'עב' : 'EN'}
    </motion.button>
  )
}
