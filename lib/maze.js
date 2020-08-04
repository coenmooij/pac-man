import { COLOR } from './color.js';

export default class Maze {

    constructor(context) {
        this.context = context;
    }

    reset() {
        this.context.fillStyle = COLOR.BACKGROUND;
        this.context.fillRect(0, 0, 600, 600); // TODO : Make width & height come from outside
    }

    paint() {
        this.context.fillStyle = COLOR.WALL;
        const rectangles = [
            [40, 20, 30, 400]
        ];
        for (let rectangle of rectangles) {
            this.context.fillRect(rectangle[0], rectangle[1], rectangle[2], rectangle[3]);
        }
    }
}
