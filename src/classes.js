import { generateFieldTemplate, placeSymbols } from './helper-functions.js'

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
}

export default Field;