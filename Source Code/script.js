const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');

const gridSize = 20;
let snake = [{ x: 160, y: 160 }];
let direction = { x: gridSize, y: 0 };
let food = getRandomPosition();
let score = 0;
let gameInterval;

function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
  };
}

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? '#00ff00' : '#33cc33';
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(segment.x, segment.y, gridSize, gridSize);
  });

  // Draw food
  ctx.fillStyle = '#ff0033';
  ctx.beginPath();
  ctx.arc(food.x + gridSize / 2, food.y + gridSize / 2, gridSize / 2.5, 0, 2 * Math.PI);
  ctx.fill();
}

function update() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Wall collision
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameInterval);
    alert('Game Over!');
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    scoreDisplay.textContent = score;
    food = getRandomPosition();
  } else {
    snake.pop();
  }
}

function gameLoop() {
  update();
  draw();
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -gridSize };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: gridSize };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -gridSize, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: gridSize, y: 0 };
      break;
  }
});

restartBtn.addEventListener('click', () => {
  snake = [{ x: 160, y: 160 }];
  direction = { x: gridSize, y: 0 };
  food = getRandomPosition();
  score = 0;
  scoreDisplay.textContent = score;
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 100);
});

gameInterval = setInterval(gameLoop, 100);