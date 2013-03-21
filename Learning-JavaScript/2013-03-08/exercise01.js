//01a
function firstNumbers(n){
	var result = [];
	for(var i = 0; i <= n; i++)
		result.push(i);
	return result;
}

//01b
function evenOnly(n){
	var app = firstNumbers(n);
	var result = app.filter(function(item,index,array) {
		return ( (item % 2) == 0);
	})
	return result;
}

//01c
function doubleEven(n){
	var app = evenOnly(n);
	var result = app.map(function(item,index,array){
		return (item * 2);
	})
	return result;
}

//01d
function divisibleByFour(n){
	var app = doubleEven(n);
	var result = app.filter(function(item,index,array){
		return ( (item % 4) == 0);
	})
	return result;
}

//01e
function sumRemaining(n){
	var app = divisibleByFour(n);
	var result = app.reduce(function(prev,cur,index,array){
		return prev + cur;
	})
	return result;
}