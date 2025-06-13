/* Helper function that generates a random index within the given maxRange */
const getRandomIndex = (maxRange) => {
    const randomIndex = Math.floor(Math.random() * maxRange);
    return randomIndex;
}

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
}

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

    return isPathToHat(field, symbolsObject) ? field : placeSymbols(field, symbolsObject);
}