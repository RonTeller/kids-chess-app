# Kids Chess Learning App

## Overview
An educational app for young children (ages 4-6) to learn how each chess piece moves. Built as a web app with an Electron wrapper for desktop.

## Tech Stack
- **React 18** + **TypeScript** — UI
- **Vite** — Build tool (dev server on port 3000)
- **Zustand** — State management (gameStore for board state, lessonStore for progress)
- **Framer Motion** — Animations and transitions
- **i18next / react-i18next** — Internationalization (English + Hebrew with RTL)
- **Electron** — Desktop app wrapper
- **Web Audio API** — Sound effects (no audio files, synthesized)

## Project Structure
```
src/
  chess/          — Game logic: types, move validation, chase AI
  components/
    board/        — ChessBoard, Square, ChessPiece, Target
    pieces/       — SVG definitions for 6 piece types, with standard (kid-friendly) and classic (Staunton) themes
    lessons/      — LessonScreen, LessonHeader, LessonPrompt
    screens/      — HomeScreen (piece selector)
    feedback/     — Celebration component (stars/confetti/fireworks)
    common/       — LanguageToggle, ThemeToggle
  stores/         — Zustand stores (gameStore, lessonStore, preferencesStore)
  lessons/        — Lesson definitions and progression data
  i18n/           — i18next config + locale files (en.json, he.json)
  audio/          — Sound synthesis (pop, chime, arpeggio, fireworks)
  styles/         — Global CSS with CSS custom properties
```

## Design Principles
- **Target audience: 4-6 year olds** — Large touch targets (60px+), soft pastel colors, friendly characters, visual cues over text
- **Positive reinforcement** — Celebratory animations and gentle sounds on success
- **Simple progression** — One piece at a time, three phases per lesson
- **Lightweight chess logic** — Custom move validation (not chess.js), no complex AI

## Game Structure

### Piece Characters
Each piece has a friendly personified name:
- Rocky the Rook, Bella the Bishop, Queenie the Queen
- Kevin the King, Nelly the Knight, Paulie the Pawn

### Learning Phases (per piece)
1. **Practice** — Free movement with valid move highlighting. Complete after 5 moves.
2. **Challenge** — Catch 3 randomly placed stars on the board.
3. **Chase** — Catch an escaping enemy piece (King or Knight). Enemy uses random escape AI.
- Pawn only has the practice phase due to limited movement.

### Persistence
- Completed lessons saved to localStorage (Zustand persist middleware)
- Language preference saved to localStorage
- Piece theme preference saved to localStorage (preferencesStore)

## Internationalization
- English (en) and Hebrew (he)
- Hebrew uses RTL layout (automatically set on `<html>` element)
- Translation keys organized: `home.*`, `prompts.*`, `pieces.[type].name/friendly`
- Hebrew piece names include the definite article (e.g., "The Rook" = "הצריח")

## Commands
- `npm run dev` — Start Vite dev server
- `npm run build` — Production build
- `npm run electron:dev` — Run Electron in dev mode
- `npm run electron:build` — Package Electron app

## Work Log
- Responsive layout fixes for iPad, iPhone, and browser viewport
- Hebrew translation refinements (definite articles on piece names)
- Enemy king placed on safe square in chase phase (not immediately capturable)
- Full i18n system with English/Hebrew and RTL support
- Piece theme system with "standard" (kid-friendly) and "classic" (Staunton) styles
