//Create a single shelf gived x,y,z
function shelf(x,y,z){

	var bottom = CUBOID([x,y,z]);
	var up = T([2])([x])(bottom);
	var side1 = CUBOID([z,z,x]);
	var side2 = T([0])([x-z])(side1);
	var side3 = T([1])([x-z])(side1);
	var side4 = T([0,1])([x-z,x-z])(side1);
	var shelf = STRUCT([bottom,up,side1,side2,side3,side4]);

	return shelf;
	};

//Create shades of gray
function setColor(){

	var colorsArray = [];
	for (var i = 0; i < 15; i++) {
		color = [16 * i / 255, 16 * i / 255, 16 * i / 255];
		colorsArray.push(color);
	};
	return colorsArray;
};


var colors = setColor();

var shelf0  = COLOR(colors[0])(shelf(3,3,0.1));
var shelf1  = COLOR(colors[1])(T([0,1,2])([2.9,0.1,0.6])(shelf(2.8,2.8,0.1)));
var shelf2  = COLOR(colors[2])(T([0,1,2])([2.8*2,0.15,3.2])(shelf(2.7,2.7,0.1)));
var shelf3  = COLOR(colors[3])(T([0,1,2])([2.8*2+0.6,0.2,5.9])(shelf(2.6,2.6,0.101)));
var shelf4  = COLOR(colors[4])(T([0,1,2])([2.8*2+0.3,0.25,8.5])(shelf(2.5,2.5,0.102)));
var shelf5  = COLOR(colors[5])(T([0,1,2])([2.8*2-1.2,0.3,11])(shelf(2.4,2.4,0.103)));
var shelf6  = COLOR(colors[6])(T([0,1,2])([2.2,0.35,12.5])(shelf(2.3,2.3,0.1)));
var shelf7  = COLOR(colors[7])(T([0,1,2])([0.1,0.4,12.8])(shelf(2.2,2.2,0.1)));
var shelf8  = COLOR(colors[8])(T([0,1,2])([-1.9,0.45,12.1])(shelf(2.1,2.1,0.1)));
var shelf9  = COLOR(colors[9])(T([0,1,2])([-3.8,0.5,10.3])(shelf(2,2,0.104)));
var shelf10 = COLOR(colors[10])(T([0,1,2])([-4.5,0.55,8.4])(shelf(1.9,1.9,0.103)));
var shelf11 = COLOR(colors[11])(T([0,1,2])([-4.45,0.6,6.6])(shelf(1.8,1.8,0.102)));
var shelf12 = COLOR(colors[12])(T([0,1,2])([-3.8,0.65,4.9])(shelf(1.7,1.7,0.101)));
var shelf13 = COLOR(colors[13])(T([0,1,2])([-2.6,0.7,3.3])(shelf(1.6,1.6,0.1)));
var shelf14 = COLOR(colors[14])(T([0,1,2])([-1.1,0.75,3])(shelf(1.5,1.5,0.101)));

var base = COLOR([0.1,0.1,0.1])(T([0,2])([-6,-0.1])(CUBOID([16,3,0.1])));

var shelf = STRUCT([shelf0,shelf1,shelf2,shelf3,shelf4,shelf5,shelf6,shelf7,shelf8,shelf9,shelf10,shelf11,shelf12,shelf13,shelf14,base]);
DRAW(shelf);