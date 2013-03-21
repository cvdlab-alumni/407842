//02a
function randomNumbers(n){
	var result = [];
	for(var i = 0; i < n; i++){
		result.push(Math.round(Math.random()*100));
	}
	return result;
}

//02b
function oddOnly(n){
	var app = randomNumbers(n);
	var result = app.filter(function(item,index,array){
		return ( (item % 2) === 1 );
	})
	return result;
}

//02c
function oddSort(n){
	var app = oddOnly(n);
	var compare = function(value1, value2){
		return value1 - value2;
	}
	var result = app.sort(compare);
	return result;
}
