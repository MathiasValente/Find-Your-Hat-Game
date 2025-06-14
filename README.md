# 🎩 Find Your Hat!

A terminal-based puzzle adventure game built in JavaScript — navigate the field, dodge holes, and find your hat before it's too late.

## 🕹️ How to Play

You’re dropped into a randomly generated field represented in ASCII characters. Use keyboard inputs to navigate through the grid and reach the hat:

- `*` – Your current position (the player)  
- `^` – The hat (your goal)  
- `O` – Holes (avoid these!)  
- `░` – Walkable field

At each turn, choose your direction:
- r = right
- l = left
- u = up
- d = down

⚠️ Hit a hole or move out of bounds and it’s game over.  
🎉 Find the hat and you win the round!

## ✨ Features

- Dynamically generated fields with guaranteed solvability
- Real-time command line input
- Recursive path validation via Breadth-First Search (BFS)
- Fully modular and object-oriented architecture
- Replayable with random map generation each time

## 🧠 Technologies

- JavaScript (Node.js)
- ES6+ Classes
- Readline for terminal interaction

## 🚀 Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/find-your-hat.git
   cd find-your-hat
2. Run the game:
    ```bash
    node src/main.js
3. Start moving, and find your hat

## 📁 File Structure
src/ <br>
├── classes.js              # Field class definition <br>
├── helper-functions.js     # Utilities: field creation, BFS, etc. <br>
├── game-logic.js           # Game flow and mechanics <br>
├── IO-operations.js        # User prompts and input handling <br>
└── main.js                 # Entry point <br>

## 🎯 Future Ideas
- Difficulty settings (hole density, field size)
- Move counter + leaderboard
- Save/load functionality
- Visual interface (web version?)