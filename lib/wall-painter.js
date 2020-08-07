import { COLOR } from './constants/color.js';

export default class WallPainter {

    constructor(context, maze) {
        this.context = context;
        this.maze = maze;
    }

    paintWall(x, y) {
        const location = this.maze.getCellLocation(x, y);

        this.context.fillStyle = COLOR.WALL;
        this.paintMiddle(location);
        this.paintTop(location); // todo : conditional if has top wall and side empty

        // if wall has wall next to it and 90 degrees from it an empty cell, connect them
        // if(this.maze.getCell())

    }

    paintMiddle(cellLocation) {
        this.context.fillRect(cellLocation.x + 6, cellLocation.y + 6, 8, 8);
    }

    paintTop(cellLocation) {
        this.context.fillRect(cellLocation.x + 6, cellLocation.y, 8, 6);
    }
}
