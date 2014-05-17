
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

function checkCollision(a, b) {
  dist = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  return dist < 50
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


  var playerSprite = new Image();
  imageLoader.loadImage(playerSprite, "http://img225.imageshack.us/img225/4021/spectreb.png");
  var bulletSprite = new Image();
  imageLoader.loadImage(bulletSprite, "http://img3.wikia.nocookie.net/__cb20120903001531/mario/images/7/7c/SMB_Bullet_Bill_sprite.png");
  var enemySprite = new Image();
  imageLoader.loadImage(enemySprite, "http://i1218.photobucket.com/albums/dd420/CharzyCharChar/UnicornSprite.gif");

  var player = {
    x: 20,
    y: 40,
    vy: 0,
    draw: function() {
      ctx.drawImage(playerSprite, this.x, this.y);
    },
    move: function() {
      this.y += this.vy;
    }
  };

  var bullets = [];

  var enemies = [];

  function makeEnemy() {
    var newEnemy = {
      x: canvas.width,
      y: Math.random() * canvas.height,
      vx: -1,
      vy: 0,
      draw: function() {
        ctx.drawImage(enemySprite, this.x, this.y);
      },
      move: function() {
        this.vy = 2 * Math.random() - 1;
        this.y += this.vy;
        this.x += this.vx;
      }
    }
    enemies.push(newEnemy)
  }
  setInterval(makeEnemy, 1500)

  // this function draws your frame.
  // Ex:
  //  drawFrame() {
  //    ctx.clearRect(0, 0, canvas.width, canvas.height);
  //    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 50, 50);
  //  }
  function drawFrame() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // move and draw the player
    player.move();
    player.draw();

    // move and draw the bullets
    for (var i=0; i < bullets.length; i++) {
      bullets[i].move();
      bullets[i].draw();

      // check collision
      for (var j=0; j < enemies.length; j++) {
        if (checkCollision(bullets[i], enemies[j])) {
          enemies.splice(j, 1);
          bullets.splice(i, 1);
          i--;
          break;
        }
      }
    }

    // make enemies
    for (var i=0; i < enemies.length; i++) {
      enemies[i].move();
      enemies[i].draw();

      // check game over
      if (enemies[i].x < 0) {
        alert('GAME OVER');
        enemies = [];
      }
    }

  }

  // when all the images are loaded, start the drawFrame function at 30 frames
  // per second.
  imageLoader.onImagesLoaded(function() {
    setInterval(drawFrame, 1000 / 30)
  });


  // These are your control functions. For space, up, down, left, and right.
  // For example, the onSpacebarDown function will get called ONCE when the
  // space bar is pressed down. The onSpacebarUp function will be called ONCE
  // when the space bar is released.

  function onSpaceBarDown() {

    // put here things you want to happen when the space bar is pressed

    newBullet = {
      x: player.x,
      y: player.y,
      vx: 6,
      draw: function() {
        ctx.drawImage(bulletSprite, this.x, this.y);
      },
      move: function() {
        this.x += this.vx;
      }
    }

    bullets.push(newBullet);

  }
  function onSpaceBarUp() {

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
    player.vy = -2;

  }
  function onUpArrowUp() {

    // put here things you want to happen when the up arrow is released
    player.vy = 0;

  }
  function onRightArrowDown() {

    // put here things you want to happen when the right arrow is pressed

  }
  function onRightArrowUp() {

    // put here things you want to happen when the right arrow is released

  }
  function onDownArrowDown() {

    // put here things you want to happen when the left arrow is pressed
    player.vy = 2;

  }
  function onDownArrowUp() {

    // put here things you want to happen when the left arrow is released
    player.vy = 0;

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
