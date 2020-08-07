import { CELL } from './constants/cell.js';
import { COLOR } from './constants/color.js';

export default class WallPainter {

    constructor(context, maze) {
        this.context = context;
        this.maze = maze;
    }

    paintDoor(x, y) {
        const position = this.maze.getCellPosition(x, y);
        this.context.fillStyle = COLOR.DOOR;
        this.paintMiddle(position);
        if (this.canConnectLeft(x, y)) {
            this.paintLeft(position);
        }
        if (this.canConnectRight(x, y)) {
            this.paintRight(position);
        }
    }

    paintWall(x, y) {
        const position = this.maze.getCellPosition(x, y);
        this.context.fillStyle = COLOR.WALL;

        this.paintMiddle(position);

        if (this.canConnectTop(x, y)) {
            this.paintTop(position);
        }
        if (this.canConnectBottom(x, y)) {
            this.paintBottom(position);
        }
        if (this.canConnectLeft(x, y)) {
            this.paintLeft(position);
        }
        if (this.canConnectRight(x, y)) {
            this.paintRight(position);
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
        this.context.fillRect(location.x + 7, location.y + 7, 6, 6);
    }

    paintTop(location) {
        this.context.fillRect(location.x + 7, location.y, 6, 8);
    }

    paintBottom(location) {
        this.context.fillRect(location.x + 7, location.y + 12, 6, 8);
    }

    paintLeft(location) {
        this.context.fillRect(location.x, location.y + 7, 8, 6);
    }

    paintRight(location) {
        this.context.fillRect(location.x + 12, location.y + 7, 8, 6);
    }
}
