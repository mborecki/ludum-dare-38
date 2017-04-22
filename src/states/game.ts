import * as Phaser from 'phaser-ce';
import {setResponsiveWidth} from '../utils';
import Planet from '../sprites/planet/index';
import Base from '../sprites/base/index';
import CFG from '../cfg';

import CannonBall from '../sprites/weapons/cannon-ball';

export class GameState extends Phaser.State {
  planet: Planet;
  base: Base;
  bg: Phaser.Sprite;

  weapons: Phaser.Group;

  weaponMode: string = 'single';

  init () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }
  preload () {}

  create () {

    this.world.setBounds(0, 0, 10000, 10000);
    this.world.camera.setPosition(0,0);

    this.createBG();
    this.createPlanet();
    this.createBase();
    this.initInput();

    this.weapons = this.game.add.group();
    this.weapons.enableBody = true;
  }

  render () {

  }

  update () {

  }

  createBG() {
   this.bg = this.game.add.sprite(0,0,'bg'); 
   this.bg.height = this.game.height;
   this.bg.width = this.game.width;
  }

  createPlanet() {
    this.planet = new Planet({
      game: this.game,
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

    this.spawnObject(this.base, Math.PI / 3, CFG.PLANET.SIZE)
  }

  spawnObject(object: Phaser.Sprite, rot: number, radius: number, rotate: boolean = true) {
    let x = Math.sin(rot) * radius;
    let y = Math.cos(rot) * radius;

    object.x = x + CFG.PLANET.X;
    object.y = -y + CFG.PLANET.Y;
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

    this.weapons.add(new CannonBall({
      game: this.game,
      x,
      y,
      angle: rot
    }));

  }
}
