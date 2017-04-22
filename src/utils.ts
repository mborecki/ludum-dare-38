/// <reference path="../lib/phaser.comments.d.ts"/>
import CFG from './cfg';
import * as Phaser from 'phaser-ce';

export const setResponsiveWidth = (sprite, percent, parent) => {
  let percentWidth = (sprite.texture.width - (parent.width / (100 / percent))) * 100 / sprite.texture.width
  sprite.width = parent.width / (100 / percent)
  sprite.height = sprite.texture.height - (sprite.texture.height * percentWidth / 100)
}

export function PntToWorld(rot, radius = CFG.PLANET.SIZE) {
  let x = Math.cos(rot) * radius + CFG.PLANET.X;
  let y = Math.sin(rot) * radius + CFG.PLANET.Y;

  return {
    x,y,
    rot: Phaser.Math.normalizeAngle(rot + Math.PI*0.5)
  }
}

export function WorldToPnt(x,y) {
  // debugger;
  let a = CFG.PLANET.X
  let b = CFG.PLANET.Y
  let rot = Phaser.Math.normalizeAngle(Phaser.Math.angleBetween(x, y, CFG.PLANET.X, CFG.PLANET.Y));
  let radius = Phaser.Math.distance(x,y,CFG.PLANET.X, CFG.PLANET.Y);

  return {
    rot,
    radius
  }
}

export function rotDist(r1, r2) {
  let d = Math.abs(r1 - r2);

  if (d > Math.PI) {
    d = Math.PI * 2 - d;
  }

  return d;
}