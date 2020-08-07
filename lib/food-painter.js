import { CELL } from './constants/cell.js';
import { COLOR } from './constants/color.js';
import { FOOD } from './constants/food.js';

export default class FoodPainter {

    constructor(context, maze) {
        this.context = context;
        this.maze = maze;
    }

    paintFood(x, y, isSpecial = false) {
        const location = this.maze.getCellLocation(x, y);
        this.context.fillStyle = COLOR.FOOD;
        this.context.beginPath();
        this.context.arc(
            location.x + CELL.WIDTH / 2,
            location.y + CELL.HEIGHT / 2,
            isSpecial ? FOOD.SPECIAL_RADIUS : FOOD.RADIUS,
            0,
            2 * Math.PI
        );
        this.context.fill();
    }
}
