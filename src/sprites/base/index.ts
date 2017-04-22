import * as Phaser from 'phaser-ce';
import Cannon from './cannon';

export default class Base extends Phaser.Sprite {
    cannon: Cannon;

    constructor({game, x, y}) {
        super(game, x, y, 'base');
        this.anchor.set(0.5, 0.5);

        this.createCannon();
    }

    createCannon() {
        this.cannon = new Cannon({
            game: this.game,
            x: 0,
            y: 0
        });

        this.addChild(this.cannon);
    }

    update() {
        let {x, y} = this.game.input.mousePointer.position;

        this.targetPosition(x - this.x, y - this.y);
    }

    targetPosition(x, y) {
        let rot = Phaser.Math.normalizeAngle(Phaser.Math.angleBetween(x,y,0,1) - this.rotation);

        if (rot < 0 || rot > Math.PI  * 1.5) {
            rot = 0;
        }

        if (rot > Math.PI && rot <= Math.PI * 1.5) {
            rot = Math.PI;
        }
        this.cannon.rotation = rot;
    }

    getCannonRot() : number {
        return this.cannon.rotation + this.rotation;
    }

    getBulletOrigin() : [number, number] {
        return [this.x, this.y];
    }
}