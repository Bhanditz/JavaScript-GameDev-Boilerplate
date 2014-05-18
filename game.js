
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

function distance(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
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
  //  var playerImage = new Image();
  //  imageLoader.loadImage(playerImage, "./playerSprite.png");
  var imageLoader = new ImageLoader();


  var shipImage = new Image();
  imageLoader.loadImage(shipImage, "./ship.png");

  var bulletImage = new Image();
  imageLoader.loadImage(bulletImage, "http://img2.wikia.nocookie.net/__cb20121031154849/mario/images/5/52/BulletBill-Sprite-SMB3-SNES.png");

  var enemyImage = new Image();
  imageLoader.loadImage(enemyImage, "http://fc06.deviantart.net/fs71/f/2011/208/d/4/naruto_sprite_by_st0ven-d41vukf.png");




  var ship = {
    x: 0,
    y: 30,
    vy: 0,
    vx: 0,
    sprite: shipImage,
    draw: function() {
      ctx.drawImage(this.sprite, this.x, this.y);
    },
    move: function() {
      this.y = this.y + this.vy;
      this.x = this.x + this.vx;
    }
  }

  var bullets = [];
  var enemies = [];

  // this function draws your frame.
  // Ex:
  //  drawFrame() {
  //    ctx.clearRect(0, 0, canvas.width, canvas.height);
  //    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 50, 50);
  //  }
  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ship.move();
    ship.draw();

    for (var i=0; i < bullets.length; i++) {
      bullets[i].move();
      bullets[i].draw();

      for (var j=0; j < enemies.length; j++) {
        if (distance(bullets[i], enemies[j]) < 20) {
          // collision! Don't worry about this too much. it's tricky.
          enemies.splice(j, 1);
          bullets.splice(i, 1);
          i--;
          break;
        }
      }
    }

    for (var i=0; i < enemies.length; i++) {
      enemies[i].move();
      enemies[i].draw();
    }

  }

  // make enemy once every 2 seconds
  setInterval(function() {
    enemy = {
      x: canvas.width,
      y: Math.random() * (canvas.height - 50),
      vx: -1,
      sprite: enemyImage,
      draw: function() {
        ctx.drawImage(this.sprite, this.x, this.y, 50, 50);
      },
      move: function() {
        this.x = this.x + this.vx;
      }
    }
    enemies.push(enemy);
  }, 2000);





  // when all the images are loaded, start the drawFrame function at 30 frames
  // per second.
  imageLoader.onImagesLoaded(function() {
    setInterval(drawFrame, 1000 / 30);
  });


  // These are your control functions. For space, up, down, left, and right.
  // For example, the onSpacebarDown function will get called ONCE when the
  // space bar is pressed down. The onSpacebarUp function will be called ONCE
  // when the space bar is released.

  function onSpaceBarDown() {

    // put here things you want to happen when the space bar is pressed
    var bullet = {
      x: ship.x + 20,
      y: ship.y + 20,
      vx: 5,
      sprite: bulletImage,
      draw: function() {
        ctx.drawImage(this.sprite, this.x, this.y);
      },
      move: function() {
        this.x = this.x + this.vx;
      }
    }
    bullets.push(bullet);
    console.log(bullets);

  }
  function onSpaceBarUp() {

    // put here things you want to happen when the space bar is released

  }
  function onLeftArrowDown() {

    // put here things you want to happen when the left arrow is pressed
    ship.vx = -3;

  }
  function onLeftArrowUp() {

    // put here things you want to happen when the left arrow is released
    ship.vx = 0;

  }
  function onUpArrowDown() {

    // put here things you want to happen when the up arrow is pressed
    ship.vy = -3;

  }
  function onUpArrowUp() {

    // put here things you want to happen when the up arrow is released
    ship.vy = 0;

  }
  function onRightArrowDown() {

    // put here things you want to happen when the right arrow is pressed
    ship.vx = 3;

  }
  function onRightArrowUp() {

    // put here things you want to happen when the right arrow is released
    ship.vx = 0;

  }
  function onDownArrowDown() {

    // put here things you want to happen when the left arrow is pressed
    ship.vy = 3;

  }
  function onDownArrowUp() {

    // put here things you want to happen when the left arrow is released
    ship.vy = 0;
  }

  // this assigns event listeners to actually call the control functions
  window.onkeydown = function(e) {
    switch (e.keyCode) {
      case 32:
        onSpaceBarDown();
        break;
      case 37:
          onLeftArrowDown();
          break;
      case 38:
          onUpArrowDown();
          break;
      case 39:
          onRightArrowDown();
          break;
      case 40:
          onDownArrowDown();
          break;
    }
  };
  window.onkeyup = function(e) {
    switch (e.keyCode) {
      case 32:
        onSpaceBarUp();
        break;
      case 37:
        onLeftArrowUp();
        break;
      case 38:
        onUpArrowUp();
        break;
      case 39:
        onRightArrowUp();
        break;
      case 40:
        onDownArrowUp();
        break;
    }
  };
}

// call the main function and run the game.
main();
