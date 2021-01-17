let app;
let character;
let pointerIsDown = false;
let pointerIsOver = false;

window.onload = function () {
    app = new PIXI.Application(
        {
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xaaaaaa
        }
    )

    document.body.appendChild(app.view)
    app.loader.baseUrl = "./images/"
    app.loader
    .add('calm', 'girl-calm.png')
    .add('curious', 'girl-curious.png')
    .add('angry', 'girl-angry.png')
    app.loader.onComplete.add(doneLoading)
    app.loader.load();

    app.ticker.add(gameLoop)
}

function gameLoop(delta) {

}

function doneLoading() {
    character = new PIXI.Sprite.from(app.loader.resources['calm'].texture)
    character.anchor.set(0.5);
    character.x = app.view.width / 2
    character.y = app.view.height / 2

    character.interactive = true
    character.buttonMode = true

    character.on('pointerup', doPointerUp)
    character.on('pointerupoutside', doPointerUpOutside)
    character.on('pointerdown', doPointerDown)
    character.on('pointerover', doPointerOver)
    character.on('pointerout', doPointerOut)

    app.stage.addChild(character)
}

function doPointerUp() {
    if (pointerIsOver) {
        character.texture = app.loader.resources['curious'].texture
    } else {
        character.texture = app.loader.resources['calm'].texture
    }
    pointerIsDown = false;
}

function doPointerUpOutside() {
    character.texture = app.loader.resources['calm'].texture
    pointerIsOver = false
    pointerIsDown = false
}

function doPointerDown() {
    pointerIsDown = true;
    character.texture = app.loader.resources['angry'].texture
}

function doPointerOver() {
    pointerIsOver = true
    character.texture = app.loader.resources['curious'].texture
}

function doPointerOut() {
    if(!pointerIsDown) {
        character.texture = app.loader.resources['calm'].texture
        pointerIsDown = false;
    }
}
