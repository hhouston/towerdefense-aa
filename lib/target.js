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
    // ctx.fillStyle = this.color;

    ctx.beginPath();
    let target = new Image();
    target.src = 'img/target.png';
    target.onload = ctx.drawImage(target, this.pos[0]-10, this.pos[1]-10);

    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    // );
    // ctx.fill();
  }
}

Target.RADIUS = 15;
module.exports = Target;
