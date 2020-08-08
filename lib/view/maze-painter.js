import { CELL } from '../constants/cell.js';
import { COLOR } from '../constants/color.js';
import { GRID } from '../constants/grid.js';
import PelletPainter from './pellet-painter.js';
import WallPainter from './wall-painter.js';

export default class MazePainter {

    constructor(context, maze) {
        this.context = context;
        this.maze = maze;
        this.wallPainter = new WallPainter(context, maze);
        this.pelletPainter = new PelletPainter(context, maze);
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
            case CELL.PELLET:
                this.pelletPainter.paintPellet(x, y);
                break;
            case CELL.POWER_PELLET:
                this.pelletPainter.paintPellet(x, y, true);
                break;
            case CELL.GHOST_DOOR:
                this.wallPainter.paintDoor(x, y);
                break;
            case CELL.EMPTY:
            case CELL.GHOST_HOUSE:
                // Nothing to paint
                break;
        }
    }

    // Repaint the 3x3 cell grid around the position
    repaintAreaAt(x, y) {
        let [column, row] = this.maze.getLocation(x, y);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.repaintCell(column + i - 1, row + j - 1);
            }
        }
    }

    repaintCell(column, row) {
        this.context.fillStyle = COLOR.BACKGROUND;
        const location = this.maze.getCellPosition(column, row);
        this.context.fillRect(location.x, location.y, CELL.WIDTH, CELL.HEIGHT);
        this.paintCell(column, row);
    }
}
