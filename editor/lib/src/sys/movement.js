const goTo = function(object, vector){
	
	return new Promise(function(resolve, reject){

		const centerVector = [app.screen.width / 2, app.screen.height / 2];

		object.x = centerVector[0] + vector[0];

		object.y = centerVector[1] + vector[1]

		resolve(true)
	
	});
	
}

const move = function(object, steps){

	return new Promise(async function(resolve, reject){
		
		const rotationDegrees = object.rotation / (Math.PI * 1/360 * 2);

		const centerVector = [app.screen.width / 2, app.screen.height / 2]


		await sysgoto(object, [((object.x - centerVector[0]) + (Math.cos(rotationDegrees * Math.PI / 180) * steps)), ((object.y - centerVector[1]) + (Math.sin(rotationDegrees * Math.PI / 180) * steps))])

		resolve(true)
	
	})

}

const turnRight = function(object, degrees){

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

const turnLeft = function(object, degrees){

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

const pointInDirection = function(object, degrees){
	return new Promise(function(resolve, reject){

		object.rotation = Math.PI * (degrees - 90)/360 * 2;
		resolve(true)

	});

}


//The function below doesnt work yet

const pointTowards = function(object, vector){
	
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

export {goTo, move, turnRight, turnLeft, pointInDirection, pointTowards }