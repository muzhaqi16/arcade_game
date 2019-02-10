// Enemies our player must avoid
class Enemy{
  constructor(x = 10,y=65){

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    //get a random a speed every time the enemy is loaded
    this.speed = this.getRandom();
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
      this.x+=this.speed*dt;
      if(this.x>ctx.canvas.width){
        this.x=-101;
        this.y = enemyLocations[this.getRandom(0,2)];
        this.speed = this.getRandom();
      }

      //collison detection code
      //97->enemy width, 83 enemy height
      //65 -> player width, 72 player height
      // every time the player collides it's location is reset
      if (this.x + 97 >= player.x && this.x <= player.x + 65 && this.y+83 >=player.y && this.y<player.y+72) {
          player.x= 202;
          player.y=405;
          --lives;
          if(!lives){
            gameOver=true;
          }
        }
  }
  getRandom(min=10, max=400) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
  constructor(x =202,y=405){

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y=y;
  }

  update() {
    // check if the players location is on the water if so he wins and get 10 points and gets relocated
    if(this.y<=83){
      this.x= 202;
      this.y=405;
      score+=10;
    }
  }

  // Draw the player on the screen, required method for game
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(key){
      if(key){
        switch(key){
          case 'up':
            if(this.y>0){
              this.y-=83;//distance that player moves vertically
            }
            break;
          case 'down':
            if(this.y + 83<ctx.canvas.height-171){
              this.y+=83;
            }
            break;
          case 'left':
            if(this.x>0){
              this.x-=101;//distance that player moves horizantally
            }
            break;
          case 'right':
            if(this.x+101<ctx.canvas.width){
              this.x+=101;
            }
            break;
        }
      }
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyLocations = [65,145,230];
console.log(enemyLocations);
var allEnemies = [new Enemy(-101,enemyLocations[0]),new Enemy(-101,enemyLocations[1]),new Enemy(-101,enemyLocations[2])]
// add the players default location
var player = new Player();
var score =0;
var lives=3;
var gameOver=false;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
      if(!gameOver){
        player.handleInput(allowedKeys[e.keyCode]);
      }
});
