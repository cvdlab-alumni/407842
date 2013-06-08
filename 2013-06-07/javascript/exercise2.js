var domain = DOMAIN([[0,9],[0,4.5],[0,30]])([30,20,1]);
var ceruleo = [0,0.482352941,0.654901961];
var brown = [0.325490196,0.105882353,0];

//Global variables to assing the coordinates of the lake
var lakeTraslationX;
var lakeTraslationY;

//Create a terrain with random mountains height 
var terrainCreator = function () {
  var lakeTraslationFound = false;
  return function (v) {
    var x = v[0];
    var y = v[1];
    var z = Math.abs((SIN(v[0])*Math.random())*(COS(v[1])*Math.random()));
    
    //If mountain slope is under a threshold then think of it as plain
    if(z < 0.1)
      z = 0;

    //Lake positioning
    if(!lakeTraslationFound && (x > 1) && (y > 1) && (z === 0)) {
      lakeTraslationX = x;
      lakeTraslationY = y;
      lakeTraslationFound = true;
    }

    return [x,y,z];
  };
};

var mapping = terrainCreator();
var model = COLOR(brown)(MAP(mapping)(domain));
var base = COLOR(brown)(T([2])([-1.001])(CUBOID([9,4.5,1])));

var lake = T([0,1])([lakeTraslationX,lakeTraslationY])(COLOR(ceruleo)(CUBOID([2,1,0.01])));

var terrain = STRUCT([model,lake,base]);
DRAW(terrain);