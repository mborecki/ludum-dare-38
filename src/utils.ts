import CFG from './cfg';

export const setResponsiveWidth = (sprite, percent, parent) => {
  let percentWidth = (sprite.texture.width - (parent.width / (100 / percent))) * 100 / sprite.texture.width
  sprite.width = parent.width / (100 / percent)
  sprite.height = sprite.texture.height - (sprite.texture.height * percentWidth / 100)
}

export function PntToWorld(rot, radius = CFG.PLANET.SIZE) {
  let x = Math.sin(rot) * radius;
  let y = -Math.cos(rot) * radius;

  return {
    x,y,rot
  }
}