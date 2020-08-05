import { DIRECTION } from './direction.js';

const TELEPORT_LOCATIONS = [
    {x: 26, y: 274, newX: 574, newY: 274},
    {x: 574, y: 274, newX: 26, newY: 274}
];

export default class Controller {

    constructor(grid, pacMan) {
        this.grid = grid;
        this.pacMan = pacMan;
        this.activeDirection = null;
    }

    // TODO : Implement teleport
    move() {
        this.checkActiveDirection();
        const oldLocation = {x: this.pacMan.x, y: this.pacMan.y};
        [this.pacMan.x, this.pacMan.y] = this.nextLocation(this.pacMan.x, this.pacMan.y, this.pacMan.direction);

        if (!this.grid.isValidPosition(this.pacMan.x, this.pacMan.y)) {
            this.pacMan.x = oldLocation.x;
            this.pacMan.y = oldLocation.y;
        }

        for (let teleportLocation of TELEPORT_LOCATIONS) {
            if (this.pacMan.x === teleportLocation.x && this.pacMan.y === teleportLocation.y) {
                this.pacMan.x = teleportLocation.newX;
                this.pacMan.y = teleportLocation.newY;
                return;
            }
        }
    }

    // Checks if a direction is active (pressed)
    // if the direction is possible, sets pac-man to go that way.
    checkActiveDirection() {
        if (this.activeDirection !== null) {
            const [x, y] = this.nextLocation(this.pacMan.x, this.pacMan.y, this.activeDirection);
            if (this.grid.isValidPosition(x, y)) {
                this.pacMan.direction = this.activeDirection;
                this.activeDirection = null;
            }
        }
    }

    // Listen to the arrow keys
    onKeyDown(event) {
        // TODO : Add alternative to deprecated function
        const direction = this.getDirection(event.keyCode);
        if (!direction) {
            return; // Non-directional key pressed
        }
        this.activeDirection = direction;
    }

    nextLocation(x, y, direction) {
        switch (direction) {
            case DIRECTION.RIGHT:
                x++;
                break;
            case DIRECTION.LEFT:
                x--;
                break;
            case DIRECTION.UP:
                y--;
                break;
            case DIRECTION.DOWN:
                y++;
                break;
        }
        return [x, y];
    }

    // TODO : Add wasd options
    getDirection(keyCode) {
        switch (keyCode) {
            case 37: // LEFT ARROW
                return DIRECTION.LEFT;
            case 38: // UP ARROW
                return DIRECTION.UP;
            case 39: // RIGHT ARROW
                return DIRECTION.RIGHT;
            case 40: // DOWN ARROW
                return DIRECTION.DOWN;
        }
    }
}
