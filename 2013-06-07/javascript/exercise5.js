var domain = DOMAIN([[0,9],[0,4.5],[0,30]])([30,20,1]);
var ceruleo = [0,0.482352941,0.654901961];
var brown = [0.325490196,0.105882353,0];
var green = [0,1,0];

//Global variables to assing the coordinates of the lake
var lakeTraslationX;
var lakeTraslationY;

//Array containg tree objects
var treeArray = [];

//Array containg Settlement objects
var humanSettlementArray = [];

//Create a terrain with number of trees and density value in a certain zone and insert settlements
var terrainCreator = function (treeNumber,density,settlementNumber) {
  
  var lakeTraslationFound = false;

  return function (v) {
    var x = v[0];
    var y = v[1];
    var z = Math.abs((SIN(v[0])*Math.random())*(COS(v[1])*Math.random()));
    
    //If mountain slope is under a threshold then think of it as plain
    if(z < 0.15)
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

    //Settlement positioning
    if(lakeTraslationFound && (x > lakeTraslationX) && (y > lakeTraslationY) && (z == 0)){
      for(var i = 0; i < settlementNumber; i++){
        createSettlement(x+lakeTraslationX+2.9,y);
        settlementNumber--;
      }
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

//Create a house
function createHouse(x,y,z){

  var base = COLOR([1,1,1])(CUBOID([x,y,z]));
  var roof = T([0,1,2])([-0.005,-0.005,z])((COLOR([1,0,0])(CUBOID([x+0.01,y+0.01,0.03]))));
  var house = STRUCT([base,roof]);
  return house;
}

//Create the streets around the house
function createStreet(x,y,z){
  var base = COLOR([0,0,0])(CUBOID([x,y,z]));
  if(x > y){
    
    var stripes = T([1])([0.05])(COLOR([1,1,1])(CUBOID([x,y/15,z+0.0008])));
  }
  
  else var stripes = T([0])([0.06])(COLOR([1,1,1])(CUBOID([x/15,y,z+0.0008])));
  
  var street = STRUCT([base,stripes]);
  return street;

}

//Create a human settlemets gived it's position (randomically assegned considering the terrain level)
function createSettlement(x,y){

  var houseModel1 = createHouse(0.12,0.17,0.13);
  var houseModel2 = createHouse(0.12,0.17,0.13);
  var house1 = T([0,1])([x,y])(houseModel1);
  var house2 = T([0,1])([x,y+0.3])(houseModel2);

  var streetFrontModel = createStreet(0.3,0.12,0.005); 
  var streetLeftModel = createStreet(0.12,0.6,0.005); 
  var streetFront = T([0,1])([x-0.12,y+0.17])(streetFrontModel);
  var streetLeft = T([0,1])([x-0.15,y-0.07])(streetLeftModel);

  humanSettlementArray.push(house1);
  humanSettlementArray.push(house2);

  humanSettlementArray.push(streetFront);
  humanSettlementArray.push(streetLeft);
}

//adding a second instance of settlement
createSettlement(3.5,1.4);

var base = COLOR(brown)(T([2])([-1.001])(CUBOID([9,4.5,1])));

//changing these parameters increase or decrease the number of trees and settlements
// first parameter: number of slopes to fill
// second parameter: tree density in the slope 
// third parameter: settlements density
var mapping = terrainCreator(5,2,4); 
var model = COLOR(brown)(MAP(mapping)(domain));

var lake = T([0,1])([lakeTraslationX,lakeTraslationY])(COLOR(ceruleo)(CUBOID([2,1,0.01])));
var forest = STRUCT(treeArray);
var humanSettlements = STRUCT(humanSettlementArray);

var terrain = STRUCT([base,model,lake,forest,humanSettlements]);
DRAW(terrain);



