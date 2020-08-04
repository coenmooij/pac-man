const HORIZONTAL_PATH_LIST = [
    [300, 87, 500]
];
const VERTICAL_PATH_LIST = [];

export default class Grid {

    constructor() {
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
}
