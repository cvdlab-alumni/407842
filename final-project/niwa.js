//Domains
var dom2 = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(30)]);
var dom1 = INTERVALS(1)(20)


var mapping = function (v) {
	
	var a = v[0];
	var b = v[1];

	var u = SIN(a)*COS(b);
	var v = SIN(a)*SIN(b);
	var w = COS(a);

	return[u,v,w];
}

//Create an Hermite curve
function curveHermite(c1){
    
    return MAP(CUBIC_HERMITE(S0)(c1))(dom1);
};

//Create an Hermite surface
function supHermite(p1,p2,t1,t2){
    
    curva1 = CUBIC_HERMITE(S0)(p1);
    curva2 = CUBIC_HERMITE(S0)(p2);
    return MAP(CUBIC_HERMITE(S1)([curva1,curva2,t1,t2]))(dom2);
};

//Create a custom table gived height,weight and depth
function createTable(x,y,z){
	
	var pillar = CUBOID([0.3,0.3,z]);
	var pillar1 = T([0])([-x/2])(pillar);
	var pillar2 = T([0,1])([-x/2, y - 0.3])(pillar);
	var pillar3 = T([0])([(x/2) - 0.3])(pillar); 
	var pillar4 = T([0,1])([(x/2) - 0.3, y - 0.3])(pillar);

	var glassLine1 = [[-x/2,0,0],[-x/2,y,0],[0,0,0],[0,0,0]];
	var glassLine2 = [[x/2,0,0],[x/2,y,0],[0,0,0],[0,0,0]];
	var glassSurfaceUp = supHermite(glassLine1,glassLine2,[0,0,0],[0,0,0]);

	var glassLine1Down = [[-x/2,0,0.1],[-x/2,y,0.1],[0,0,0],[0,0,0]];
	var glassLine2Down = [[x/2,0,0.1],[x/2,y,0.1],[0,0,0],[0,0,0]];
	var glassSurfaceDown = supHermite(glassLine1Down,glassLine2Down,[0,0,0],[0,0,0]);

	var glassSideSurface1 = supHermite(glassLine1,glassLine1Down,[0,0,0],[0,0,0]);
	var glassSideSurface2 = supHermite(glassLine2,glassLine2Down,[0,0,0],[0,0,0]);

	var glassSideLine1Down = [[-x/2,0,0],[x/2,0,0],[0,0,0],[0,0,0]];
	var glassSideLine1Up = [[-x/2,0,0.1],[x/2,0,0.1],[0,0,0],[0,0,0]];
	var glassSideSurface3 = supHermite(glassSideLine1Up,glassSideLine1Down,[0,0,0],[0,0,0]);

	var glassSideLine2Down = [[-x/2,y,0],[x/2,y,0],[0,0,0],[0,0,0]];
	var glassSideLine2Up = [[-x/2,y,0.1],[x/2,y,0.1],[0,0,0],[0,0,0]];
	var glassSideSurface4 = supHermite(glassSideLine2Up,glassSideLine2Down,[0,0,0],[0,0,0]);

	var overlay = COLOR([0.254902,0.411765,1,0.4])(T([2])([z])(STRUCT([glassSurfaceUp,glassSurfaceDown])));
	var overlaySide =  COLOR([0.254902,0.411765,1,0.8])(T([2])([z])(STRUCT([glassSideSurface1,glassSideSurface2,glassSideSurface3,glassSideSurface4])));

	var baseLine1 = [[-4.7,0,0],[5,4.7,0],[0,0,0],[0,0,0]];
	var baseLine2 = [[-5,0.3,0],[4.7,5,0],[0,0,0],[0,0,0]];
	var baseSurface1 = supHermite(baseLine1,baseLine2,[0,0,0],[0,0,0]);

	var baseLine1Up = [[-4.7,0,0.3],[5,4.7,0.3],[0,0,0],[0,0,0]];
	var baseLine2Up = [[-5,0.3,0.3],[4.7,5,0.3],[0,0,0],[0,0,0]];
	var baseSurface2 = supHermite(baseLine1Up,baseLine2Up,[0,0,0],[0,0,0]);

	var baseSurface3 = supHermite(baseLine1,baseLine1Up,[0,0,0],[0,0,0]);
	var baseSurface4 = supHermite(baseLine2,baseLine2Up,[0,0,0],[0,0,0]);

	var baseLine3 = [[-4.7,5,0],[5,0.3,0],[0,0,0],[0,0,0]];
	var baseLine4 = [[-5,4.7,0],[4.7,0,0],[0,0,0],[0,0,0]];
	var baseSurface5 = supHermite(baseLine3,baseLine4,[0,0,0],[0,0,0]);

	var baseLine3Up = [[-4.7,5,0.3],[5,0.3,0.3],[0,0,0],[0,0,0]];
	var baseLine4Up = [[-5,4.7,0.3],[4.7,0,0.3],[0,0,0],[0,0,0]];
	var baseSurface6 = supHermite(baseLine3Up,baseLine4Up,[0,0,0],[0,0,0]);

	var baseSurface7 = supHermite(baseLine3,baseLine3Up,[0,0,0],[0,0,0]);
	var baseSurface8 = supHermite(baseLine4,baseLine4Up,[0,0,0],[0,0,0]);

	var base = COLOR([0.5,0.5,0.5])(STRUCT([pillar1,pillar2,pillar3,pillar4,baseSurface1,baseSurface2,baseSurface3,baseSurface4,baseSurface5,baseSurface6,baseSurface7,baseSurface8]));
	

	var table = STRUCT([overlay,overlaySide,base]);
	
	return table;
};

//Create the wooden board
function createWoodenBoard(){

	var boardLine1 = [[-4.5,2.5,0],[4.5,2.5,0],[5,10,0],[4,-9,0]];
	var boardLine2 = [[-4.5,2.5,0],[4.5,2.5,0],[5,-10,0],[4,9,0]];
	var boardSurfaceUp = supHermite(boardLine1,boardLine2,[0,0,1],[0,0,-1]);
	var boardSurfaceDown = supHermite(boardLine1,boardLine2,[0,0,-1],[0,0,1]);

	var woodenBoard = COLOR([0.588235,0.294118,0])(T([2])([0.55])(STRUCT([boardSurfaceUp,boardSurfaceDown])));

	return woodenBoard;
}


var woodenBoard = createWoodenBoard();
var table = createTable(10,5,2);
var niwa = STRUCT([table,woodenBoard]);

DRAW(niwa);


