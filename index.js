const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
const canvasSize = canvas.width / boxSize;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 1;
let dy = 0;
let score = 0;
let obstacles = [];


const snakeImage = new Image();
snakeImage.src = "images3/ty.png";
var game = document.getElementById('game');
const foodImage = new Image();
foodImage.src = 'images3/Transmigrated-as-a-Cameraman-in-Skibidi-Toilet-World_802090_1688816723-removebg-preview.png';

const obstacleImage = new Image();
obstacleImage.src = "images3/frame0-removebg-preview.png";



const restartButton = document.getElementById("restartButton");
const scoreElement = document.getElementById("score");

let gameInterval;

function getRandomCoordinate() {
  return Math.floor(Math.random() * canvasSize);
}

function placeRandomObstacle() {
  obstacles.push({ x: getRandomCoordinate(), y: getRandomCoordinate() });
}
function drawImageOnCanvas(image, x, y, width, height) {
    ctx.drawImage(image, x * boxSize, y * boxSize, width, height);
  }
  
  // Usage in drawSnake, drawFood, and drawObstacles functions
  function drawSnake() {
    snake.forEach(segment => {
      drawImageOnCanvas(snakeImage, segment.x, segment.y, boxSize * 2, boxSize * 2); // Make it 2 times larger
    });
  }
  
  function drawFood() {
    drawImageOnCanvas(foodImage, food.x, food.y, boxSize * 2, boxSize * 2); // Original size
  }
  
  function drawObstacles() {
    obstacles.forEach(obstacle => {
      drawImageOnCanvas(obstacleImage, obstacle.x, obstacle.y, boxSize * 3, boxSize * 3); // Original size
    });
  }

function updateGame() {


  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    score++;
    // Place new food randomly
    food = {
      x: getRandomCoordinate(),
      y: getRandomCoordinate()
    };

    // Randomly add obstacles
    if (Math.random() < 0.1) {
      placeRandomObstacle();
    }
  } else {
    // Remove the last segment if no food is eaten
    snake.pop();
  }
  
  // Check for collision with obstacles or canvas boundaries
  if (
    head.x < 0 || head.x >= canvasSize ||
    head.y < 0 || head.y >= canvasSize ||
    obstacles.some(obstacle => obstacle.x === head.x && obstacle.y === head.y)
  ) {
    clearInterval(gameInterval);
    game.style.display = 'block';
    obstacles = [];
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();  
  drawFood();
  drawObstacles();

  if (score >= 2){
   
    spawnObstacle();
    moveObstacles();
    drawBoss();
  }

  // Update score element
  scoreElement.textContent = "Score: " + score;
}

    

function moveObstacles() {
    for (let i = 0; i < obstacles5.length; i++) {
        obstacles5[i].x -= obstacles5[i].speed;
        drawObstacle(obstacles5[i]);
        obstacles5[i].duration -= 100; // Decrease the duration with each frame
        if (obstacles5[i].duration <= 0 || obstacles5[i].x + obstacles5[i].width < 0) {
            // Remove the obstacle when its duration runs out or it goes off the canvas
            obstacles.splice(i, 1);
            i--;
        }
    }
}
const bossObstacle = new Image();
bossObstacle.src = 'images3/re.png';
function drawBoss() {
    drawImageOnCanvas(bossObstacle, bossObstacle.x, bossObstacle.y, boxSize * 2, boxSize * 2); // Original size
    
  }
function Obstacle53(x, y, speed, duration, dy){
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.speed = speed;
    this.duration = duration;
    this.width = 4;
    this.height = 100;
    this.dx = dx;
    
}
let obstacles5 = [];
function spawnObstacle(){
    if (score >= 2){
        var x = canvasSize;
        var y = Math.floor(Math.random()* canvasSize);
        var speed = 2;
        var dx = 60;
        var dy = 100;
      
        var duration  = 1000;
        
        var obstacle3 = new Obstacle53(x, y, speed, duration, dx, dy);
        obstacles5.push(obstacle3);
    }
}
function moveObstacles() {
    for (let i = 0; i < obstacles5.length; i++) {
      obstacles5[i].x -= obstacles5[i].speed;
      obstacles5[i].y += obstacles5[i].dy;
      drawObstacle(obstacles5[i]);
  
      obstacles5[i].duration -= 100; // Decrease the duration with each frame
      if (obstacles5[i].duration <= 0 || obstacles5[i].x + obstacles5[i].width < 0) {
        // Remove the obstacle when its duration runs out or it goes off the canvas
        obstacles5.splice(i, 1); // Use splice to remove the obstacle from the array
        i--;
      }
    }
  }
  
function drawObstacle(obstacle3) {
    // Draw the obstacle on the canvas using its x, y, width, and height properties
    ctx.fillStyle = 'crimson'; // Set obstacle color
    ctx.fillRect(obstacle3.x, obstacle3.y, obstacle3.width, obstacle3.height);
    
}



function restartGame() {
  // Reset game variables
  snake = [{ x: 10, y: 10 }];
  food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
  dx = 1;
  dy = 0;
  score = 0;
  game.style.display = 'none';

  // Clear obstacles and add new ones (if needed)
  obstacles = [];
  placeRandomObstacle();

  // Resume game interval
  clearInterval(gameInterval);
  gameInterval = setInterval(updateGame, 100);
}

restartButton.addEventListener("click", restartGame);

// Start the game interval
gameInterval = setInterval(updateGame, 100);

document.addEventListener("keydown", event => {
    switch (event.key) {
      case "ArrowUp":
        if (dy !== 1) {
          dx = 0;
          dy = -1;
         
        }
        break;
      case "ArrowDown":
        if (dy !== -1) {
          dx = 0;
          dy = 1;
        }
        break;
      case "ArrowLeft":
        if (dx !== 1) {
          dx = -1;
          dy = 0;
        }
        break;
      case "ArrowRight":
        if (dx !== -1) {
          dx = 1;
          dy = 0;
        }
        break;
    }
  });