
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let circleX = 50;
const circleY = canvas.height / 2;
const circleRadius = 50;
let circleColor = getRandomColor();

let arrowX = canvas.width - 100;
const arrowY = canvas.height / 2;
const arrowWidth = 50;
const arrowHeight = 10;
const arrowColor = "black";

let arrowHit = false;

//have made it to  draw initial circle and arrow
drawCircle(circleX, circleY, circleRadius, circleColor);
drawArrow(arrowX, arrowY, arrowWidth, arrowHeight, arrowColor);

// Making Event listener for Hit button
const hitButton = document.getElementById("hitButton");
hitButton.addEventListener("click", () => {
  if (!arrowHit) {
    const animationId = requestAnimationFrame(moveArrow);
    function moveArrow() {
      clearCanvas();
      arrowX -= 5;
      drawArrow(arrowX, arrowY, arrowWidth, arrowHeight, arrowColor);
      if (arrowX <= circleX + circleRadius) {
        arrowHit = true;
        circleColor = getRandomColor();
        drawCircle(circleX, circleY, circleRadius, circleColor);
        cancelAnimationFrame(animationId);
      } else {
        requestAnimationFrame(moveArrow);
      }
    }
  }
});

// Event listener for Reset button
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
  circleX = 50;
  circleColor = getRandomColor();
  arrowX = canvas.width - 100;
  arrowHit = false;
  clearCanvas();
  drawCircle(circleX, circleY, circleRadius, circleColor);
  drawArrow(arrowX, arrowY, arrowWidth, arrowHeight, arrowColor);
});

// function to draw a circle
function drawCircle(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}


function drawArrow(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width, y - height / 2);
  ctx.lineTo(x + width, y + height / 2);
  ctx.closePath();
  ctx.fill();
}


function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}