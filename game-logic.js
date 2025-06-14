import Field from './classes.js'
import { checkMovement, findPathCharacter, getMovementIndex } from './helper-functions.js'
import { movementPrompt, restartGamePrompt } from './IO-operations.js'

/* Entry point that starts the game loop */
export const gameExec = () => {
    gameIteraction();
};

/* Handles one full game session: initialization, gameplay loop, and replay prompt */
const gameIteraction = () => {
    const gameObject = generateGameObject(Field);
    let gameOn = true;
    do {
        gameObject.print();
        gameOn = makeMovement(gameObject.field, gameObject.constructor.fieldSymbols, gameObject.constructor.movements, gameOn);
    } while (gameOn === true)
    
    playAgain();
}

/* Creates and returns a new game object using the provided class blueprint */
const generateGameObject = (gameClass) => {
    const gameFiled = gameClass.generateField(50, 100);
    const gameObject = new gameClass(gameFiled);
    return gameObject;
}

/* Handles user input, validates direction, and updates game state accordingly */
const makeMovement = (field, symbolsObject, movementsObject, gameVar) => {
    let move = movementPrompt();
    if (checkMovement(move, movementsObject)){
        const charIndex = findPathCharacter(field, symbolsObject);
        const movementIndex = getMovementIndex(move, movementsObject, charIndex);
        gameVar = validateAndMove(field, charIndex, movementIndex, symbolsObject, gameVar);
    } else {
        console.log('please enter a valid direction (r, l, u, d)');
        gameVar = makeMovement(field, symbolsObject, movementsObject, gameVar);
    }

    return gameVar;
}

/* Evaluates game consequences based on the player's next move */
const validateAndMove = (field, charIndex, movementIndex, symbolsObject, gameVar) => {
    const [newX, newY] = movementIndex;
    const [oldX, oldY] = charIndex;

    if (newX < 0 || newX >= field.length || newY < 0 || newY >= field[0].length) {
        console.error("Game over! Movement out of bounds!");
        gameVar = false;
    } else if (field[newX][newY] === symbolsObject.hole) {
        console.log("Game Over! You fell into a hole.");
        gameVar = false;
    } else if (field[newX][newY] === symbolsObject.hat) {
        console.log("Congratulations! You found the hat!");
        gameVar = false;
    } else if (field[newX][newY] === symbolsObject.fieldCharacter) {
        field[newX][newY] = symbolsObject.pathCharacter;
        field[oldX][oldY] = symbolsObject.fieldCharacter;
        gameVar = true;
    }

    return gameVar;
};

/* Asks the player if they'd like to play again and handles input accordingly */
const playAgain = () => {
    const option = restartGamePrompt();
    if (option === 'y') {
        gameIteraction();
    } else if (option === 'n') {
        process.exit();
    } else {
        console.log('Please enter a valid option (y/n)');
        playAgain();
    }
}