let app;
let player;

window.onload = function () {
    app = new PIXI.Application(
        {
            width: window.innerWidth / 3 * 2,
            height: window.innerHeight / 3 * 2,
            backgroundColor: 0xaaaaaa
        }
    )

    document.body.appendChild(app.view)
}
