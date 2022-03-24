//const canvas = document.getElemenyById("myc");
let canvas = document.getElementById("mycanvas")
const app = new PIXI.Application({
  backgroundColor: 0x1099bb,
  view: canvas,
  width: window.innerWidth,
  height: window.innerHeight,
});

// Below App Function
let loader = PIXI.Loader.shared;
let player, enemy, ball;
let floors = [];
let walls = [];
let image;

let up = keyboard('ArrowUp');
let down = keyboard('ArrowDown');

loader
  .add('bar', 'images/bar.png')
  .add('ball', 'images/ball.png')
  .add('enemy', 'images/barenemy.png')
  .add('wall', 'images/wall.png')
  .load(setup);


function setup() {
  // Loading each texture
  let bar_texture = loader.resources.bar.texture;
  let ball_texture = loader.resources.ball.texture;
  let wall_texture = loader.resources.wall.texture;
  let enemy_texture = loader.resources.enemy.texture;

  // Creating container to set all our sprites inside.
  let stage = new PIXI.Container();
  app.stage.addChild(stage);

  // Placing the stage container in the center of the screen
  stage.x = app.screen.width / 2;
  stage.y = app.screen.height / 2;

  // Adding Player and Enemy Sprites and Positions
  player = new PIXI.Sprite(bar_texture);
  stage.addChild(player);

  player.x = -300;
  player.anchor.set(.5);

  enemy = new PIXI.Sprite(enemy_texture);
  stage.addChild(enemy);

  enemy.x = 300;
  enemy.anchor.set(.5);

  // Adding the ball
  ball = new PIXI.Sprite(ball_texture);
  stage.addChild(ball);

  ball.x = 0;
  ball.anchor.set(.5);

  // Setting up the walls
  for (let i = 0; i < 68; i++) {
    let new_wall = new PIXI.Sprite(wall_texture);
    let new_floor = new PIXI.Sprite(wall_texture);

    walls.push(new_wall);
    stage.addChild(walls[i]);

    walls[i].y = -200;
    walls[i].x = -300 + i * 9;
    walls[i].anchor.set(.5);

    floors.push(new_floor);
    stage.addChild(floors[i]);

    floors[i].y = 200;
    floors[i].x = -300 + i * 9;
    floors[i].anchor.set(0.5);
  }


   // We will use this to keep track of the ball's direction
   ball.vx = 1;
   ball.vy = 0;
 
   // Player and Enemy would just move up and down, so it'll just need vy.
   player.vy = 0;
   enemy.vy = 0;

   // Controls
  up.press = () => {
    player.vy = -1;
  };

  up.release = () => {
    player.vy = 0;
  };

  down.press = () => {
    player.vy = 1;
  };

  down.release = () => {
    player.vy = 0;
  };


  app.ticker.add(delta => game(delta));
}

function game(delta) {
  // counter = 0
  // console.log("Hello " + counter++);
  let speed = 5 * delta;

  ball.x += ball.vx * speed;

  //player and enemy movement
  player.y += player.vy * speed;
  enemy.y += enemy.vy * speed;
}

function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  key.downHandler = event => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  key.upHandler = event => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  // Attach Event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener("keydown", downListener, false);
  window.addEventListener("keyup", upListener, false);

  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };

  return key;
};
