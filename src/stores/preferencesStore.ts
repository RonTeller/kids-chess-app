import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PieceTheme = 'standard' | 'classic'

interface PreferencesState {
  pieceTheme: PieceTheme
  togglePieceTheme: () => void
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set, get) => ({
      pieceTheme: 'standard',

      togglePieceTheme: () => {
        set({ pieceTheme: get().pieceTheme === 'standard' ? 'classic' : 'standard' })
      }
    }),
    {
      name: 'kids-chess-preferences'
    }
  )
)
