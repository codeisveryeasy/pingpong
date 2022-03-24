//let canvas = document.getElemenyById('mycanvas')
let canvas = document.getElementById("myc")

let type = 'WebGL';

if (!PIXI.utils.isWebGLSupported()) {
  type = 'canvas';
}

PIXI.utils.sayHello(type);