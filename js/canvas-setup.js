import { balls } from "./index.js";

const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");

//El width está mal definido, no es const width = canvas.width = window.innerHeight; sino const width = canvas.width = window.innerWidth;
//const width = canvas.width = window.innerHeight;
export const width = (canvas.width = window.innerWidth);
export const height = (canvas.height = window.innerHeight);

export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

export function loop() {
  // El fondo verde rgba(0,245,0,0.25) no es ni bonito ni hace buena usabilidad, el codigo deberia ser rgba(0,0,0,0.25), para fondo negro
  //ctx.fillStyle = 'rgba(0, 245, 0, 0.25)';
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    for (const otherBall of balls) {
      if (ball !== otherBall) {
        ball.collisionDetect(otherBall);
      }
    }
  }

  requestAnimationFrame(loop);
}
