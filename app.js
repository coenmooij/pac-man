import Game from './lib/game.js';

const FPS = 120;

let mazeContext, scoreboardContext;
let game;

window.onload = function () {
    let canvas = document.getElementById('maze');
    mazeContext = canvas.getContext('2d');

    canvas = document.getElementById('scoreboard');
    scoreboardContext = canvas.getContext('2d');

    game = new Game(mazeContext, scoreboardContext);
    game.initialize();

    document.addEventListener('keydown', (event) => {
        game.onKeyDown(event);
    });

    setInterval(() => {
        game.update();
    }, 1000 / FPS);
}
