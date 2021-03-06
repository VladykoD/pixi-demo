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


    //preload
    app.loader.baseUrl = 'images';
    app.loader
    .add('sprite01', 'bloat01.png')
    .add('sprite02', 'bloat02.png')
    .add('sprite03', 'bloat03.png')
    .add('sprite04', 'bloat04.png')
    .add('sprite05', 'bloat05.png')
    .add('sprite06', 'bloat06.png')
    .add('sprite07', 'bloat07.png')
    .add('sprite08', 'bloat08.png')
    .add('sprite09', 'bloat09.png')
    .add('sprite10', 'bloat10.png')
    .add('sprite11', 'bloat11.png')
    .add('player', 'player.png')

    app.loader.onProgress.add(showProgress)
    app.loader.onComplete.add(doneLoading)
    app.loader.onError.add(reportError)

    app.loader.load()
}

function showProgress(e) {
    console.log(e.progress)
}

function reportError(e) {
    console.error('ERROR: ' + e.message)
}

function doneLoading() {
    console.log("DONE!")
}
