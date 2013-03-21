function fibonacci(i){
	fibonacci[0] = 0;
	fibonacci[1] = 1;
	if(i in fibonacci)
		return fibonacci[i];
	else{
		fibonacci[i] = fibonacci(i-1) + fibonacci(i-2);
		return fibonacci[i];
	}
}