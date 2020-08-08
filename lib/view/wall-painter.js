import { CELL } from '../constants/cell.js';
import { COLOR } from '../constants/color.js';
import { GRID } from '../constants/grid.js';
import { WALL } from '../constants/wall.js';

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
        this.context.globalAlpha = .9;

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
        this.context.globalAlpha = 1;
    }

    canConnectTop(x, y) {
        return y > 0
            && this.isConnectable(x, y - 1)
            && (!this.isConnectable(x - 1, y)
                || !this.isConnectable(x - 1, y - 1)
                || !this.isConnectable(x + 1, y)
                || !this.isConnectable(x + 1, y - 1));
    }

    canConnectBottom(x, y) {
        return y < GRID.HEIGHT - 1
            && this.isConnectable(x, y + 1)
            && (!this.isConnectable(x - 1, y)
                || !this.isConnectable(x - 1, y + 1)
                || !this.isConnectable(x + 1, y)
                || !this.isConnectable(x + 1, y + 1));
    }

    canConnectLeft(x, y) {
        return x > 0
            && this.isConnectable(x - 1, y)
            && (!this.isConnectable(x, y - 1)
                || !this.isConnectable(x, y + 1)
                || !this.isConnectable(x - 1, y - 1)
                || !this.isConnectable(x - 1, y + 1));
    }

    canConnectRight(x, y) {
        return x < GRID.WIDTH - 1
            && this.isConnectable(x + 1, y)
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
        this.context.fillRect(
            location.x + WALL.X_OFFSET,
            location.y + WALL.Y_OFFSET,
            WALL.WIDTH,
            WALL.HEIGHT
        );
    }

    paintTop(location) {
        this.context.fillRect(
            location.x + WALL.X_OFFSET,
            location.y,
            WALL.WIDTH,
            WALL.Y_OFFSET
        );
    }

    paintBottom(location) {
        this.context.fillRect(
            location.x + WALL.X_OFFSET,
            location.y + CELL.HEIGHT - WALL.Y_OFFSET,
            WALL.WIDTH,
            WALL.Y_OFFSET
        );
    }

    paintLeft(location) {
        this.context.fillRect(
            location.x,
            location.y + WALL.Y_OFFSET,
            WALL.X_OFFSET,
            WALL.HEIGHT
        );
    }

    paintRight(location) {
        this.context.fillRect(
            location.x + CELL.WIDTH - WALL.X_OFFSET,
            location.y + WALL.Y_OFFSET,
            WALL.X_OFFSET,
            WALL.HEIGHT
        );
    }
}
