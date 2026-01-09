import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PieceType } from '../chess/types'
import { getLessonForPiece, type LessonStep } from '../lessons/lessonData'

interface LessonState {
  currentPiece: PieceType
  currentStepIndex: number
  completedPieces: PieceType[]
  movesMade: number

  // Actions
  setCurrentPiece: (piece: PieceType) => void
  nextStep: () => boolean // Returns true if there's a next step
  previousStep: () => void
  resetLesson: () => void
  incrementMoves: () => void
  markPieceComplete: (piece: PieceType) => void

  // Computed
  getCurrentStep: () => LessonStep
  getTotalSteps: () => number
  isLastStep: () => boolean
  isPieceCompleted: (piece: PieceType) => boolean
}

export const useLessonStore = create<LessonState>()(
  persist(
    (set, get) => ({
      currentPiece: 'rook',
      currentStepIndex: 0,
      completedPieces: [],
      movesMade: 0,

      setCurrentPiece: (piece) => {
        set({ currentPiece: piece, currentStepIndex: 0, movesMade: 0 })
      },

      nextStep: () => {
        const { currentPiece, currentStepIndex } = get()
        const lesson = getLessonForPiece(currentPiece)
        if (currentStepIndex < lesson.steps.length - 1) {
          set({ currentStepIndex: currentStepIndex + 1, movesMade: 0 })
          return true
        }
        return false
      },

      previousStep: () => {
        const { currentStepIndex } = get()
        if (currentStepIndex > 0) {
          set({ currentStepIndex: currentStepIndex - 1, movesMade: 0 })
        }
      },

      resetLesson: () => {
        set({ currentStepIndex: 0, movesMade: 0 })
      },

      incrementMoves: () => {
        set({ movesMade: get().movesMade + 1 })
      },

      markPieceComplete: (piece) => {
        const { completedPieces } = get()
        if (!completedPieces.includes(piece)) {
          set({ completedPieces: [...completedPieces, piece] })
        }
      },

      getCurrentStep: () => {
        const { currentPiece, currentStepIndex } = get()
        const lesson = getLessonForPiece(currentPiece)
        return lesson.steps[currentStepIndex]
      },

      getTotalSteps: () => {
        const { currentPiece } = get()
        const lesson = getLessonForPiece(currentPiece)
        return lesson.steps.length
      },

      isLastStep: () => {
        const { currentStepIndex, currentPiece } = get()
        const lesson = getLessonForPiece(currentPiece)
        return currentStepIndex === lesson.steps.length - 1
      },

      isPieceCompleted: (piece) => {
        return get().completedPieces.includes(piece)
      }
    }),
    {
      name: 'kids-chess-progress',
      partialize: (state) => ({ completedPieces: state.completedPieces })
    }
  )
)
