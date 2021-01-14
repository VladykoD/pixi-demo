let app;
let r1, r2, r3;
const RECT_SIZE = 100;

const NORMAL = 0xffffff;
const OVER = 0x00ff00;
const DOWN = 0xff0000;
let pointerIsDown = false;
let pointerIsOver = false;

window.onload = function () {
    app = new PIXI.Application(
        {
            width: window.innerWidth / 3 * 2,
            height: window.innerHeight / 3 * 2,
            backgroundColor: 0xaaaaaa
        }
    )

    document.body.appendChild(app.view)

    r1 = createRect(50, 300, RECT_SIZE, RECT_SIZE, 'rect1', 20)
    r2 = createRect(200, 300, RECT_SIZE, RECT_SIZE, 'rect2', 40)
    r3 = createRect(350, 300, RECT_SIZE, RECT_SIZE, 'rect3', 60)

    app.stage.addChild(r1)
    app.stage.addChild(r2)
    app.stage.addChild(r3)

    app.ticker.add(gameLoop)
}

function createRect(x, y, w, h, name, speed) {
    let rect = new PIXI.Graphics()

    rect.beginFill(NORMAL);
    rect.drawRect(x, y, w, h)
    rect.endFill();
    rect.interactive = true;
    rect.buttonMode = true;

    rect.on('pointerup', doPointerUp)
    rect.on('pointerdown', doPoinerDown)
    rect.on('pointerover', doPoinerOver)
    rect.on('pointerout', doPoinerOut)
    rect.on('pointerupoutside', doPoinerUpOutside)

    rect.name = name;
    rect.speed = speed;

    return rect;
}

function doPointerUp(){
    if (pointerIsOver) {
        this.tint = OVER
        this.y = this.y - this.speed
    } else {
        this.tint = NORMAL
    }
    pointerIsDown = false
}
function doPoinerDown(){
    this.tint = DOWN
    pointerIsDown = true
}
function doPoinerOver(){
    if (!pointerIsOver) {
        this.tint = OVER
        pointerIsOver = true
    }
}
function doPoinerOut(){
    if (!pointerIsDown) {
        this.tint = NORMAL
        pointerIsOver = false
    }
}

function doPoinerUpOutside() {
    this.tint = NORMAL
    pointerIsOver = false
    pointerIsDown = false
}
