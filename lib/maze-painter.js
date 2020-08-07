import { CANVAS } from './constants/canvas.js';
import { CELL } from './constants/cell.js';
import { COLOR } from './constants/color.js';
import { GRID } from './constants/grid.js';
import WallPainter from './wall-painter.js';

export default class MazePainter {

    constructor(context, maze) {
        this.context = context;
        this.maze = maze;
        this.wallPainter = new WallPainter(context, maze);
    }

    paint() {
        for (let y = 0; y < GRID.HEIGHT; y++) {
            for (let x = 0; x < GRID.WIDTH; x++) {
                this.paintCell(x, y);
            }
        }
    }

    paintCell(x, y) {
        switch (this.maze.getCell(x, y)) {
            case CELL.WALL:
                this.wallPainter.paintWall(x, y);
                break;
            case CELL.EMPTY:
            case CELL.GHOST_HOUSE:
                // nothing to paint
                break;
        }
    }

    repaint() {

    }

    reset() {
        this.context.fillStyle = COLOR.BACKGROUND;
        this.context.fillRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
    }

    // Debug function to paint the grid
    paintFullPosition(x, y) {
        this.context.fillStyle = COLOR.BACKGROUND;
        this.context.fillRect(x - CANVAS.RADIUS, y - CANVAS.RADIUS, CANVAS.RADIUS * 2, CANVAS.RADIUS * 2);
    }

    // Debug function to paint the trail
    paintMiddlePosition(x, y) {
        this.context.fillStyle = COLOR.GRID;
        this.context.fillRect(x, y, 1, 1);
    }
}
