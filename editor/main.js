var app = new PIXI.Application(640, 360, {backgroundColor : 0x1099bb});

document.getElementById("rendererContainer").appendChild(app.view);


var bunny = PIXI.Sprite.fromImage('assets/bunny.png')


bunny.anchor.set(0.5);


bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);


app.ticker.add(function(delta) {

    bunny.rotation += 0.1 * delta;
});
