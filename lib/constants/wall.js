import { CELL } from './cell.js';

export const WALL = {
    WIDTH: 6,
    X_OFFSET: (CELL.WIDTH - 6) / 2, // (w - x), x = wall.width

    HEIGHT: 6,
    Y_OFFSET: (CELL.HEIGHT - 6) / 2 // (w - x), x = wall.width
}
