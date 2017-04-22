import * as Phaser from 'phaser-ce';
import {setResponsiveWidth, PntToWorld} from '../utils';
import Planet from '../sprites/planet/index';
import Base from '../sprites/base/index';
import CFG from '../cfg';
import GreenMan from '../sprites/enemies/green-man';

import CannonBall from '../sprites/weapons/cannon-ball';

export class GameState extends Phaser.State {
  planet: Planet;
  base: Base;
  bg: Phaser.Sprite;

  weapons: Phaser.Group;
  enemies: Phaser.Group;

  collisionObjects: any;

  weaponMode: string = 'single';

  init () {
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.setImpactEvents(true);
    this.collisionObjects = this.game.physics.p2.createCollisionGroup();
  }
  preload () {}

  create () {

    // this.world.setBounds(0, 0, 10000, 10000);
    this.world.camera.setPosition(0,0);

    this.createBG();
    this.createPlanet();
    this.createBase();
    this.initInput();


    this.weapons = this.game.add.group();
    this.weapons.enableBody = true;

    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;

    this.spawnGreenMans();
  }

  render () {

  }

  update () {
    // this.physics.p2.overlap(this.planet, this.weapons);
    // this.physics.p2.overlap(this.enemies, this.weapons);
  }

  createBG() {
   this.bg = this.game.add.sprite(0,0,'bg'); 
   this.bg.height = this.game.height;
   this.bg.width = this.game.width;
  }

  createPlanet() {
    this.planet = new Planet({
      state: this,
      x: CFG.PLANET.X,
      y: CFG.PLANET.Y
    });
    this.game.add.existing(this.planet);
  }

  createBase() {
    let params = {
      game: this.game
    }

    this.base = new Base({
      game: this.game,
      x: 0,
      y: 0
    });

    this.spawnObject(this.base, 0 * Math.PI / 3, CFG.PLANET.SIZE)
  }

  spawnObject(object: Phaser.Sprite, rotation: number, radius: number = CFG.PLANET.SIZE, rotate: boolean = true) {
    let {x,y,rot} = PntToWorld(rotation, radius);

    object.x = x + CFG.PLANET.X;
    object.y = y + CFG.PLANET.Y;
    object.rotation = rot;

    this.add.existing(object);
  }

  initInput() {
    this.bg.inputEnabled = true;
    this.bg.events.onInputUp.add(() => {
      if (this.weaponMode === 'single') {
        this.shoot();
      }
    });
  }

  shoot() {
    let rot = this.base.getCannonRot();
    let [x ,y] = this.base.getBulletOrigin();

    let w = this.weapons.add(new CannonBall({
      state: this,
      x,
      y,
      angle: rot
    }));
  }

  spawnGreenMans() {
    let c = 7;
    for (let i = 1; i < c; i++) {

      let {x, y, rot} = PntToWorld(Phaser.Math.PI2 * i / c);


      console.log(x,y, rot)

      let enemy = this.enemies.add(new GreenMan({
        state: this,
        x: x + CFG.PLANET.X,
        y: y + CFG.PLANET.Y
      }));

      enemy.body.rotation = rot;
    }
  }
}
