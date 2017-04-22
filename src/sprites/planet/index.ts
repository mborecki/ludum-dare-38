import * as Phaser from 'phaser-ce';

export default class Planet extends Phaser.Sprite {

    constructor({game, x, y}) {
        super(game, x, y, 'planet');
        this.anchor.set(0.5, 0.5);
    }
}