let app;
let player;
let keys = {};
let keysDiv;
let playerSheet = {};
let speed = 2

window.onload = function () {
    app = new PIXI.Application(
        {
            width: window.innerWidth / 3 * 2,
            height: window.innerHeight / 3 * 2,
            backgroundColor: 0xf8f8f8
        }
    )

    document.body.appendChild(app.view)

    app.loader.add("girl", "images/sprite.png")
    app.loader.load(doneLoading)


    //keyboard
    window.addEventListener('keydown', keysDown)
    window.addEventListener('keyup', keysUp)

    keysDiv = document.querySelector('#keys');
}

function doneLoading() {
    createPlayerSheet();
    createPlayer();

    app.ticker.add(gameLoop)
}

function createPlayerSheet() {
    let ssheet = new PIXI.BaseTexture.from(app.loader.resources["girl"].url);
    let w = 101
    let h = 99


    playerSheet["standEast"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 , w, h))
    ]
    playerSheet["standWest"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 0 , w, h))
    ]

    playerSheet["standSouth"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(8 * w, 0 , w, h))
    ]
    playerSheet["standNorth"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(12 * w, 0 , w, h))
    ]

    playerSheet["walkEast"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 0, w, h)),
    ]
    playerSheet["walkWest"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(7 * w, 0, w, h)),
    ]

    playerSheet["walkSouth"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(9 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(10 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(11 * w, 0, w, h)),
    ]
    playerSheet["walkNorth"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(13 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(14 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(15 * w, 0, w, h)),
    ]
}

function createPlayer() {
    player = new PIXI.AnimatedSprite(playerSheet.standSouth)
    player.anchor.set(0.5);
    player.animationSpeed = .5;
    player.loop = false;
    player.x = app.view.width / 2
    player.y = app.view.height / 2
    app.stage.addChild(player)
    player.play()
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

    if (keys["87"] || keys["38"]) {
        if(!player.playing) {
            player.textures = playerSheet.walkNorth
            player.play()
        }
        player.y -= speed;
    }
    if (keys["65"] || keys["37"]) {
        if(!player.playing) {
            player.textures = playerSheet.walkWest
            player.play()
        }
        player.x -= speed;
    }
    if (keys["83"] || keys["40"]) {
        if(!player.playing) {
            player.textures = playerSheet.walkSouth
            player.play()
        }
        player.y += speed;
    }
    if (keys["68"] || keys["39"]) {
        if(!player.playing) {
            player.textures = playerSheet.walkEast
            player.play()
        }
        player.x += speed;
    }
}
