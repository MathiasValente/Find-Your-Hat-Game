/* Helper function that generates a random index within the given maxRange */
const getRandomIndex = (maxRange) => {
    const randomIndex = Math.floor(Math.random() * maxRange);
    return randomIndex;
};

/* Helper function that implements Breadth-First Search (BFS)
   to verify if there is a valid path between the player's start 
   position (pathCharacter) and the hat (hat), avoiding holes 
*/
const isPathToHat = (field, symbolsObject) => {
    const directions = [
        [-1, 0], // Up
        [1, 0],  // Down
        [0, -1], // Left
        [0, 1]   // Right
    ];

    let start, hat;
    
    // Find positions of `*` (player) and `^` (hat)
    for (let x = 0; x < field.length; x++) {
        for (let y = 0; y < field[x].length; y++) {
            if (field[x][y] === symbolsObject.pathCharacter) start = [x, y];
            if (field[x][y] === symbolsObject.hat) hat = [x, y];
        }
    }

    if (!start || !hat) return false; // If either is missing, no valid path

    // BFS setup
    const queue = [start];
    const visited = new Set();
    visited.add(`${start[0]},${start[1]}`);

    while (queue.length > 0) {
        const [x, y] = queue.shift();

        // If we reach the hat, return true
        if (x === hat[0] && y === hat[1]) return true;

        // Explore all possible moves
        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            // Check boundaries and valid movement
            if (
                newX >= 0 && newX < field.length &&
                newY >= 0 && newY < field[newX].length &&
                field[newX][newY] !== symbolsObject.hole && // Avoid holes
                !visited.has(`${newX},${newY}`)
            ) {
                queue.push([newX, newY]);
                visited.add(`${newX},${newY}`);
            }
        }
    }

    return false; // No path found
};

/* Helper function to generate an empty field template, 
   initialized with fieldCharacter
*/
export const generateFieldTemplate = (height, width, symbolsObject) => {
    const emptyField = Array.from({ length: height }, () => new Array(width).fill(symbolsObject.fieldCharacter));
    return emptyField;
};

/* Helper function to place symbols in the field template, 
   ensuring a valid path exists between the player and the hat
*/
export const placeSymbols = (field, symbolsObject) => {
    let x;
    let y;

    /* Placing the char (pathCharacter) */
    x = getRandomIndex(field.length);
    y = getRandomIndex(field[x].length);
    field[x][y] = symbolsObject.pathCharacter;

    /* Placing the hat (hat) */
    do {
        x = getRandomIndex(field.length);
        y = getRandomIndex(field[x].length); 
    } while (field[x][y] !== symbolsObject.fieldCharacter);
    field[x][y] = symbolsObject.hat;

    /* Placing the holes (hole) */
    const holePercentage = 0.3;
    const numberOfHoles = holePercentage * field.flat().length;
    for (let i = 0; i < numberOfHoles; i++) {
        do {
            x = getRandomIndex(field.length);
            y = getRandomIndex(field[x].length);
        } while (field[x][y] === symbolsObject.pathCharacter || field[x][y] === symbolsObject.hat);
        field[x][y] = symbolsObject.hole;
    }

    let pathExistis = isPathToHat(field, symbolsObject);

    if (pathExistis) {
        return field;
    } else {
        field = generateFieldTemplate(field.length, field[0].length, symbolsObject);
        placeSymbols(field, symbolsObject);
    }
};

/* Helper function to check if the movement input is valid */
export const checkMovement = (movement, movementsObject) => {
    const movementsArray = Object.values(movementsObject)
    return movementsArray.some(movements => movements === movement) ? true : false
};

/* Helper function to find the player's (`*`) position in the field */
const findPathCharacter = (field, symbolsObject) => {
    const charIndex = field.flatMap((row, x) => 
        row.map((cell, y) => cell === symbolsObject.pathCharacter ? [x, y] : null)
    ).filter(index => index !== null);
    
    return charIndex.flat();
};

/* Helper function to calculate the new position based on movement */
const getMovementIndex = (movement, movementsObject, charIndex) => {
    let movementShift;
    if (movement === movementsObject.right) {
        movementShift = [0, 1]
    } else if (movement === movementsObject.left) {
        movementShift = [0, -1]        
    } else if (movement === movementsObject.upwards) {
        movementShift = [-1, 0]
    } else if (movement === movementsObject.downwards) {
        movementShift = [1, 0]
    }

    const movementX = charIndex[0] + movementShift[0];
    const movementY = charIndex[1] + movementShift[1];
    const movementIndex = [movementX, movementY];

    return movementIndex;
}
const validateAndMove = (field, charIndex, movementIndex, symbolsObject) => {
    const [newX, newY] = movementIndex;
    const [oldX, oldY] = charIndex;

    if (newX < 0 || newX >= field.length || newY < 0 || newY >= field[0].length) {
        console.error("Game over! Movement out of bounds!");
        process.exit();
    }

    if (field[newX][newY] === symbolsObject.hole) {
        console.log("Game Over! You fell into a hole.");
        process.exit();
    }

    if (field[newX][newY] === symbolsObject.hat) {
        console.log("Congratulations! You found the hat!");
        process.exit();
    }

    if (field[newX][newY] === symbolsObject.fieldCharacter) {
        field[newX][newY] = symbolsObject.pathCharacter;
        field[oldX][oldY] = symbolsObject.fieldCharacter;
    }
};

/* Helper function to update the field when the player moves */
export const makeMovement = (movement, field, symbolsObject, movementsObject) => {
    const charIndex = findPathCharacter(field, symbolsObject);
    const movementIndex = getMovementIndex(movement, movementsObject, charIndex);
    validateAndMove(field, charIndex, movementIndex, symbolsObject);
}