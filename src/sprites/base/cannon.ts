import * as Phaser from 'phaser-ce';

export default class Cannon extends Phaser.Sprite {
    constructor({game, x, y}) {
        super(game, x, y, 'cannon');
        this.anchor.set(0.9, 0.5);
    }
}