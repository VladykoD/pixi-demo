let app;
let player;
let keys = {};
let keysDiv;

window.onload = function () {
    app = new PIXI.Application(
        {
            width: window.innerWidth / 3 * 2,
            height: window.innerHeight / 3 * 2,
            backgroundColor: 0xaaaaaa
        }
    )

    document.body.appendChild(app.view)


    //player
    player = new PIXI.Sprite.from('./images/player.png')
    player.anchor.set(0.5)
    player.x = app.view.width / 2
    player.y = app.view.height /2

    app.stage.addChild(player);

    //mouse
    app.stage.interactive = true;
    app.stage.on('pointermove',movePlayer)


    //keyboard
    window.addEventListener('keydown', keysDown)
    window.addEventListener('keyup', keysUp)

    app.ticker.add(gameLoop);

    keysDiv = document.querySelector('#keys');
}

//mouse
function movePlayer(e) {
    let pos = e.data.global;

    player.x = pos.x;
    player.y = pos.y;
}


//keyboard
function keysDown(e) {
    console.log(e.keyCode)
    keys[e.keyCode] = true
}
function keysUp(e) {
    keys[e.keyCode] = false
}

function gameLoop(){
    keysDiv.innerHTML = JSON.stringify(keys)

    if (keys["87"]) {
        player.y -= 5;
    }
    if (keys["65"]) {
        player.x -= 5;
    }
    if (keys["83"]) {
        player.y += 5;
    }
    if (keys["68"]) {
        player.x += 5;
    }
}
