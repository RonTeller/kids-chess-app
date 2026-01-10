import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import he from './locales/he.json'

const LANGUAGE_KEY = 'kids-chess-language'

// Get saved language or default to English
const savedLanguage = localStorage.getItem(LANGUAGE_KEY) || 'en'

// Set initial document direction
document.documentElement.dir = savedLanguage === 'he' ? 'rtl' : 'ltr'
document.documentElement.lang = savedLanguage

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      he: { translation: he }
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

// Helper to change language and update document direction
export function setLanguage(lang: 'en' | 'he') {
  i18n.changeLanguage(lang)
  localStorage.setItem(LANGUAGE_KEY, lang)
  document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
  document.documentElement.lang = lang
}

export function getCurrentLanguage(): 'en' | 'he' {
  return i18n.language as 'en' | 'he'
}

export default i18n
