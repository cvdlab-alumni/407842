riga = "";

for (var i = 1; i < 11; i++){
	for (var j = 1; j < 11; j++){
		
		if ( j !== 10 ){ riga += i*j + "," + "\t"; }
		else { riga += i*j + "\t"; }
		

	}
	console.log(riga);
	riga = "";
}