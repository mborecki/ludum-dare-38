import * as Phaser from 'phaser-ce';
import Cannon from './cannon';
import {WorldToPnt, PntToWorld} from '../../utils';

export default class Base extends Phaser.Sprite {
    cannon: Cannon;
    private _pntRot: number;

    constructor({game, pntRot}) {
        super(game, 0, 0, 'base');

        console.log('Base', pntRot);

        this.anchor.set(0.5, 0.9);

        this.pntRot = pntRot;
        this.worldRender();

        this.createCannon();
    }

    get pntRot() {
        return this._pntRot;
    }

    set pntRot(v) {
        while (v < 0) {
            v = v + Phaser.Math.PI2;
        }

        this._pntRot = (v % Phaser.Math.PI2);
    }

    worldRender(pntRot = this.pntRot) {
        let {x, y, rot} = PntToWorld(pntRot);
        this.x = x;
        this.y = y;
        if (rot) {
            this.rotation = rot;
        }
    }

    createCannon() {
        this.cannon = new Cannon({
            game: this.game,
            x: 0,
            y: -10
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
        return [this.x + 10 * Math.sin(this.rotation), this.y + -10 * Math.cos(this.rotation)];
    }
}