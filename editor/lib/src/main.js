/*
How I plan for it to work.

CODE IS DIVIDED IN BLOCKS

BLOCKS ARE ALL STORED IN A BLOCK-CONTAINER

CODE CAN REFER TO BLOCKS WITH ARGUMENTS

for example:

b1:
say("hi")
move(3)

b2:
say("hello")
move("2")

if (statement) b1 else b2

*/

/*
object => statement
can contain

function object

object.[whateverkey] = value <= asign a system variable

if value is a function object, asign system variable for callback procedure

so:

object.function = 
{
'blockid': 'blockid',
'callback': 'null',
'arguments': {
				'hello': 
				{
					'blockid':'blockid', 'callback':'Whatever system variable hello is',
					'arguments':
					{
					'yo': 'hey'
					}
	  			}
  			}
  }


*/

/*
function object
object.blockid = int
callbacksystemvariable = systemvariable

*/


const __if = function(object){
	/*
	if:
	object.type => if

	object.statement => ((function(function(hey)) + 1^3*function(e)) == 3)
	object.trueblock
	object.falseblock

	*/

	const statement = object.statement;



	let parsed = string.substring(0, 3).split(" ")
}

const __ifstatementparse = function(statement){
	//Pair brackets

	let pairedBrackets = [];

	for(i in statement){
		
		if(statement[i] === '(')
			
			for(i2 in statement){if(statement[statement.length - i2] == '')}

	}

}