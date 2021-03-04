const canvas = document.querySelector('#canvas1');

const ctx = canvas.getContext('2d')

canvas.height = 800;
canvas.width = 600;

const keys = []

const player = {
    x: 200,
    y: 200,
    width: 40,
    height: 72,
    frameX: 1,
    frameY: 0,
    speed: 9,
    moving: false
}

const playerSprite = new Image();
playerSprite.src = "./assets/images/chewie.png"
const background = new Image();
background.src = "./assets/images/background.png"

// draw
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}
function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) player.frameX++
    else player.frameX = 0
}

// function animate() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
//     drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height * 2)
//     movePlayer()
//     handlePlayerFrame()
//     requestAnimationFrame(animate)
// }

// animate()

let fps, fpsInterval, startTime, now, then, elasped;
function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now()
    startTime = then
    animate()
}
function animate() {
    requestAnimationFrame(animate)
    now = Date.now()
    elasped = now - then;
    // console.log(now, then, elasped, fpsInterval);
    if (elasped > fpsInterval) {
        then = now - (elasped % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height * 2)
        movePlayer()
        handlePlayerFrame()
    }
}

startAnimating(15)
// events
window.addEventListener('keydown', (e) => {
    keys[e.keyCode] = true
    player.moving = true
})
window.addEventListener('keyup', (e) => {
    delete keys[e.keyCode]
    player.moving = false
})

// actions

function movePlayer() {
    if (keys[38] && player.y > 100) {
        player.y -= player.speed
        player.frameY = 3;
        player.moving = true;
    }
    if (keys[40] && player.y < canvas.height - player.height * 2) {
        player.y += player.speed
        player.frameY = 0;
        player.moving = true;
    }
    if (keys[37] && player.x > 0) {
        player.x -= player.speed
        player.frameY = 1;
        player.moving = true;
    }
    if (keys[39] && player.x < canvas.width - player.width) {
        player.x += player.speed
        player.frameY = 2;
        player.moving = true;
    }
}



