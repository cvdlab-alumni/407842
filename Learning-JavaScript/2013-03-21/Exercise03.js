function Point2d(x,y){
	this.x = x;
	this.y = y;
}

function Edge(p1,p2){
	this.p1 = p1;
	this.p2 = p2;
}

Edge.prototype.length = function() {
	return Math.sqrt(Math.pow((this.p2.x - this.p1.x),2) + Math.pow((this.p2.y - this.p1.y), 2)); 
}

function Triangle(edge1,edge2,edge3){
	this.edge1 = edge1;
	this.edge2 = edge2;
	this.edge3 = edge3;
}

Triangle.prototype.perimeter = function() {
	var perimeter = this.edge1.length() + this.edge2.length() + this.edge3.length();
	return perimeter;
}

Triangle.prototype.euroneArea = function() {
	var semiperimeter = (this.edge1.length() + this.edge2.length() + this.edge3.length()) / 2;
	var area = Math.sqrt((semiperimeter * (semiperimeter - this.edge1.length()) * (semiperimeter - this.edge2.length()) * (semiperimeter - this.edge3.length()) ));
	return area;
}