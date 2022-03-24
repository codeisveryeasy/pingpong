//const canvas = document.getElemenyById("myc");
let canvas = document.getElementById("myc")
const app = new PIXI.Application({
  view: canvas,
  width: window.innerWidth,
  height: window.innerHeight,
});

let loader = PIXI.Loader.shared;
let image;

loader
  .add('bar', 'images/bar.png')
  .load(setup);

function setup() {
  let texture = loader.resources.bar.texture;

  image = new PIXI.Sprite(texture);
  app.stage.addChild(image);

  image.x = app.screen.width / 2;
  image.y = app.screen.height / 2;

  
  app.ticker.add(delta => game(delta));
}

function game(delta) {
  // counter = 0
  // console.log("Hello " + counter++);
}