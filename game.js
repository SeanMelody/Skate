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

    keyListner: function (event) {

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