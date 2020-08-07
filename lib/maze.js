import { CELL } from './constants/cell.js';
import { GRID } from './constants/grid.js';
import { MAZE } from './constants/maze.js';

export default class Maze {

    constructor() {
        this.maze = MAZE;
    }

    getCell(x, y) {
        if (x < 0 || x >= GRID.WIDTH || y < 0 || y >= GRID.HEIGHT) {
            return CELL.EMPTY;
        }
        return this.maze[y][x];
    }

    getCellLocation(x, y) {
        return {x: x * CELL.WIDTH, y: y * CELL.HEIGHT};
    }

    isValidPosition(x, y) {
    }

    isTeleport() {
        return false; // TODO : Implement
    }

    getTeleportDestination() {
        return [0, 0];// TOdO : Implement
    }
}
