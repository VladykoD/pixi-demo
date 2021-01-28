(() => {
   let app = new PIXI.Application(window.innerWidth, window.innerHeight);
   document.body.appendChild(app.view)

   const filterPath = 'img/ripple.png'

   app.stage.interactive = true;
   let posX,posY,displacementSprite, displacementFilter, bg, vx, vy;
   let container = new PIXI.Container();
   app.stage.addChild(container);

   PIXI.loader.add(filterPath).add('img/bg.jpg').load(setup)


   function setup() {
      posX = app.renderer.width / 2;
      posY = app.renderer.height / 2;
      displacementSprite = new PIXI.Sprite(PIXI.loader.resources['' +
         filterPath].texture);
      displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
      displacementSprite.anchor.set(0.5);
      displacementSprite.x = app.renderer.width / 2;
      displacementSprite.y = app.renderer.height / 2;
      vx = displacementSprite.x
      vy = displacementSprite.y

      app.stage.addChild(displacementSprite);
      container.filters = [displacementFilter];
      displacementFilter.scale.x = 0;
      displacementFilter.scale.y = 0;
      bg = new PIXI.Sprite(PIXI.loader.resources['img/bg.jpg'].texture)
      bg.width = app.renderer.width;
      bg.height = app.renderer.height;
      container.addChild(bg)
      app.stage.on('mousemove', onPointerMove).on('touchmove', onPointerMove)
      loop();
   }

   function onPointerMove(e) {
      posX = e.data.global.x;
      posY = e.data.global.y;
   }

   function loop() {
      requestAnimationFrame(loop)
      vx += (posX - displacementSprite.x) * 0.045;
      displacementSprite.x = vx;
      let disp = Math.floor(posX - displacementSprite.x)
      if (disp < 0) disp = -disp
      let fs = map(disp, 0, 500, 0, 120)
      disp = map(disp, 0, 500, 0.1, 0.6)
      displacementSprite.scale.x = disp;
      displacementFilter.scale.x = fs;


      vy += (posY - displacementSprite.y) * 0.025;
      displacementSprite.y = vy;
      let dispY = Math.floor(posY - displacementSprite.y)
      if (dispY < 0) dispY = -dispY
      let fsY = map(dispY, 0, 500, 0, 120)
      dispY = map(dispY, 0, 500, 0.1, 0.6)
      displacementSprite.scale.y = dispY;
      displacementFilter.scale.y = fsY;


   }

   map = function(n, start1, stop1, start2, stop2) {
      let newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
      return newval;
   };

})();
