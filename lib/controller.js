import { DIRECTION } from './direction.js';
import { RADIUS } from './pac-man.js';

export default class Controller {

    constructor(grid, pacMan) {
        this.grid = grid;
        this.pacMan = pacMan;
    }

    move() {
        // TODO : Implement before / after checking for new location
        // TODO : Implement up & down
        switch (this.pacMan.direction) {
            case DIRECTION.RIGHT:
                if (!this.grid.isValidPosition(this.pacMan.x + 1, this.pacMan.y)) {
                    break;
                }
                this.pacMan.x += 1;
                break;
            case DIRECTION.LEFT:
                if (!this.grid.isValidPosition(this.pacMan.x - 1, this.pacMan.y)) {
                    break;
                }
                this.pacMan.x -= 1;
                if (this.pacMan.x < RADIUS / 2) {
                }
                break;
        }
    }

    onKeydown(event) {
        let direction = DIRECTION.RIGHT;
        switch (event.keyCode) {
            case 37:
                direction = DIRECTION.LEFT;
                break;
            case 38:
                direction = DIRECTION.UP;
                break;
            case 39:
                direction = DIRECTION.RIGHT;
                break;
            case 40:
                direction = DIRECTION.DOWN;
                break;
        }
        this.pacMan.setDirection(direction);
    }
}
