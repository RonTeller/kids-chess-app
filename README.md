# Kids Chess

A fun chess teaching app for kids aged 4-6. Learn how each chess piece moves through interactive lessons!

## Features

- Learn how each piece moves (Rook, Bishop, Queen, King, Knight, Pawn)
- Three phases per lesson:
  1. **Practice** - Move the piece around freely (5 moves)
  2. **Challenge** - Catch the stars on the board
  3. **Chase** - Catch the escaping knight!
- Colorful animations and gentle sounds
- Kid-friendly interface with large, tappable pieces

## Requirements

- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm (comes with Node.js)

## Installation

1. Clone or download this repository

2. Open a terminal and navigate to the project folder:
   ```bash
   cd kids-chess-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Game

### Web Browser (Development Mode)

Run the game in your web browser:

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

### Desktop App (Electron)

Run as a desktop application:

```bash
npm run electron:dev
```

### Build for Distribution

Create a distributable desktop app:

```bash
npm run electron:build
```

The built app will be in the `release` folder.

## How to Play

1. From the home screen, tap on any chess piece to start learning
2. In **Practice** mode, move the piece around to learn how it moves
3. In **Challenge** mode, move to the star positions to collect them
4. In **Chase** mode, catch the black knight that's running away!
5. Complete all three phases to master each piece

Have fun learning chess!
