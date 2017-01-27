/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const Grid = __webpack_require__(7);
	
	document.addEventListener("DOMContentLoaded", function() {
	  const canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  const ctx = canvasEl.getContext("2d");
	  const game = new Game();
	  new Grid(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Tower = __webpack_require__(2);
	const Target = __webpack_require__(8);
	const Bullet = __webpack_require__(3);
	const Enemy = __webpack_require__(6);
	const Util = __webpack_require__(5);
	
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
	      pos: this.randomPosition(),
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
	
	  randomPosition() {
	    return [
	      Game.DIM_X * Math.random(),
	      Game.DIM_Y * Math.random()
	    ];
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Bullet = __webpack_require__(3);
	const Util = __webpack_require__(5);
	const MovingObject = __webpack_require__(4);
	
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
	    let towerImg = new Image();
	    if (this.game.inRange()) {
	      towerImg.src = 'img/angry.png';
	    } else {
	      towerImg.src = 'img/softSmile.png';
	    }
	
	    towerImg.onload = ctx.drawImage(towerImg, this.pos[0]-10, this.pos[1]-10);
	
	    // ctx.arc(
	    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
	    // );
	    // ctx.fill();
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
	
	    const bullet = new Bullet({
	      pos: this.pos,
	      vel: bulletVel,
	      color: 'red',
	      game: this.game
	    });
	
	    this.game.add(bullet);
	  }
	
	  power(impulse) {
	    this.vel[0] += impulse[0];
	    this.vel[1] += impulse[1];
	  }
	
	}
	
	Tower.RADIUS = 15;
	module.exports = Tower;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	
	class Bullet extends MovingObject {
	  constructor(options) {
	    options.radius = Bullet.RADIUS;
	    super(options);
	  }
	}
	
	Bullet.RADIUS = 2;
	Bullet.SPEED = 5;
	
	module.exports = Bullet;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(5);
	
	class MovingObject {
	  constructor(options) {
	    this.pos = options.pos;
	    this.vel = options.vel;
	    this.radius = options.radius;
	    this.color = options.color;
	    this.game = options.game;
	    this.isWrappable = true;
	  }
	
	  collideWith(otherObject) {
	    // default do nothing
	  }
	
	  draw(ctx) {
	    ctx.fillStyle = this.color;
	
	    ctx.beginPath();
	    ctx.arc(
	      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
	    );
	    ctx.fill();
	  }
	
	  isCollidedWith(otherObject) {
	    const centerDist = Util.dist(this.pos, otherObject.pos);
	    return centerDist < (this.radius + otherObject.radius);
	  }
	
	  move(timeDelta) {
	    //timeDelta is number of milliseconds since last move
	    //if the computer is busy the time delta will be larger
	    //in this case the MovingObject should move farther in this frame
	    //velocity of object is how far it should move in 1/60th of a second
	    if(this.color === "#") {
	      console.log('enemy');
	      this.pos = [this.pos[0] + 3, this.pos[1]];
	
	    } else {
	      const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
	      offsetX = this.vel[0] * velocityScale,
	      offsetY = this.vel[1] * velocityScale;
	
	      this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
	
	    }
	
	
	    if (this.game.isOutOfBounds(this.pos)) {
	      if (this.color === 'black') {
	        if(!alert('You Lose!')){window.location.reload();}
	      }
	      this.remove();
	    }
	  }
	
	  remove() {
	    this.game.remove(this);
	  }
	}
	
	const NORMAL_FRAME_TIME_DELTA = 1000/60;
	
	module.exports = MovingObject;


/***/ },
/* 5 */
/***/ function(module, exports) {

	const Util = {
	  // Normalize the length of the vector to 1, maintaining direction.
	  dir (vec) {
	    const norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	  },
	  // Find distance between two points.
	  dist (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },
	  // Find the length of the vector.
	  norm (vec) {
	    return Util.dist([0, 0], vec);
	  },
	  // Return a randomly oriented vector with the given length.
	  randomVec (length) {
	    const deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	  // Scale the length of a vector by the given amount.
	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  },
	
	  wrap (coord, max) {
	    if (coord < 0) {
	      return max - (coord % max);
	    } else if (coord > max) {
	      return coord % max;
	    } else {
	      return coord;
	    }
	  },
	
	  normalize(vector) {
	    let length = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
	    return vector.map(x=> x / length);
	  }
	};
	
	module.exports = Util;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(5);
	const MovingObject = __webpack_require__(4);
	const Tower = __webpack_require__(2);
	const Bullet = __webpack_require__(3);
	
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


/***/ },
/* 7 */
/***/ function(module, exports) {

	class Grid {
	  constructor(game, ctx) {
	    this.game = game;
	    this.ctx = ctx;
	    this.tower = this.game.addTower();
	    this.target = this.game.addTarget();
	    this.enemy = this.game.addEnemy();
	
	    this.generateGrid = this.generateGrid.bind(this);
	  }
	
	  bindKeyHandlers() {
	    const enemy = this.enemy;
	
	    Object.keys(Grid.MOVES).forEach((k) => {
	      let move = Grid.MOVES[k];
	      key(k, () => {
	        enemy.power(move);
	      });
	    });
	  }
	
	  start() {
	    this.bindKeyHandlers();
	    this.lastTime = 0;
	    this.generateGrid();
	    setInterval(() => this.game.inRange(), 2000);
	
	    //starts the animation
	    requestAnimationFrame(this.animate.bind(this));
	  }
	
	  animate(time) {
	    this.generateGrid();
	
	    const timeDelta = time - this.lastTime;
	
	    this.game.step(timeDelta);
	    this.game.draw(this.ctx);
	    this.lastTime = time;
	    // debugger;
	
	    //every call to animate requests causes another call to animate
	    requestAnimationFrame(this.animate.bind(this));
	  }
	
	  generateGrid(gridSize = 450, squareSize = 30) {
	    let square;
	    let numberOfRows = gridSize / squareSize;
	
	    for (let x = 0.5; x < gridSize + 1; x += squareSize) {
	      for (let y = 0.5; y < gridSize + 1; y += squareSize) {
	        this.ctx.moveTo(x, 0);
	        this.ctx.lineTo(x, 450);
	
	        this.ctx.moveTo(0, y);
	        this.ctx.lineTo(450, y);
	      }
	    }
	    this.ctx.strokeStyle = "#ddd";
	    this.ctx.stroke();
	  }
	
	}
	
	Grid.MOVES = {
	  "up": [ 0, -5],
	  "left": [-5,  0],
	  "down": [ 0,  5],
	  "right": [ 5,  0],
	};
	
	module.exports = Grid;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(5);
	const MovingObject = __webpack_require__(4);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map