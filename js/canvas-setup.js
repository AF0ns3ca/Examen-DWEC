import { balls } from "./index.js";
import { random } from "./random-methods.js";
import { Ball } from "./ball-class.js";

const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");

//El width está mal definido, no es const width = canvas.width = window.innerHeight; sino const width = canvas.width = window.innerWidth;
//const width = canvas.width = window.innerHeight;
export const width = (canvas.width = window.innerWidth);
export const height = (canvas.height = window.innerHeight);

//Añadiré un metodo que rellene el vector de bolas, ademas le añadiremos un parámetro para poder establecer el numero de bolas que querremos
const fillBalls = (numBalls) => {
  while (balls.length < numBalls) {
    const size = random(10, 20);
    const ball = new Ball(
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      size
    );

    balls.push(ball);
  }
};

export function loop() {
  //Entre paréntesis se añade el numero de bolas que habra. Utilizar con cuidado que si pones mucha ueda loco
  fillBalls(25);

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
