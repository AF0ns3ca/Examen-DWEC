const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//El width está mal definido, no es const width = canvas.width = window.innerHeight; sino const width = canvas.width = window.innerWidth;
//const width = canvas.width = window.innerHeight;
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function loop() {
    // El fondo verde rgba(0,245,0,0.25) no es ni bonito ni hace buena usabilidad, el codigo deberia ser rgba(0,0,0,0.25), para fondo negro
    //ctx.fillStyle = 'rgba(0, 245, 0, 0.25)';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
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