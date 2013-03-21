function identity(n) {
	riga = "";

for (var i = 0; i < n ; i++){
	for (var j = 0; j < n; j++){

		if ( i !== j){
			riga += "0" + "\t";
		}
		else { riga += "1" + "\t" }
	}
console.log(riga);
riga = "";
	}
}