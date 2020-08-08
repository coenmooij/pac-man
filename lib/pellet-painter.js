import { CELL } from './constants/cell.js';
import { COLOR } from './constants/color.js';
import { PELLET } from './constants/pellet.js';

export default class PelletPainter {

    constructor(context, maze) {
        this.context = context;
        this.maze = maze;
    }

    paintPellet(column, row, isPower = false) {
        const position = this.maze.getCellPosition(column, row);
        this.context.fillStyle = COLOR.PELLET;
        this.context.beginPath();
        this.context.arc(
            position.x + CELL.WIDTH / 2,
            position.y + CELL.HEIGHT / 2,
            isPower ? PELLET.POWER_RADIUS : PELLET.RADIUS,
            0,
            2 * Math.PI
        );
        this.context.fill();
    }
}
