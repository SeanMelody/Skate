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
        if (player.x === objLoc) {
            console.log("hi")
        }
    }
}

// player is the player
const player = {
    height: 64,
    jumping: true,
    width: 32,
    x: 0,
    xVelocity: 0,
    y: 0,
    yVelocity: 0
}

// Set the skater image to an Image
const skaterImg = new Image()
skaterImg.src = "./Skater.png"

// Set up the controller
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

// Animate it all with the loop function
const loop = function () {
    if (controller.up && player.jumping == false) {
        player.yVelocity -= 20;
        player.jumping = true;
    }
    if (controller.left) {
        player.xVelocity -= 0.5;
    }
    if (controller.right) {
        player.xVelocity += 0.5;
    }

    player.yVelocity += 1.5;
    player.x += player.xVelocity;
    player.y += player.yVelocity;
    player.xVelocity *= 0.9;
    player.yVelocity *= 0.9;

    if (player.y > 386 - 16 - 64) {
        player.jumping = false;
        player.y = 386 - 16 - 64;
        player.yVelocity = 0;
    }

    if (player.x < -20) {
        player.x = 1220

    } else if (player.x > 1220) {
        player.x = -20
        nextFrame()
    }

    // Backdrop solid color
    // context.fillStyle = "#333333"
    // context.fillRect(0, 0, 1220, 400)

    // Linear Gradient Background
    const gradient = context.createLinearGradient(0, 500, 0, 0)
    gradient.addColorStop(0, "blue")
    gradient.addColorStop(1, "aqua")
    context.fillStyle = gradient
    context.fillRect(0, 0, 1220, 400)

    // Player
    // context.fillStyle = "#8DAA9D"; // hex for cube color
    // context.beginPath();
    // context.rect(player.x, player.y, player.width, player.height);
    // // context.rect(player.x, player.y, head.height, body.width)
    // context.fill();

    // Skater
    context.drawImage(skaterImg, player.x, player.y, player.width, player.height)
    context.beginPath();
    context.rect(skaterImg, 0, 0, player.width, player.height);

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
    context.strokeStyle = "grey"
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