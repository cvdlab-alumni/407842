var domain = DOMAIN([[0,9],[0,4.5],[0,30]])([25,15,1]);
var brown = [0.325490196,0.105882353,0];

//Create a terrain with random mountains height 
var terrainCreator = function () {
  return function (v) {
    var x = v[0];
    var y = v[1];
    var z = Math.abs((SIN(v[0])*Math.random())*(COS(v[1])*Math.random()));
    
    //If mountain slope is under a threshold then think of it as plain
    if(z < 0.15)
      z = 0;
    return [x,y,z];
  };
};

var mapping = terrainCreator();
var model = COLOR(brown)(MAP(mapping)(domain));
var base = COLOR(brown)(T([2])([-1.001])(CUBOID([9,4.5,1])));

var terrain = STRUCT([model,base]);
DRAW(terrain);