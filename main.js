import Field from './classes.js'

/* debuging */

let field = Field.generateField(8, 8);
const myField = new Field(field)

let gameOn = true
do{
    myField.print();
    myField.movement();
    gameOn = false;
} while (gameOn === true)