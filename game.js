console.log("connected")

const context = document.querySelector("canvas").getContext("2d");
const level = document.querySelector(".level")

context.canvas.height = 400;
// width set to 1220 on the example
context.canvas.width = 1120;


// Obstacles
let frameCount = 1;
let obCount = frameCount;
const obXCoors = []

// For Each Level
const nextFrame = () => {
    // Level Up
    level.textContent = `Level: ${frameCount}`
    frameCount++;
    for (let i = 0; i < obCount; i++) {
        // Randomly generate the x coordinate for the top corner start of the triangles
        obXCoor = Math.floor(Math.random() * (1165 - 140 + 1) + 140);
        obXCoors.push(obXCoor);

    }
    collisionDetection()
}

function collisionDetection() {
    for (let i = 0; i < obCount; i++) {
        let objLoc = obXCoors[i]
        console.log(objLoc)
        // if()
    }
}



// Turn to skater
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
        nextFrame()
    }

    // Backdrop
    context.fillStyle = "#333333"
    context.fillRect(0, 0, 1220, 400)

    // Player
    context.fillStyle = "#8DAA9D"; // hex for cube color
    context.beginPath();
    context.rect(square.x, square.y, square.width, square.height);
    context.fill();


    // Obstacles
    const height = 200 * Math.cos(Math.PI / 6);

    context.fillStyle = "#FBF5F3"; // hex for triangle color
    obXCoors.forEach((obXCoor) => {
        context.beginPath();

        context.moveTo(obXCoor, 385); // x = random, y = coor. on "ground"
        context.lineTo(obXCoor + 20, 385); // x = ^random + 20, y = coor. on "ground"
        context.lineTo(obXCoor + 10, 510 - height); // x = ^random + 10, y = peak of triangle

        context.closePath();
        context.fill();
    })




    // Ground
    context.strokeStyle = "#2E2532"
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