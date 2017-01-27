class Grid {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.tower = this.game.addTower();
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
    setInterval(() => this.game.inRange(), 1000);

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
