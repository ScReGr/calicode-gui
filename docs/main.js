const fmax = function(max, value){
	return Math.abs((Math.abs(max - value) + (max - value))/2 - max)
}

const fmin = function(min, value){
	return (Math.abs(value - min) + (value - min))/2 + min;
}


const hexToRgb = function(val){

	return {"red": `0x${val[0]+val[1]}`*1, "green": `0x${val[2]+val[3]}`*1, "blue": `0x${val[4]+val[5]}`*1}

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


const rgb = function(object, val){
	object.effects.color = val;
	let finalValue = (val * 6)+255;

	let red = fmin(255, fmax(510 , 765 - Math.abs((finalValue + 510) % (2*765) - 765)))-255
	let green = fmin(255, fmax(510 , 765 - Math.abs(finalValue % (2*765) - 765)))-255
	let blue = fmin(255, fmax(510 , 765 - Math.abs((finalValue - 510) % (2*765) - 765)))-255

	return fullColorHex(red, green, blue)
	//return console.log(`R: ${r_}, G: ${g_}, B:${b_}`)

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

const colorEffect = function(object){
	return object.effects.color;

}

const setSize = function(object, percentage){
	object.scale.set(percentage/100, percentage/100)

}
const changeSizeBy = function(object, percentage){
	object.scale.set(object.scale.x + percentage/100, object.scale.y + percentage/100)

}

//EFFECTS USE CALICODE SPRITE OBJECT, NOT PIXIJS SPRITE OBJECT

const setEffect = function(object, effect, value){
	switch (effect){

		case "color":


			object.renderSprite.tint = "0x" + rgb(object, value);
			break;
	}
}

const changeEffectBy = function(object, effect, value){
	switch (effect){
		case "color":

			object.renderSprite.tint = '0x'+ (rgb(object, object.effects.color + 1))
			break;
	}
}

//Object assignment
const movement = {goTo, changeXBy, changeYBy, setXTo, setYTo, move, turnRight, turnLeft, pointInDirection, pointTowards, glide}
const transform = {setSize, changeSizeBy, setEffect, changeEffectBy}
const sensors = {mouse, colorEffect}
const sys = {movement, transform, sensors}



//renderer
var app = new PIXI.Application(560, 315, {backgroundColor : 0x1099bb});

document.getElementById("rendererContainer").appendChild(app.view);
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;



var bunny = {'renderSprite': PIXI.Sprite.fromImage('assets/bunny.png'), 'effects': {'color': 0}}

bunny.renderSprite.tint = 0x0000ff

bunny.renderSprite.anchor.set(0.5);
sys.transform.setSize(bunny.renderSprite, 50)


app.stage.addChild(bunny.renderSprite);

sys.movement.goTo(bunny.renderSprite, [0, 0])

sys.movement.pointInDirection(bunny.renderSprite, 90)


let i = 0;

app.ticker.add(function(delta) {
	
	i++;
    sys.movement.pointTowards(bunny.renderSprite, [sys.sensors.mouse().x, sys.sensors.mouse().y])
    sys.movement.move(bunny.renderSprite, 1)
    sys.transform.changeSizeBy(bunny.renderSprite, Math.sin(i/15)*10)
    

    
});
