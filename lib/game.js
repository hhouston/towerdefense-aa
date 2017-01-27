const Tower = require("./tower");
const Target = require("./target");
const Bullet = require("./bullet");
const Enemy = require("./enemy");
const Util = require("./util");

class Game {
  constructor() {
    this.enemies = [];
    this.bullets = [];
    this.towers = [];
    this.target = [];
  }

  add(object) {
    if (object instanceof Enemy) {
      this.enemies.push(object);
    } else if (object instanceof Tower) {
      this.towers.push(object);
    } else if (object instanceof Target) {
      this.target.push(object);
    } else if (object instanceof Bullet) {
      this.bullets.push(object);
    } else {
      throw "wtf?";
    }
  }

  addTarget() {
    const target = new Target({
      pos: [200, 420],
      game: this
    });

    this.add(target);

    return target;
  }

  addEnemy() {
    const enemy = new Enemy({
      pos: [50, 50],
      game: this
    });

    this.add(enemy);

    return enemy;
  }

  addTower() {
    const tower = new Tower({
      pos: [200, 350],
      game: this
    });

    this.add(tower);

    return tower;
  }

  allObjects() {
    return [].concat(this.enemies, this.bullets, this.towers, this.target);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 1; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];
        if ((obj1 instanceof Bullet) && (obj2 instanceof Enemy) || (obj1 instanceof Enemy) && (obj2 instanceof Bullet)) {
          if (obj1.isCollidedWith(obj2)) {
            obj1.remove();
            obj2.remove();
            if(!alert('You Lose!')){window.location.reload();}
          }
        } else if ((obj1 instanceof Enemy) && (obj2 instanceof Target) || (obj1 instanceof Target) && (obj2 instanceof Enemy)) {
          if (obj1.isCollidedWith(obj2)) {
            if(!alert('You win!')){window.location.reload();}
          }
        }
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      if (object instanceof Tower) {
        object.drawTower(ctx);
      } else if (object instanceof Target) {
        object.drawTarget(ctx);
      } else if (object instanceof Enemy) {
        object.drawEnemy(ctx);
      } else {
        object.draw(ctx);
      }
    });
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      if (!(object instanceof Tower)) {
        object.move(delta);
      }
    });
  }

  remove(object) {
    if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Enemy) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof Tower) {
      this.towers.splice(this.towers.indexOf(object), 1);
    } else {
      throw "wtf?";
    }
  }

  inRange() {
    let inRange = false;
    this.towers.forEach(tower => {
      this.enemies.forEach(enemy => {

        let towerX = tower.pos[0];
        let towerY = tower.pos[1];

        let enemyX = enemy.pos[0];
        let enemyY = enemy.pos[1];

        let dist = Util.dist([towerX, towerY], [enemyX, enemyY]);


        if(dist < 160){
          let bulletX = enemyX - towerX;
          let bulletY = enemyY - towerY;

          tower.fireBullet(bulletX, bulletY);
          inRange = true;
        }
      });
    });
    return inRange;
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }
}

Game.BG_COLOR = "#FFF";
Game.DIM_X = 450;
Game.DIM_Y = 450;
Game.FPS = 32;
Game.NUM_ENEMIES = 1;

module.exports = Game;
