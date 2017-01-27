const Bullet = require("./bullet");
const Util = require("./util");
const MovingObject = require("./moving_object");

class Tower extends MovingObject {
  constructor(options) {
    options.radius = Tower.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || 'green';
    super(options);
  }

  drawTower(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    let softSmile = new Image();
    softSmile.src = 'img/softSmile.png';
    softSmile.onload = ctx.drawImage(softSmile, this.pos[0]-10, this.pos[1]-10);

    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    // ctx.fill();
    debugger
  }

  fireBullet(bulletX, bulletY) {

    const relVel = Util.scale(
      Util.dir(this.vel),
      Bullet.SPEED
    );

    //calculate bulletVel based on enemy position
    let bulletVel = [
      bulletX, bulletY
    ];

    bulletVel = Util.normalize(bulletVel);
    bulletVel = Util.scale(bulletVel, Bullet.SPEED);
    // bulletVel = bulletVel * 2;
    // const bulletVel = [
    //   bulletX, bulletY
    // ];
    // debugger;

    const bullet = new Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: 'red',
      game: this.game
    });

    this.game.add(bullet);
    // debugger;
  }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

}

Tower.RADIUS = 15;
module.exports = Tower;