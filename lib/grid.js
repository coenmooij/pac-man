import { CANVAS } from './constants/canvas.js';
import { COLOR } from './constants/color.js';



export default class Grid {

    constructor(context) {
        this.context = context;
        this.grid = [];
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
