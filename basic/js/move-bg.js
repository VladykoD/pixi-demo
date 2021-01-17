let app;
let bgBack, bgMiddle, bgFront;
let bgX = 0;
let bgSpeed = 1;
let width, height;

window.onload = function () {
    width = window.innerWidth
    height = window.innerHeight

    app = new PIXI.Application(
        {
            width: width,
            height: height,
            backgroundColor: 0xaaaaaa
        }
    )

    document.body.appendChild(app.view)

    app.loader.baseUrl = './images/'
    app.loader
    .add('bgBack', 'bg0.png')
    .add('bgMiddle', 'bg1.png')
    .add('bgFront', 'bg2.png')
    app.loader.onComplete.add(initLevel);
    app.loader.load();
}

function gameLoop(delta) {
    updateBg();
}

function initLevel() {
    bgBack = createBg(app.loader.resources["bgBack"].texture)
    bgMiddle = createBg(app.loader.resources["bgMiddle"].texture)
    bgFront = createBg(app.loader.resources["bgFront"].texture)

    document.addEventListener('keyup', switchDir)

    app.ticker.add(gameLoop)
}

function createBg(texture) {
    let tiling = new PIXI.TilingSprite(texture, width, height)
    tiling.position.set(0, 0);
    app.stage.addChild(tiling)

    return tiling
}

function updateBg() {
    bgX = (bgX + bgSpeed);
    bgFront.tilePosition.x = bgX
    bgMiddle.tilePosition.x = bgX / 2
    bgBack.tilePosition.x = bgX / 4
}

function switchDir(e) {
    switch (e.keyCode) {
        case 37:
        case 65:
            bgSpeed--
            break
        case 39:
        case 68:
            bgSpeed++
            break
        case 32:
            bgSpeed = 0
            break
    }
}
