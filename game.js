console.log("connected")

const context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 400;
// width set to 1220 on the example
context.canvas.width = 1120;

const square = {
    height: 32,
    jumping: true,
    width: 32,
    x: 0,
    xVelocity: 0,
    y: 0,
    yVelocity: 0
}

const controller = {
    left: false,
    right: false,
    up: false,

    keyListener: function (event) {

        let key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {
            case 37:
                controller.left = key_state;
                break;
            case 38:
                controller.up = key_state;
                break;
            case 39:
                controller.right = key_state;
                break
        }
    }
}

const loop = function () {
    if (controller.up && square.jumping == false) {
        square.yVelocity -= 20;
        square.jumping = true;
    }
    if (controller.left) {
        square.xVelocity -= 0.5;
    }
    if (controller.right) {
        square.xVelocity += 0.5;
    }

    square.yVelocity += 1.5;

    square.x += square.xVelocity;

    square.y += square.yVelocity;

    square.xVelocity *= 0.9;

    square.yVelocity *= 0.9;

    if (square.y > 386 - 16 - 32) {
        square.jumping = false;
        square.y = 386 - 16 - 32;
        square.yVelocity = 0;
    }

    if (square.x < -20) {
        square.x = 1220

    } else if (square.x > 1220) {
        square.x = -20
    }

    // Backdrop

    context.fillStyle = "#201A21"
    context.fillRect(0, 0, 1220, 400)


    context.fillStyle = "#8DAA9D"; // hex for cube color
    context.beginPath();
    context.rect(square.x, square.y, square.width, square.height);
    context.fill();

    // Ground
    context.fillStyle = "#2E2532"
    context.lineWidth = 30;
    context.beginPath()
    context.moveTo(0, 385)
    context.lineTo(1220, 385)
    context.stroke()

    window.requestAnimationFrame(loop)

}

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener)

window.requestAnimationFrame(loop)