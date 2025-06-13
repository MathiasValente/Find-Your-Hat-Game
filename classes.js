import { generateFieldTemplate, placeSymbols, checkMovement, makeMovement } from './helper-functions.js'
import { movementPrompt } from './IO-operations.js'

class Field {

    static generateField(height, width) {
        const emptyField = generateFieldTemplate(height, width, Field.fieldSymbols);
        const field = placeSymbols(emptyField, Field.fieldSymbols);
        return field;
    }

    static fieldSymbols = {
        hat: '^',
        hole: 'O',
        fieldCharacter: '░',
        pathCharacter: '*'
    }

    static movements = {
        right: 'r',
        left: 'l',
        upwards: 'u',
        downwards: 'd'
    }

    constructor(fieldArray) {
        this.field = fieldArray;
    }

    print() {
        console.log(this.field.map(gridRow => gridRow.join('')).join('\n'));
    }

    movement() {
        let move = movementPrompt()
        if (checkMovement(move, Field.movements)) {
            makeMovement(move, this.field, Field.fieldSymbols, Field.movements);
        } else {
            console.log('please enter a valid direction (r, l, u, d)');
            this.movement();
        };
    }
}

export default Field;