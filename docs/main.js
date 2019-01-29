const hexToRgb = function(val){

	return {"red": `0x${val[0]+val[1]}`*1, "green": `0x${val[2]+val[3]}`*1, "blue": `0x${val[4]+val[5]}`*1}

}


const chrgb = function(hex, val){

	const colors = hexToRgb(hex);

	if(colors.blue == 0){
		
		if(colors.green == 0){

			if(colors.red == 0){

				return rgb(255 + val);

			}else{

				return rgb(340 - Math.abs(colors.red/3 - 85) + val)
			}

		}else{
			return rgb(85-Math.abs(colors.green/3 - 85) + val)

		}

	}else{

		if(colors.green == 0){
			return rgb(170+Math.abs(colors.blue/3 - 85) + val)

		}else{
			return rgb(170-Math.abs(colors.blue/3 - 85) + val)

		}

	}
}

var rgbToHex = function (rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

var fullColorHex = function(r,g,b) {   
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return red+green+blue;
};

const rgb = function(val){
	r_ = 510 - Math.abs((val*(255/85)+510) % (2*510) - 510) - 255;
	g_ = 510 - Math.abs((val*(255/85)+255) % (2*510) - 510) - 255;
	b_ = 510 - Math.abs(val*(255/85) % (2*510) - 510) - 255;

	return fullColorHex((Math.abs(r_) + r_)/2, (Math.abs(g_) + g_)/2, (Math.abs(b_) + b_)/2)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//system functions

const goTo = function(object, vector){
	return new Promise(function(resolve, reject){

		const centerVector = [app.screen.width / 2, app.screen.height / 2];

		object.x = centerVector[0] + vector[0];

		object.y = centerVector[1] + vector[1]*-1;

		resolve(true)
	
	});
	
}

const changeXBy = function(object, value){

	const centerVector = [app.screen.width / 2, app.screen.height / 2];

	return new Promise(function(resolve, reject){

		object.x += value;

		resolve(true)

	
	});
}

const changeYBy = function(object, value){

	const centerVector = [app.screen.width / 2, app.screen.height / 2];

	return new Promise(function(resolve, reject){

		object.y -= value;

		resolve(true)

	
	});
}

const setXTo = function(object, value){
	
	const centerVector = [app.screen.width / 2, app.screen.height / 2];

	return new Promise(function(resolve, reject){

		object.x = centerVector[0] + value;

	});
}

const setYTo = function(object, value){
	
	const centerVector = [app.screen.width / 2, app.screen.height / 2];

	return new Promise(function(resolve, reject){

		object.y = centerVector[1] + value*-1;

	});
}


const move = function(object, steps){

	return new Promise(async function(resolve, reject){
		
		const rotationDegrees = object.rotation / (Math.PI * 1/360 * 2);

		const centerVector = [app.screen.width / 2, app.screen.height / 2]


		await movement.goTo(object, [((object.x - centerVector[0]) + (Math.cos(rotationDegrees * Math.PI / 180) * steps)), ((object.y - centerVector[1]) + (Math.sin(rotationDegrees * Math.PI / 180) * steps))*-1])

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



const pointTowards = function(object, vector){
	
	return new Promise(async function(resolve, reject){

		const rotationDegrees = object.rotation / (Math.PI * 1/360 * 2);

		const centerVector = [app.screen.width / 2, app.screen.height / 2]

		const deltax = ((vector[0] + centerVector[0]) - object.x)
		
		const deltay = (((vector[1]*-1) + centerVector[1]) - object.y)

	    var angle = Math.atan2(deltay, deltax);

	    await pointInDirection(object, (angle * 180 / Math.PI) + 90)

	})
}

const glide = function(object, vector, time){

	return new Promise(async function(resolve, reject){

		const centerVector = [app.screen.width / 2, app.screen.height / 2]
		
		const deltax = (vector[0] - (object.x - centerVector[0])) / 60 / (time / 1000);
		
		const deltay = ((vector[1]) - (object.y - centerVector[1])) / 60 / (time / 1000);

		for (let i = 0; i < 60*(time/1000); i++){

			await sleep((1/60) * 1000);

			sys.movement.goTo(object, [(object.x - centerVector[0]) + deltax, (object.y - centerVector[1])*-1 + deltay])
		}

		resolve(true)
	})
}

const mouse = function(){
	
	const centerVector = [app.screen.width / 2, app.screen.height / 2]

	return {'x': app.renderer.plugins.interaction.mouse.global.x - centerVector[0], 'y': (app.renderer.plugins.interaction.mouse.global.y - centerVector[1])*-1}
}

const setSize = function(object, percentage){
	object.scale.set(percentage/100, percentage/100)

}
const changeSizeBy = function(object, percentage){
	object.scale.set(object.scale.x + percentage/100, object.scale.y + percentage/100)

}

const setEffect = function(object, effect, value){
	switch (effect){

		case "color":


			object.tint = "0x" + rgb(value);
			break;
	}
}

const changeEffectBy = function(object, effect, value){
	switch (effect){
		case "color":

			object.tint = '0x'+ chrgb(object.tint.toString().substring(2, 8), value);
			break;
	}
}

//Object assignment
const movement = {goTo, changeXBy, changeYBy, setXTo, setYTo, move, turnRight, turnLeft, pointInDirection, pointTowards, glide}
const transform = {setSize, changeSizeBy, setEffect, changeEffectBy}
const sensors = {mouse}
const sys = {movement, transform, sensors}



//renderer
var app = new PIXI.Application(560, 315, {backgroundColor : 0x1099bb});

document.getElementById("rendererContainer").appendChild(app.view);
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;



var bunny = PIXI.Sprite.fromImage('assets/bunny.png')


bunny.anchor.set(0.5);
sys.transform.setSize(bunny, 50)


app.stage.addChild(bunny);

sys.movement.goTo(bunny, [0, 0])

sys.movement.pointInDirection(90)


let i = 0;


app.ticker.add(function(delta) {
	
	i++;
    sys.movement.pointTowards(bunny, [sys.sensors.mouse().x, sys.sensors.mouse().y])
    sys.movement.move(bunny, 1)
    sys.transform.changeSizeBy(bunny, Math.sin(i/15)*10)
    sys.transform.changeEffectBy(bunny, 'color', 5)

    
});
