riga = "";

for (var i = 0; i < 10; i++){
	for (var j = 0; j < 10; j++){

		if ( i !== j){
			riga += "0" + "\t";
		}
		else { riga += "1" + "\t" }
	}
console.log(riga);
riga = "";
}