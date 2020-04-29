const Util = require("./util");
const MovingObject = require("./moving_object");

class Target extends MovingObject {
  constructor(options) {
    options.radius = Target.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || 'green';
    super(options);
  }

  drawTarget(ctx) {
    ctx.beginPath();
    let target = new Image();
    target.src = 'img/baby_yoda.png';
    target.onload = ctx.drawImage(target, this.pos[0]-10, this.pos[1]-10);
  }
}

Target.RADIUS = 15;
module.exports = Target;
