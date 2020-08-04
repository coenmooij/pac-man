import { CANVAS, WALLS } from './canvas.js';
import { COLOR } from './color.js';

const LINE_WIDTH = 3;

export default class Maze {

    constructor(context) {
        this.context = context;
    }

    reset() {
        this.context.fillStyle = COLOR.BACKGROUND;
        this.context.fillRect(0, 0, CANVAS.SIZE, CANVAS.SIZE);
    }

    paint() {
        this.context.fillStyle = COLOR.WALL;
        for (let [x, y, width, height] of WALLS) {
            this.context.fillRect(x, y, width, LINE_WIDTH); // TOP LINE
            this.context.fillRect(x, y, LINE_WIDTH, height); // LEFT LINE
            this.context.fillRect(x, y + height - LINE_WIDTH, width, LINE_WIDTH); // BOTTOM LINE
            this.context.fillRect(x + width - LINE_WIDTH, y, LINE_WIDTH, height); // RIGHT LINE
        }
    }
}
