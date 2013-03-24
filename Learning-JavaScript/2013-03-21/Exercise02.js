function Point2d (x,y){
	this.x = x;
	this.y = y;
}

function Edge(vertx1,vertx2){
	this.vertx1 = vertx1;
	this.vertx2 = vertx2;
}

Edge.prototype.length = function(point1, Point2) {
	Math.sqrt(Math.pow( (point2.x - Point1.x), 2) + Math.pow( (point2.y - Point1.y), 2)) 
}