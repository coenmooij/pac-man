import { CANVAS } from './canvas.js';
import { COLOR } from './color.js';
import { DIRECTION } from './direction.js';

export default class PacMan {

    constructor(context, x, y) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.direction = DIRECTION.RIGHT;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    paint() {
        this.paintPacman();
        this.paintEye();
        // this.paintHitbox(); // enable for debug purposes
    }

    // TODO : Take direction into account
    paintPacman() {
        this.context.fillStyle = COLOR.PACMAN;
        this.context.beginPath();
        this.context.arc(this.x, this.y, CANVAS.RADIUS, 0.2 * Math.PI, 1.8 * Math.PI);
        this.context.lineTo(this.x, this.y);
        this.context.closePath();
        this.context.fill();
    }

    // TODO : Take direction into account
    paintEye() {
        this.context.beginPath();
        this.context.arc(this.x, this.y - CANVAS.RADIUS / 2, 2, 0, 2 * Math.PI);
        this.context.fillStyle = COLOR.BACKGROUND;
        this.context.closePath();
        this.context.fill();
    }

    paintHitbox() {
        this.context.fillStyle = COLOR.HITBOX;
        this.context.fillRect(
            this.x - CANVAS.RADIUS,
            this.y - CANVAS.RADIUS,
            CANVAS.RADIUS * 2,
            CANVAS.RADIUS * 2
        );
    }
}
