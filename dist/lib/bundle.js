!function(t){var e={};function s(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(i,o,function(e){return t[e]}.bind(null,o));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=4)}([function(t,e){const s={dir(t){const e=s.norm(t);return s.scale(t,1/e)},dist:(t,e)=>Math.sqrt(Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2)),norm:t=>s.dist([0,0],t),randomVec(t){const e=2*Math.PI*Math.random();return s.scale([Math.sin(e),Math.cos(e)],t)},scale:(t,e)=>[t[0]*e,t[1]*e],wrap:(t,e)=>t<0?e-t%e:t>e?t%e:t,normalize(t){let e=Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2));return t.map(t=>t/e)}};t.exports=s},function(t,e,s){const i=s(0);const o=1e3/60;t.exports=class{constructor(t){this.pos=t.pos,this.vel=t.vel,this.radius=t.radius,this.color=t.color,this.game=t.game,this.isWrappable=!0}collideWith(t){}draw(t){t.fillStyle=this.color,t.beginPath(),t.arc(this.pos[0],this.pos[1],this.radius,0,2*Math.PI,!0),t.fill()}isCollidedWith(t){return i.dist(this.pos,t.pos)<this.radius+t.radius}move(t){if("#"===this.color)console.log("enemy"),this.pos=[this.pos[0]+3,this.pos[1]];else{const e=t/o,s=this.vel[0]*e,i=this.vel[1]*e;this.pos=[this.pos[0]+s,this.pos[1]+i]}this.game.isOutOfBounds(this.pos)&&("black"===this.color&&(alert("You Lose!")||window.location.reload()),this.remove())}remove(){this.game.remove(this)}}},function(t,e,s){const i=s(1);class o extends i{constructor(t){t.radius=o.RADIUS,super(t)}}o.RADIUS=2,o.SPEED=5,t.exports=o},function(t,e,s){const i=s(2),o=s(0),n=s(1);class r extends n{constructor(t){t.radius=r.RADIUS,t.vel=t.vel||[0,0],t.color=t.color||"green",super(t)}drawTower(t){t.fillStyle=this.color,t.beginPath();let e=new Image;this.game.inRange()?e.src="img/angry.png":e.src="img/softSmile.png",e.onload=t.drawImage(e,this.pos[0]-10,this.pos[1]-10)}fireBullet(t,e){o.scale(o.dir(this.vel),i.SPEED);let s=[t,e];s=o.normalize(s),s=o.scale(s,i.SPEED);const n=new i({pos:this.pos,vel:s,color:"red",game:this.game});this.game.add(n)}power(t){this.vel[0]+=t[0],this.vel[1]+=t[1]}}r.RADIUS=15,t.exports=r},function(t,e,s){const i=s(5),o=s(8);document.addEventListener("DOMContentLoaded",(function(){const t=document.getElementsByTagName("canvas")[0];t.width=i.DIM_X,t.height=i.DIM_Y;const e=t.getContext("2d"),s=new i;new o(s,e).start()}))},function(t,e,s){const i=s(3),o=s(6),n=s(2),r=s(7),a=s(0);class l{constructor(){this.enemies=[],this.bullets=[],this.towers=[],this.target=[]}add(t){if(t instanceof r)this.enemies.push(t);else if(t instanceof i)this.towers.push(t);else if(t instanceof o)this.target.push(t);else{if(!(t instanceof n))throw"wtf?";this.bullets.push(t)}}addTarget(){const t=new o({pos:this.randomPosition(),game:this});return this.add(t),t}addEnemy(){const t=new r({pos:[50,50],game:this});return this.add(t),t}addTower(){const t=new i({pos:[200,350],game:this});return this.add(t),t}allObjects(){return[].concat(this.enemies,this.bullets,this.towers,this.target)}checkCollisions(){const t=this.allObjects();for(let e=0;e<t.length;e++)for(let s=1;s<t.length;s++){const i=t[e],a=t[s];i instanceof n&&a instanceof r||i instanceof r&&a instanceof n?i.isCollidedWith(a)&&(i.remove(),a.remove(),l.BG_COLOR="#FF0000",window.location.reload()):(i instanceof r&&a instanceof o||i instanceof o&&a instanceof r)&&i.isCollidedWith(a)&&(l.BG_COLOR="#32CD32",window.location.reload())}}draw(t){t.clearRect(0,0,l.DIM_X,l.DIM_Y),t.fillStyle=l.BG_COLOR,t.fillRect(0,0,l.DIM_X,l.DIM_Y),this.allObjects().forEach(e=>{e instanceof i?e.drawTower(t):e instanceof o?e.drawTarget(t):e instanceof r?e.drawEnemy(t):e.draw(t)})}isOutOfBounds(t){return t[0]<0||t[1]<0||t[0]>l.DIM_X||t[1]>l.DIM_Y}moveObjects(t){this.allObjects().forEach(e=>{e instanceof i||e.move(t)})}remove(t){if(t instanceof n)this.bullets.splice(this.bullets.indexOf(t),1);else if(t instanceof r)this.enemies.splice(this.enemies.indexOf(t),1);else{if(!(t instanceof i))throw"wtf?";this.towers.splice(this.towers.indexOf(t),1)}}inRange(){let t=!1;return this.towers.forEach(e=>{this.enemies.forEach(s=>{let i=e.pos[0],o=e.pos[1],n=s.pos[0],r=s.pos[1];if(a.dist([i,o],[n,r])<160){let s=n-i,a=r-o;e.fireBullet(s,a),t=!0}})}),t}randomPosition(){return[l.DIM_X*Math.random(),l.DIM_Y*Math.random()]}step(t){this.moveObjects(t),this.checkCollisions()}}l.BG_COLOR="#FFF",l.DIM_X=450,l.DIM_Y=450,l.FPS=32,l.NUM_ENEMIES=1,t.exports=l},function(t,e,s){s(0);const i=s(1);class o extends i{constructor(t){t.radius=o.RADIUS,t.vel=t.vel||[0,0],t.color=t.color||"green",super(t)}drawTarget(t){t.beginPath();let e=new Image;e.src="img/target.png",e.onload=t.drawImage(e,this.pos[0]-10,this.pos[1]-10)}}o.RADIUS=15,t.exports=o},function(t,e,s){s(0);const i=s(1),o=(s(3),s(2)),n=15;class r extends i{constructor(t={}){t.color="black",t.pos=t.pos||[30,200],t.radius=n,t.vel=t.vel||[0,0],super(t)}drawEnemy(t){t.beginPath();let e=new Image;e.src="img/ninja.png",e.onload=t.drawImage(e,this.pos[0]-10,this.pos[1]-10)}power(t){this.pos[0]+=t[0],this.pos[1]+=t[1]}collideWith(t){if(t instanceof o||t instanceof r)return!0;throw"wtf?"}}t.exports=r},function(t,e){class s{constructor(t,e){this.game=t,this.ctx=e,this.tower=this.game.addTower(),this.target=this.game.addTarget(),this.enemy=this.game.addEnemy(),this.generateGrid=this.generateGrid.bind(this)}bindKeyHandlers(){const t=this.enemy;Object.keys(s.MOVES).forEach(e=>{let i=s.MOVES[e];key(e,()=>{t.power(i)})})}start(){this.bindKeyHandlers(),this.lastTime=0,this.generateGrid(),setInterval(()=>this.game.inRange(),2e3),requestAnimationFrame(this.animate.bind(this))}animate(t){this.generateGrid();const e=t-this.lastTime;this.game.step(e),this.game.draw(this.ctx),this.lastTime=t,requestAnimationFrame(this.animate.bind(this))}generateGrid(t=450,e=30){for(let s=.5;s<t+1;s+=e)for(let i=.5;i<t+1;i+=e)this.ctx.moveTo(s,0),this.ctx.lineTo(s,450),this.ctx.moveTo(0,i),this.ctx.lineTo(450,i);this.ctx.strokeStyle="#ddd",this.ctx.stroke()}}s.MOVES={up:[0,-5],left:[-5,0],down:[0,5],right:[5,0]},t.exports=s}]);
//# sourceMappingURL=bundle.js.map