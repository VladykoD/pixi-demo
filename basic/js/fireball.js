let app;
let player;
let bullets = [];
const bulletSpeed = 10;

window.onload = function () {
    app = new PIXI.Application(
        {
            width: window.innerWidth ,
            height: window.innerHeight ,
            backgroundColor: 0xaaaaaa
        }
    )

    document.body.appendChild(app.view)

    app.stage.interactive = true;

    const gameDiv = document.getElementById('gameDiv');
    gameDiv.appendChild(app.view)
    gameDiv.addEventListener('pointerdown', fireBullet)


    //player
    player = new PIXI.Sprite.from('./images/player.png')
    player.anchor.set(0.5)
    player.x = app.view.width / 2
    player.y = app.view.height /2

    app.stage.addChild(player);

    app.ticker.add(gameLoop)
}

function fireBullet(e) {
    console.log('fire')

    let bullet = createBullet();
    bullets.push(bullet)
}

function createBullet() {
    let bullet = new PIXI.Sprite.from('./images/bullet.png')
    bullet.anchor.set(0.5);
    bullet.x = player.x;
    bullet.y = player.y;
    bullet.speed = bulletSpeed;
    app.stage.addChild(bullet)

    return bullet;
}

function gameLoop(delta){
    updateBullets(delta);
}

function updateBullets(delta) {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].position.y -= bullets[i].speed;

        if (bullets[i].position.y < 0) {
            bullets[i].dead = true
        }
    }

    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i].dead) {
            app.stage.removeChild(bullets[i]);
            bullets.splice(i, 1)
        }
    }
}
