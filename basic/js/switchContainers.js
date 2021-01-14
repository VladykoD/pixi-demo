let app;
let titleScreen;
let mainScreen;
let endScreen;

window.onload = function () {
    app = new PIXI.Application(
        {
            width: window.innerWidth / 3 * 2,
            height: window.innerHeight / 3 * 2,
            backgroundColor: 0xaaaaaa
        }
    )

    document.body.appendChild(app.view)

    window.addEventListener('keyup', switchContainer);

    //create our screens
    titleScreen = new PIXI.Container()
    mainScreen = new PIXI.Container()
    endScreen = new PIXI.Container()

    mainScreen.visible = false
    endScreen.visible = false

    app.stage.addChild(titleScreen);
    app.stage.addChild(mainScreen);
    app.stage.addChild(endScreen);

    // setup title screen
    let redRect = new PIXI.Graphics
    redRect.beginFill(0xff0000)
    redRect.drawRect(0,0,app.view.width, app.view.height)
    titleScreen.addChild(redRect)

    let text1 = new PIXI.Text('Title screen')
    text1.anchor.set(0.5)
    text1.x = app.view.width / 2
    text1.y = app.view.height / 2
    text1.style = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 40,
        fontFamily: 'sans-serif',
        stroke: 0xffffff,
        strokeThickness: 4
    });
    titleScreen.addChild(text1)

    //setup main screen
    let greenRect = new PIXI.Graphics
    greenRect.beginFill(0x00ff00)
    greenRect.drawRect(0,0,app.view.width, app.view.height)
    mainScreen.addChild(greenRect)

    //setup end screen
    let blueRect = new PIXI.Graphics
    blueRect.beginFill(0x0000ff)
    blueRect.drawRect(0,0,app.view.width, app.view.height)
    endScreen.addChild(blueRect)


}

function switchContainer(e) {
    switch (e.key) {
        case "1":
            titleScreen.visible = true
            mainScreen.visible = false
            endScreen.visible = false
            break;
        case "2":
            titleScreen.visible = false
            mainScreen.visible = true
            endScreen.visible = false
            break;
        case "3":
            titleScreen.visible = false
            mainScreen.visible = false
            endScreen.visible = true
            break;
    }
}
