import { CANVAS } from './constants/canvas.js';
import { CELL } from './constants/cell.js';
import { FAKE_LOCATIONS } from './constants/fake-locations.js';
import { GRID } from './constants/grid.js';
import { MAZE } from './constants/maze.js';

export default class Maze {

    constructor() {
        this.maze = MAZE;
    }

    // Location in the grid
    getLocation(x, y) {
        return [Math.floor(x / CELL.WIDTH), Math.floor(y / CELL.HEIGHT)];
    }

    getCell(column, row) {
        for (const [fakeColumn, fakeRow] of FAKE_LOCATIONS) {
            if (column === fakeColumn && row === fakeRow) {
                return CELL.WALL;
            }
        }
        if (column < 0 || column >= GRID.WIDTH || row < 0 || row >= GRID.HEIGHT) {
            return CELL.EMPTY;
        }
        return this.maze[row][column];
    }

    getCellAt(x, y) {
        const [column, row] = this.getLocation(x, y);
        return this.getCell(column, row);
    }

    emptyCellAt(x, y) {
        const [column, row] = this.getLocation(x, y);
        this.maze[row][column] = CELL.EMPTY;
    }

    // Location of topleft of the cell on the canvas
    getCellPosition(column, row) {
        return {x: column * CELL.WIDTH, y: row * CELL.HEIGHT};
    }

    isValidPosition(x, y) {
        const [column, row] = this.getLocation(x, y);
        if (!this.isValidCell(column, row)) {
            return false;
        }
        const offsetX = x % CELL.WIDTH;
        const offsetY = y % CELL.HEIGHT;

        if (offsetX === CELL.WIDTH / 2 && offsetY === CELL.HEIGHT / 2) {
            return true;
        }
        if (offsetX !== CELL.WIDTH / 2 && offsetY !== CELL.HEIGHT / 2) {
            return false;
        }
        if (offsetX < 10) { // LEFT
            return this.isValidCell(column - 1, row);
        }
        if (offsetX > 10) { // RIGHT
            return this.isValidCell(column + 1, row);
        }
        if (offsetY < 10) { // TOP
            return this.isValidCell(column, row - 1);
        }
        // BOTTOM
        return this.isValidCell(column, row + 1);
    }

    isValidCell(column, row) {
        const cell = this.getCell(column, row);
        return cell === CELL.EMPTY || cell === CELL.PELLET || cell === CELL.POWER_PELLET || cell === CELL.TELEPORT;
    }

    isTeleport(x, y) {
        const cell = this.getCellAt(x, y);
        return cell === CELL.TELEPORT;
    }

    getTeleportDestination(x, y) {
        if (x < CELL.WIDTH) {
            return [CANVAS.WIDTH - CELL.WIDTH, y];
        } else {
            return [CELL.WIDTH, y];
        }
    }
}
