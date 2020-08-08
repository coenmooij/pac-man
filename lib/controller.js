import { DIRECTION } from './constants/direction.js';

export default class Controller {

    constructor(maze, pacMan) {
        this.maze = maze;
        this.pacMan = pacMan;
        this.activeDirection = null;
    }

    move() {
        this.checkAndChangeActiveDirectionIfPossible();
        this.moveIfPossible();
        this.teleportIfPossible();
    }

    checkAndChangeActiveDirectionIfPossible() {
        if (this.activeDirection !== null) {
            const [x, y] = this.nextLocation(this.pacMan.x, this.pacMan.y, this.activeDirection);
            if (this.maze.isValidPosition(x, y)) {
                this.pacMan.direction = this.activeDirection;
                this.activeDirection = null;
            }
        }
    }

    moveIfPossible() {
        const oldLocation = {x: this.pacMan.x, y: this.pacMan.y};
        [this.pacMan.x, this.pacMan.y] = this.nextLocation(this.pacMan.x, this.pacMan.y, this.pacMan.direction);

        if (!this.maze.isValidPosition(this.pacMan.x, this.pacMan.y)) {
            this.pacMan.x = oldLocation.x;
            this.pacMan.y = oldLocation.y;
        }
    }

    teleportIfPossible() {
        if (this.maze.isTeleport(this.pacMan.x, this.pacMan.y)) {
            [this.pacMan.x, this.pacMan.y] = this.maze.getTeleportDestination(this.pacMan.x, this.pacMan.y);
        }
    }

    onKeyDown(event) {
        const direction = this.getDirection(event.key);
        if (!direction) {
            return false; // Non-directional key pressed
        }
        event.preventDefault();
        this.activeDirection = direction;
        return true;
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

    getDirection(key) {
        switch (key) {
            case 'ArrowLeft':
            case 'a':
                return DIRECTION.LEFT;
            case 'ArrowUp':
            case 'w':
                return DIRECTION.UP;
            case 'ArrowRight':
            case 'd':
                return DIRECTION.RIGHT;
            case 'ArrowDown':
            case 's':
                return DIRECTION.DOWN;
        }
    }
}
