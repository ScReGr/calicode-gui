var app = new PIXI.Application(640, 360, {backgroundColor : 0x1099bb});

document.getElementById("rendererContainer").appendChild(app.view);


var bunny = PIXI.Sprite.fromImage('assets/bunny.png')


bunny.anchor.set(0.5);


bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

bunny.rotation = Math.PI * (90 - 90)/360 * 2;;

app.ticker.add(function(delta) {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation

    systurnforward(bunny, 1)
    sysmove(bunny, 1)
});
//system functions
const sysgoto = function(object, vector){
	
	return new Promise(function(resolve, reject){

		const centerVector = [app.screen.width / 2, app.screen.height / 2];

		object.x = centerVector[0] + vector[0];

		object.y = centerVector[1] + vector[1]

		resolve(true)
	
	});
	
}

const sysmove = function(object, steps){

	return new Promise(async function(resolve, reject){
		
		const rotationDegrees = object.rotation / (Math.PI * 1/360 * 2);

		const centerVector = [app.screen.width / 2, app.screen.height / 2]


		await sysgoto(object, [((object.x - centerVector[0]) + (Math.cos(rotationDegrees * Math.PI / 180) * steps)), ((object.y - centerVector[1]) + (Math.sin(rotationDegrees * Math.PI / 180) * steps))])

		resolve(true)
	
	})

}

const systurnforward = function(object, degrees){

	return new Promise(function(resolve, reject){

		const rotationDegrees = object.rotation / (Math.PI * 1/360 * 2) + 90;

		if(rotationDegrees + degrees > 450){
			

			object.rotation = Math.PI * (((rotationDegrees + degrees) - 450))/360 * 2;

			resolve(true);
		
		}else{

			object.rotation += Math.PI * degrees/360 * 2;

			resolve(true);

			

		}
	})

}

const systurnbackward = function(object, degrees){

	return new Promise(function(resolve, reject){

		const rotationDegrees = object.rotation / (Math.PI * 1/360 * 2) + 90;

		if(rotationDegrees - degrees < 0){
			

			object.rotation = Math.PI * (270 - (degrees - rotationDegrees))/360 * 2;

			resolve(true);
		
		}else{

			object.rotation -= Math.PI * degrees/360 * 2;

			resolve(true);

		}
	})
}

const syspointindirection = function(object, degrees){
	return new Promise(function(resolve, reject){

		object.rotation = Math.PI * (degrees - 90)/360 * 2;
		resolve(true)

	});

}


//The function below doesnt work yet

const syspointtowards = function(object, vector){
	
	return new Promise(async function(resolve, reject){

		const rotationDegrees = object.rotation / (Math.PI * 1/360 * 2);

		const centerVector = [app.screen.width / 2, app.screen.height / 2]


		const deltax = vector[0] - (object.x - centerVector[0])
		const deltay = vector[1] - (object.y - centerVector[1])

		if(deltay == 0){
			if(deltax < 0){

				await syspointindirection(object, 270)
			}else{

				await syspointindirection(object, 90)
			}

		}else{

			if(deltay < 0){

				await syspointindirection(180 + (Math.atan()))
			}else{
				
				await syspointindirection(object, 90)
			}
		}



	})
}