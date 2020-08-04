import { COLOR } from './color.js';

export const RADIUS = 16;

export default class PacMan {

    constructor(context, x, y, direction) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    paint() {
        this.paintPacman();
        this.paintEye();
        this.paintHitbox();
    }

    // TODO : Take direction into account
    paintPacman() {
        this.context.fillStyle = COLOR.PACMAN;
        this.context.beginPath();
        this.context.arc(this.x, this.y, RADIUS, 0.2 * Math.PI, 1.8 * Math.PI);
        this.context.lineTo(this.x, this.y);
        this.context.closePath();
        this.context.fill();
    }

    // TODO : Take direction into account
    paintEye() {
        this.context.beginPath();
        this.context.arc(this.x, this.y - 8, 2, 0, 2 * Math.PI);
        this.context.fillStyle = COLOR.BACKGROUND;
        this.context.closePath();
        this.context.fill();
    }

    paintHitbox() {
        this.context.strokeStyle = COLOR.HITBOX;
        this.context.strokeRect(this.x - RADIUS, this.y - RADIUS, RADIUS * 2, RADIUS * 2);
    }
}
