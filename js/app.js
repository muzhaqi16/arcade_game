// Enemies our player must avoid
class Enemy{
  constructor(x = 10,y=65){
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y=y;
    this.speed = this.getRandomSpeed();
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
      this.x+=this.speed*dt;
      if(this.x>ctx.canvas.width){
        this.x=0;
        this.speed = this.getRandomSpeed();
      }

      //collison detection code

      if (this.x < player.x + player.speed &&
        this.x + player.speed > player.x &&
        this.y < player.y + player.speed &&
        this.y + player.speed > player.y) {
          console.log("Game Over");
          player.x= 200;
          player.y=400;
          lives--;
        }
  }
  getRandomSpeed(min=40, max=300) {
    return Math.random() * (max - min) + min;
  }

  // Draw the enemy on the screen, required method for game
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player{
  constructor(x = 200,y=400){
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y=y;
    this.speed=42.75;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
  }

  // Draw the enemy on the screen, required method for game
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(key){
      if(key){
        switch(key){
          case 'up':
            if(this.y>=0){
              this.y-=this.speed;
            }
            break;
          case 'down':
            if(this.y<ctx.canvas.height-171){
              this.y+=this.speed;
            }
            break;
          case 'left':
            if(this.x>=0){
              this.x-=this.speed;
            }
            break;
          case 'right':
            if(this.x<ctx.canvas.width-101){
              this.x+=this.speed;
            }
            break;
        }
      }
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(10,65), new Enemy(10,145),new Enemy(10,230)];
// add the players default location
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
