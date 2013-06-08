var domain = DOMAIN([[0,9],[0,4.5],[0,30]])([30,20,1]);
var ceruleo = [0,0.482352941,0.654901961];
var brown = [0.325490196,0.105882353,0];
var green = [0,1,0];

//Global variables to assing the coordinates of the lake
var lakeTraslationX;
var lakeTraslationY;

//Array containg tree objects
var treeArray = [];

//Create a terrain with number of trees and density value in a certain zone
var terrainCreator = function (treeNumber,density) {
  
  var lakeTraslationFound = false;

  return function (v) {
    var x = v[0];
    var y = v[1];
    var z = Math.abs((SIN(v[0])*Math.random())*(COS(v[1])*Math.random()));
    
    //If mountain slope is under a threshold then think of it as plain
    if(z < 0.1)
      z = 0;

  	//Create a forest in a mountain slope in function of density parameter and random criteria
  	if((z > 0.17) && (z < 0.35) && (treeNumber > 0) && (x > 0) && (y > 0)){
  		
  		for(var i = 0; i < density; i++){

  			var fuz = Math.random() * 0.2;

  			treeArray.push(T([0,1,2])([x+fuz,y+fuz,z-fuz-0.035])(tree(6,0.4,5,1,24)));
  			treeArray.push(T([0,1,2])([x-fuz,y-fuz,z-fuz-0.035])(tree(6,0.4,5,1,24)));

  		}
  		
  		treeNumber--;
  	}

  	//Lake positioning 
    if(!lakeTraslationFound && (x > 1) && (y > 1) && (z === 0)) {
      lakeTraslationX = x;
      lakeTraslationY = y;
      lakeTraslationFound = true;
    }

    return [x,y,z];
  };
};

//Create a tree
function tree(hCyl,rCyl,hCon,rCon,slice){
	var trunk = COLOR([0,0,0])(EXTRUDE([hCyl])(DISK(rCyl)(32)));
	var domain = DOMAIN([[0,1],[0,2*PI]])([1,slice]);
	var profile = BEZIER(S0)([[0,0,hCon],[rCon,0,0]]);
	var mapping = ROTATIONAL_SURFACE(profile);
	var conoA = MAP(mapping)(domain);
	var conoB = DISK([rCon])(slice);
	var cono = COLOR(green)(T([2])([hCyl])(STRUCT([conoA,conoB])));
	var tree = S([0,1,2])([0.02,0.02,0.02])(STRUCT([trunk,cono]));
	return tree;
}

var base = COLOR(brown)(T([2])([-1.001])(CUBOID([9,4.5,1])));

//changing these parameters increase or decrease the number of trees and density (increasing may take longer)
// first parameter: number of slopes to fill
// second parameter: tree density in the slope 
var mapping = terrainCreator(7,2); 
var model = COLOR(brown)(MAP(mapping)(domain));

var lake = T([0,1])([lakeTraslationX,lakeTraslationY])(COLOR(ceruleo)(CUBOID([2,1,0.01])));
var forest = STRUCT(treeArray);

var terrain = STRUCT([base,model,lake,forest]);
DRAW(terrain);



