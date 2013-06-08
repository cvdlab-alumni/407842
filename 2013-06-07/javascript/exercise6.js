//Export a Lar model into OBJ format

function exportLar(model){

	var v = model[0];
	var fv = model[1];
	var result = '';

	//Exporting Matrix V
	v.forEach(function(vertex){
		if(vertex[2] !== undefined)
			result += 'v ' + '[' + vertex[0] + ' ' + vertex[1] + ' '+  vertex[2] + ']' + '\n'; 
		else result += 'v ' + '[' + vertex[0] + ' ' + vertex[1] + ' 0'+ ']' + '\n';
	});

	//Exporting Matrix FV
	fv.forEach(function(vertexArray){
		var vertexIndex = vertexArray.length;
		result += 'fv [';
		vertexArray.forEach(function(vertex,index){
			if(vertexIndex-1 !== index)
				result += vertex + ' '; 
			else result += vertex + ']' + '\n';

		});
	});

	return result; 
}



//Example of use
v = [[0,6],
 	[0,0],
 	[3,0],
 	[6,0],
 	[0,3,5],
 	[3,3,4],
 	[6,3],
 	[6,6],
 	[3,6]];

fv = [[5,6,7,8],
	 [0,5,8],
	 [0,4,5],
	 [1,2,4,5],
	 [2,3,5,6],
	 [0,8,7],
	 [3,6,7],
	 [1,2,3],
	 [0,1,4]];

var larModel = [v,fv]; 
var r = exportLar(larModel);
console.log(r);