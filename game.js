
// The ImageLoader is a helper class to load images asynchronously. Use the
// loadImage function to give Image objects image source paths. When all the
// images are loaded, the callback function passed to onImagesLoaded is called.
//
// Ex:
//  var playerImage = new Image();
//  imageLoader.loadImage(playerImage, "./playerSprite.png");
//  imageLoader.ready(function() {
//    alert("everything is loaded!");
//  })
var ImageLoader = function() {
  this.images = [];
  this.loaded = 0;
  this.cb = function() {alert("You didn't give onImagesLoaded a callback function!")};
}
ImageLoader.prototype.loadImage = function(img, src) {
  that = this;
  img.onload = function() {
    if(++that.loaded == that.images.length) {
      that.cb();
    }
  }
  img.src = src;
}
ImageLoader.prototype.onImagesLoaded = function(cb) {
  this.cb = cb;
  if (this.loaded == this.images.length) {
    this.cb();
  }
}


function main() {

  // things at the top of your main function are things that will happen before
  // drawFrame function runs. This is where you load your images, set up game
  // elements, and define all the variables that drawFrame will be updating.

  // grab the "game-screen" canvas and it's 2D drawing context. You use the
  // context for drawing things to the screen.
  // Ex:
  //   var canvas = getElementById('game-screen');
  //   var ctx = canvas.getContext('2d')
  //   ctx.rect(20, 20, 150, 100);
  //   ctx.stroke();
  //
  var canvas = document.getElementById('game-screen');
  var ctx = canvas.getContext('2d');

  // Create new Image obects and use the imageLoader's loadImage function to
  // load images (by source path) into the Image objects.
  // Ex:
  //  var imageLoader = new ImageLoader();
  //  imageLoader.loadImage(playerImage, "./playerSprite.png");
  var imageLoader = new ImageLoader();




  // this function draws your frame.
  // Ex:
  //  drawFrame() {
  //    ctx.clearRect(0, 0, canvas.width, canvas.height);
  //    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 50, 50);
  //  }
  function drawFrame() {










  }


  // when all the images are loaded, start the drawFrame function at 60 frames
  // per second.
  imageLoader.onImagesLoaded(function() {
    setInterval(drawFrame, 1000 / 60)
  });


  // These are your control functions. For space, up, down, left, and right.
  // For example, the onSpacebarDown function will get called ONCE when the
  // space bar is pressed down. The onSpacebarUp function will be called ONCE
  // when the space bar is released.

  function onSpacebarDown() {

    // put here things you want to happen when the space bar is pressed

  }
  function onSpacebarUp() {

    // put here things you want to happen when the space bar is released

  }
  function onLeftArrowDown() {

    // put here things you want to happen when the left arrow is pressed

  }
  function onLeftArrowUp() {

    // put here things you want to happen when the left arrow is released

  }
  function onUpArrowDown() {

    // put here things you want to happen when the up arrow is pressed

  }
  function onUpArrowUp() {

    // put here things you want to happen when the up arrow is released

  }
  function onRightArrowDown() {

    // put here things you want to happen when the right arrow is pressed

  }
  function onRightArrowUp() {

    // put here things you want to happen when the right arrow is released

  }
  function onDownArrowDown() {

    // put here things you want to happen when the left arrow is pressed

  }
  function onDownArrowUp() {

    // put here things you want to happen when the left arrow is released

  }

  // this assigns event listeners to actually call the control functions
  window.onkeydown = function(e) {
    switch (e.keyCode) {
      case 32: onSpaceBarDown()
      case 37: onLeftArrowDown()
      case 38: onUpArrowDown()
      case 39: onRightArrowDown()
      case 40: onDownArrowDown()
    }
  }
  window.onkeyup = function(e) {
    switch (e.keyCode) {
      case 32: onSpaceBarUp()
      case 37: onLeftArrowUp()
      case 38: onUpArrowUp()
      case 39: onRightArrowUp()
      case 40: onUpArrowUp()
    }
  }
}

// call the main function and run the game.
main();
