const Util = require("./util");
const MovingObject = require("./moving_object");
const Tower = require("./tower");
const Bullet = require("./bullet");

const DEFAULTS = {
	COLOR: "#505050",
	RADIUS: 15,
	SPEED: 5
};

class Enemy extends MovingObject {
  constructor(options = {}) {
    options.color = 'black';
    options.pos = options.pos || [30, 200];
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || [0, 0];
		super(options);
  }

	drawEnemy(ctx) {
    // ctx.fillStyle = this.color;

    ctx.beginPath();
    let ninja = new Image();
    ninja.src = 'img/ninja.png';
    ninja.onload = ctx.drawImage(ninja, this.pos[0]-10, this.pos[1]-10);

    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    // );
    // ctx.fill();
  }

	power(impulse) {
		this.pos[0] += impulse[0];
		this.pos[1] += impulse[1];
	}


  collideWith(otherObject) {
    if (otherObject instanceof Bullet || otherObject instanceof Enemy) {
      // this.remove();
      // otherObject.remove();
      return true;
    } else {
      throw "wtf?";
    }
  }
}

module.exports = Enemy;




  // this.life = this.maxLife + addedLife;

//common to all Emeny objects
// Enemy.prototype.maxLife = 40;
// Enemy.prototype.speed = 20;
// Enemy.prototype.color = 'red';
//
// Enemy.prototype.draw = function() {
//
//   context.beginPath();
//   context.fillStyle = this.color;
//   debugger;
//   context.fillRect(this.x,this.y,450, 450);
//   //life bar
//   context.fillStyle='green';
//   debugger;
//   context.fillRect(this.x,this.y+rectSize/3,rectSize*this.life/(this.maxLife+addedLife),rectSize/3);
// };

// Enemy.prototype.move = function() {
//   var move = this.speed;
//   if(this.x < rightBorder && this.y < firstBorder) this.x += move;
//   else if (this.x >= rightBorder && this.y < firstBorder) this.y += move;
//   else if (this.x >= leftBorder && this.y <= secondBorder) this.x -= move;
//   else if (this.x <= leftBorder && this.y <= secondBorder) this.y += move;
//   else if (this.x <= rightBorder && this.y < thirdBorder) this.x += move;
//   else if (this.x >= rightBorder  && this.y <= thirdBorder) this.y += move;
//   else  {
//     this.x -= move;
//     //returns true so enemy can be removed if another function
//     if(this.x < 0) return true;
//   }
//   return false;
// };
