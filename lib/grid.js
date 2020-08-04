import { CANVAS, HORIZONTAL_PATH_LIST, VERTICAL_PATH_LIST } from './canvas.js';
import { COLOR } from './color.js';


export default class Grid {

    constructor(context) {
        this.context = context;
        this.grid = [];
        this.initializeGrid();
    }

    initializeGrid() {
        for (const path of HORIZONTAL_PATH_LIST) {
            this.addHorizontalPath(path[0], path[1], path[2]);
        }
        for (const path of VERTICAL_PATH_LIST) {
            this.addVerticalPath(path[0], path[1], path[2]);
        }
    }

    addHorizontalPath(height, start, end) {
        for (let x = start; x <= end; x++) {
            if (this.grid[height] === undefined) {
                this.grid[height] = [];
            }
            this.grid[height][x] = true;
        }
    }

    addVerticalPath(width, start, end) {
        for (let y = start; y <= end; y++) {
            if (this.grid[y] === undefined) {
                this.grid[y] = [];
            }
            this.grid[y][width] = true;
        }
    }

    isValidPosition(x, y) {
        return this.grid[y] !== undefined && this.grid[y][x] === true;
    }

    paint() {
        for (let y = 0; y < CANVAS.SIZE; y++) {
            for (let x = 0; x < CANVAS.SIZE; x++) {
                if (this.isValidPosition(x, y)) {
                    this.paintPosition(x, y);
                }
            }
        }
    }

    // Debug function to paint the grid
    paintPosition(x, y) {
        this.context.fillStyle = COLOR.GRID;
        this.context.fillRect(x - CANVAS.RADIUS, y - CANVAS.RADIUS, CANVAS.RADIUS * 2, CANVAS.RADIUS * 2);
    }
}
