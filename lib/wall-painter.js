import { CELL } from './constants/cell.js';
import { COLOR } from './constants/color.js';

export default class WallPainter {

    constructor(context, maze) {
        this.context = context;
        this.maze = maze;
    }

    paintDoor(x, y) {
        const location = this.maze.getCellLocation(x, y);
        this.context.fillStyle = COLOR.DOOR;
        this.paintMiddle(location);
        if (this.canConnectLeft(x, y)) {
            this.paintLeft(location);
        }
        if (this.canConnectRight(x, y)) {
            this.paintRight(location);
        }
    }

    paintWall(x, y) {
        const location = this.maze.getCellLocation(x, y);
        this.context.fillStyle = COLOR.WALL;

        this.paintMiddle(location);

        if (this.canConnectTop(x, y)) {
            this.paintTop(location);
        }
        if (this.canConnectBottom(x, y)) {
            this.paintBottom(location);
        }
        if (this.canConnectLeft(x, y)) {
            this.paintLeft(location);
        }
        if (this.canConnectRight(x, y)) {
            this.paintRight(location);
        }
    }

    canConnectTop(x, y) {
        return this.isConnectable(x, y - 1)
            && (!this.isConnectable(x - 1, y)
                || !this.isConnectable(x - 1, y - 1)
                || !this.isConnectable(x + 1, y)
                || !this.isConnectable(x + 1, y - 1));
    }

    canConnectBottom(x, y) {
        return this.isConnectable(x, y + 1)
            && (!this.isConnectable(x - 1, y)
                || !this.isConnectable(x - 1, y + 1)
                || !this.isConnectable(x + 1, y)
                || !this.isConnectable(x + 1, y + 1));
    }

    canConnectLeft(x, y) {
        return this.isConnectable(x - 1, y)
            && (!this.isConnectable(x, y - 1)
                || !this.isConnectable(x, y + 1)
                || !this.isConnectable(x - 1, y - 1)
                || !this.isConnectable(x - 1, y + 1));
    }

    canConnectRight(x, y) {
        return this.isConnectable(x + 1, y)
            && (!this.isConnectable(x, y - 1)
                || !this.isConnectable(x, y + 1)
                || !this.isConnectable(x + 1, y - 1)
                || !this.isConnectable(x + 1, y + 1));
    }

    isConnectable(x, y) {
        const cell = this.maze.getCell(x, y);
        return cell === CELL.WALL || cell === CELL.GHOST_DOOR;
    }

    paintMiddle(location) {
        this.context.fillRect(location.x + 6, location.y + 6, 8, 8);
    }

    paintTop(location) {
        this.context.fillRect(location.x + 6, location.y, 8, 6);
    }

    paintBottom(location) {
        this.context.fillRect(location.x + 6, location.y + 14, 8, 6);
    }

    paintLeft(location) {
        this.context.fillRect(location.x, location.y + 6, 6, 8);
    }

    paintRight(location) {
        this.context.fillRect(location.x + 14, location.y + 6, 6, 8);
    }
}
