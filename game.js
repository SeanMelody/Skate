console.log("connected")

const context = document.querySelector("canvas").getContext("2d");
const level = document.querySelector(".level")
const healthDisplay = document.querySelector(".health")
let health = 100;

context.canvas.height = 250;
// width set to 1220 on the example height 400
context.canvas.width = 800;


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
        // Randomly generate the x coordinate for the top corner start of the rectangle
        obXCoor = Math.floor(Math.random() * (765 - 35 + 1) + 100);
        obXCoors.push(obXCoor);

    }

    // console.log(obXCoors)
    // collisionDetection()
}

// To determine if player hit an object
function collisionDetection() {
    // for (let i = 0; i < obXCoors.length; i++) {
    //     console.log(obXCoors[i])
    //     if (player.x === obXCoors) {
    //         console.log("hit")
    //     }
    // }
    // // console.log(player.x)
    // for (let i = 0; i < obXCoors.length; i++) {
    //     let objLoc = obXCoors[i]
    //     // console.log(obXCoors)
    //     // if (player.x == objLoc && player.jumping == false) {
    //     //     console.log("player hit a brick")
    //     // }
    //     let playerNoDecimal = Math.trunc(player.x)
    //     if (playerNoDecimal === objLoc && player.jumping === false) {
    //         console.log("player hit a brick")
    //     }

    // }

    if (health > 0) {

        // For loop to loop through the object locations, and if the player runs into one, deduct health
        for (let i = 0; i < obXCoors.length; i++) {
            let object = obXCoors[i];
            let playerNoDecimal = Math.trunc(player.x)
            // console.log(playerNoDecimal)
            if (playerNoDecimal == object && player.jumping === false) {
                // console.log("hit")
                health = health - 20
                healthDisplay.textContent = `Your Health: ${health}`
            }

        }
    } else {

        const gradient = context.createLinearGradient(0, 500, 0, 0)
        gradient.addColorStop(0, "black")
        gradient.addColorStop(1, "red")
        context.fillStyle = gradient
        context.fillRect(0, 0, 800, 250)

        context.font = "75px Arial";
        context.fillStyle = "white"
        // context.textAlign = "center"
        context.fillText("GAME OVER", 100, 150);


    }
    // console.log(obXCoors)

    // let playerNoDecimal = Math.trunc(player.x)
    // if (playerNoDecimal == obXCoors) {
    //     console.log("player hit a brick")
    // }

    // if (player.x == obXCoor) {
    //     console.log("hit")
    // }



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

    if (player.y > 243 - 16 - 64) {
        player.jumping = false;
        player.y = 243 - 16 - 64;
        player.yVelocity = 0;
    }

    if (player.x < -20) {
        player.x = 810

    } else if (player.x > 810) {
        player.x = -20
        nextFrame()
    }

    // collisionDetection()

    // Backdrop solid color
    // context.fillStyle = "#333333"
    // context.fillRect(0, 0, 1220, 400)

    // Linear Gradient Background
    const gradient = context.createLinearGradient(0, 500, 0, 0)
    gradient.addColorStop(0, "aqua")
    gradient.addColorStop(1, "yellow")
    context.fillStyle = gradient
    context.fillRect(0, 0, 800, 250)

    // Square
    // context.fillStyle = "#8DAA9D"; // hex for cube color
    // context.beginPath();
    // context.rect(square.x, square.y, square.width, square.height);
    // // context.rect(square.x, square.y, head.height, body.width)
    // context.fill();

    // Skater
    context.drawImage(skaterImg, player.x, player.y, player.width, player.height)
    context.beginPath();
    context.rect(skaterImg, 0, 0, player.width, player.height);

    // Obstacles
    const height = 200 * Math.cos(Math.PI / 6);
    // const width = 50
    context.fillStyle = "red"; // "#FBF5F3" hex for triangle color
    context.lineWidth = 3;
    context.strokeStyle = "black"
    obXCoors.forEach((obXCoor) => {
        context.beginPath();

        context.moveTo(obXCoor, 235); // x = random, y = coor. on "ground"
        // context.lineTo(obXCoor + 20, 235); // x = ^random + 20, y = coor. on "ground"
        // context.lineTo(obXCoor + 10, 350 - height); // x = ^random + 10, y = peak of triangle

        context.rect(obXCoor + 20, 190, 32, 32)

        context.closePath();
        context.fill();
        context.stroke()
    })

    // Ground
    context.strokeStyle = "grey"
    context.lineWidth = 30;
    context.beginPath()
    context.moveTo(0, 235)
    context.lineTo(800, 235)
    context.stroke()

    collisionDetection()

    window.requestAnimationFrame(loop)

}

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener)

window.requestAnimationFrame(loop)