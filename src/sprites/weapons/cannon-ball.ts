import * as Phaser from 'phaser-ce';
import CFG from '../../cfg';

export default class CannonBall extends Phaser.Sprite {
    constructor({state, x, y, angle}) {
        super(state.game, x, y, 'cannon-ball');
        this.anchor.set(0.5, 0.5);
        this.game.physics.p2.enable(this);
        this.body.setCircle(CFG.WEAPONS.CANNON_BALL.SIZE);

        this.body.setCollisionGroup(state.collisionObjects);
        this.body.collides(state.collisionObjects);

        this.body.force.x = -CFG.WEAPONS.CANNON_BALL.SPEED * Math.cos(angle);
        this.body.force.y = -CFG.WEAPONS.CANNON_BALL.SPEED * Math.sin(angle);


        this.body.onBeginContact.add(this.collision, this);
    }

    update() {
        let distToPlanet = Phaser.Math.distance(this.x, 
                                                this.y, 
                                                CFG.PLANET.X,
                                                CFG.PLANET.Y);
        if (distToPlanet < CFG.PLANET.GRAVITY.LIMIT) {
            let force = CFG.PLANET.GRAVITY.FORCE * distToPlanet / CFG.PLANET.GRAVITY.LIMIT;
            let angle = Phaser.Math.angleBetween(this.x, 
                                                 this.y, 
                                                 CFG.PLANET.X,
                                                 CFG.PLANET.Y);

            this.body.force.x += force * Math.cos(angle);
            this.body.force.y += force * Math.sin(angle);
        }
    }

    collision() {
        console.log('COLLIDE!')
        this.destroy();
    }
}   