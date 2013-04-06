// da PLASM a PLASMJS
T = function (dims) {
  dims =  dims.map(function (dim ) {
    return dim - 1;
  }); 
    return function (values) {
      return function (object) {
       return object.clone().translate(dims, values);
      };
    };
  }

R = function (dims) {
  dims =  dims.map(function (dim ) {
    return dim - 1;
  });
    return function (angle) {
      return function (object) {
        return object.clone().rotate(dims, angle);
      };
    };
  }

S = function (dims) {
  dims =  dims.map(function (dim ) {
    return dim - 1;
  });
    return function (values) {
      return function (object) {
        return object.clone().scale(dims, values);
      }; 
    };
  }

S3 = S2
S2 = S1
S1 = S0

GRID = SIMPLEX_GRID
VIEW = DRAW
NN = REPLICA

//disegna piloni rotondi
function roundPillar() {
    pillar = EXTRUDE([26])(DISK([1.25])(36))
    centeredPillar = T([1,2])([1.25,1.25])(pillar)
    return centeredPillar
  };
  
//piloni rotondi piano terra e pilone rotondo secondo piano
roundPillars0 = STRUCT(NN(5)([roundPillar(),T([1])([27.5])]))
roundPillars0a = T([2])([50])(roundPillar())
roundPillars0b = T([1,2])([110,50])(roundPillar())

//pilone quadrato piano terra
squarePillars0 = GRID([[-13.75, 2.5, -11.25, 2.5, -25, 2.5, -25, 2.5, -25], [-50, 2.5, -12.5], [-1,25]])
//piloni piano terra
pillars0 = STRUCT([squarePillars0,roundPillars0,roundPillars0a,roundPillars0b])

//piloni primo piano
squarePillarsLine1AA = GRID([[2.5,-25,2.5],[2.5],[-27,49]])
squarePillarsLine1AB = GRID([[-2.5,-25,-2.5,-25,2.5,-25,2.5,-25,2.5],[2.5],[-27,24]])
squarePillarsLine1BA = GRID([[2.5,-25,2.5],[-50,2.5],[-27,49]])
squarePillarsLine1BB = GRID([[-2.5,-25,-2.5,-25,2.5,-25,-2.5,-25,2.5],[-50,2.5],[-27,24]])
roundPillar1 = EXTRUDE([24])(DISK([1.25])(36))
roundPillar1t = T([1,2,3])([2.5+25+2.5+25+2.5+25+1.25,50+1.25,27])(roundPillar1)
pillars1 = STRUCT([squarePillarsLine1AA,squarePillarsLine1AB,squarePillarsLine1BA,squarePillarsLine1BB,roundPillar1t])

//piloni secondo piano
squarePillars2a = GRID([[-55, 2.5, -52.5, 2.5], [2.5, -62.5], [-52, 24, -26]])
squarePillars2b = GRID([[-55, 2.5, -25, 2.5, -25, 2.5], [-50, 2.5, -12.5], [-52, 24, -26]])
pillars2 = STRUCT([squarePillars2a,squarePillars2b])

//piloni terzo piano
smallSquarePillars3a = GRID([[1.25, -111.25], [1.25, -62.5], [-77, 23, -2]])
smallSquarePillars3b = GRID([[1.25, -26.25, 1.25], [-51.25, 1.25], [-77, 23, -2]])
squarePillars3a = GRID([[-55, 2.5, -52.5, 2.5],[2.5, -47.5, 2.5],[-77, 23, -2]])
squarePillars3b = GRID([[-55, 2.5, -25, 2.5, -25, 2.5],[-50, 2.5],[-77, 23, -2]])
pillars3 = STRUCT([squarePillars3a,squarePillars3b,smallSquarePillars3a,smallSquarePillars3b])

//crea un semicerchio spesso 1 dato il raggio r
function semiCircle(r){
    
    function semiCircle(p){
            alpha = p[0]
            b = p[1]
            a = [b*COS(alpha), b*SIN(alpha)] 
            return a;
        };
    var dom = DOMAIN([[0,PI],[0,r]])([36,1]);
    var cerchioO = MAP(semiCircle)(dom)
    var semiPlan = EXTRUDE([1])(cerchioO);
    return semiPlan;
};

//semipiani piano terra
semiPlan0a = GRID([[-13.75, 71.25], [-22, 43], [1]])
semiPlan0b = GRID([[-85, 12.5, -15], [-42, 23], [1]])
semiPlan0c = GRID([[-13.75, 12.5],[-18, 4],[1]])
semiPlan0d = T([1,2])([97.5, 53.5])(R([1,2])(-PI/2)(semiCircle(11.5)))
semiPlan0e = T([1,2])([20, 18])(R([1,2])(-PI)(semiCircle(6.25)))
//piano terra
floor0 = STRUCT([semiPlan0a,semiPlan0b,semiPlan0c,semiPlan0d,semiPlan0e])

//partizione in piani orizzontali del primo piano
semiPlan1a = GRID([[2.5,8.57],[50,3.5,9,2.5],[-1,-25,1]])
semiPlan1b = GRID([[-2.5,-8.57,40.22],[50,3.5,-9,2.5],[-1,-25,1]])
semiPlan1c = GRID([[-2.5,-8.57,-31.65,-4.58,3.99],[-50,-3.5,9],[-1,-25,1]])
semiPlan1d = GRID([[-2.5,-8.57,-31.65,-8.57,8.57],[65],[-1,-25,1]])
semiPlan1e = GRID([[-2.5,-8.57,-31.65,-8.57,-8.57,52.64],[65],[-1,-25,1]])
//primo piano
floor1 = STRUCT([semiPlan1a,semiPlan1b,semiPlan1c,semiPlan1d,semiPlan1e])

//partizione in piani orizzontali del secondo piano
hpartition2a = GRID([[2.5,5.71],[65],[-1,-25,-1,-24,1]])
hpartition2b = GRID([[-2.5,-5.71,37.14],[2.5,-51,-9,2.5],[-1,-25,-1,-24,1]])
hpartition2c = GRID([[-2.5,-5.71,-37.14,13.57],[2.5],[-1,-25,-1,-24,1]])

//pavimento secondo piano diagonale
verts = [[58.92,0],[45.35,51],[45.35,65],[58.92,65]]
cells = [[0,1,3],[1,2,3]]
hpartition24_2D = SIMPLICIAL_COMPLEX(verts)(cells)
hpartition24_3D = T([3])([1+25+1+24])(EXTRUDE([1])(hpartition24_2D))
hpartition25 = GRID([[-2.5,-5.71,-37.14,-13.57,53.53],[65],[-1,-25,-1,-24,1]])
//secondo piano
floor2 = STRUCT([hpartition2a,hpartition2b,hpartition2c,hpartition24_3D,hpartition25])

//partizione in piani orizzontali del terzo piano
hpartition3a = GRID([[2.5],[65],[-1,-25,-1,-24,-1,-24,1]])
hpartition3b = GRID([[2.5,25,2.5,25],[2.5,61.25,1.25],[-1,-25,-1,-24,-1,-24,1]])
hpartition3c = GRID([[-2.5,-25,-2.5,-25,2.5],[65],[-1,-25,-1,-24,-1,-24,1]])
hpartition3d = GRID([[-2.5,-25,-2.5,-25,2.5,34.58],[54.75,-9,1.25],[-1,-25,-1,-24,-1,-24,1]])
hpartition3e = GRID([[-2.5,-25,-2.5,-25,2.5,-34.58,20.42],[65],[-1,-25,-1,-24,-1,-24,1]])
//terzo piano
floor3 = STRUCT([hpartition3a,hpartition3b,hpartition3c,hpartition3d,hpartition3e])

//partizione in piani orizzontali del quarto piano
hpartition4a = GRID([[2.5],[65],[-1,-25,-1,-24,-1,-24,-1,-23,2]])
hpartition4b = GRID([[2.5,25,2.5,25],[2.5,-51.18,11.32],[-1,-25,-1,-24,-1,-24,-1,-23,2]])
hpartition4c = GRID([[-2.5,-25,-2.5,-25,2.5,25,2.5,25,2.5],[65],[-1,-25,-1,-24,-1,-24,-1,-23,2]])
//quarto piano
floor4 = STRUCT([hpartition4a,hpartition4b,hpartition4c])



function annulus_sector (alpha, r, R) {
  var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    
    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  return model;
}

//angolo a nord dell'edificio
roundNorth0 = T([1,2,3])([97.5, 53.5, 1])(R([1,2])(-PI/2)(EXTRUDE([25])(annulus_sector(PI, 9, 11.5))))

//mura a nord dell'edificio: piano terra
north0 = T([3])([1])(GRID([[-82.5, 2.5], [-22, 11.5], [25]]))
north0a = T([1,2,3])([82.5, 33.5, 23])(CUBOID([2.5,8.5,3]))
north0b = T([3])([1])(GRID([[-23.75, 2.5],[-18, 4],[25]]))

//mura a nord dell'edificio: piano 1
north1 = GRID([[-110, 2.5],[-2.5, 50],[-27, 10, -10, 4]])
north1a = GRID([[-110, 2.5], [-52.5, 7, -3, 2.5], [-27, 24]])
north1b = T([1,2,3])([110, 59.5,50])(CUBOID([2.5,3,1]))
north1c = T([1,2,3])([110, 59.5,27])(CUBOID([2.5,3,1]))

//mura a nord dell'edificio: piano 2
north2 = GRID([[-110, 2.5],[-2.5, 50],[-52, 7, -10, 7]])
north2a = GRID([[-110, 2.5], [-52.5, 7, -3, 2.5], [-52, 24]])
north2b = T([1,2,3])([110, 59.5,74.5])(CUBOID([2.5,3,1.5]))
north2c = T([1,2,3])([110, 59.5,52])(CUBOID([2.5,3,1.5]))

//mura a nord dell'edificio: piano 3
north3 = GRID([[-110, 2.5],[-2.5, 50],[-77, 5, -10, 8]])
north3a = GRID([[-110, 2.5], [-52.5, 7, -3, 2.5], [-77, 24]])
north3b = T([1,2,3])([110, 59.5,77])(CUBOID([2.5,3,2]))
north3c = T([1,2,3])([110, 59.5,99])(CUBOID([2.5,3,2]))

//mura a nord dell'edificio
north = STRUCT([roundNorth0,north0,north0a,north0b,north1,north1a,north1b,north1c,north2,north2a,north2b,north2c,north3,north3a,north3b,north3c])

//angolo a est dell'edificio
east0 = T([1,2,3])([20, 18, 1])(R([1,2])(-PI)(EXTRUDE([25])(annulus_sector(PI, 3.75, 6.25))))

//mura a est dell'edificio: piano terra
east0a = T([3])([1])(GRID([[-23.75, 32.25], [-22, 2.5], [25]]))
east0b = T([3])([1])(GRID([[-56, 26.5], [-22, 2.5], [14, -10, 1]]))
east0c = T([3])([1])(GRID([[-82.5, 15], [-42, 2.5],[25]]))

//mura a est dell'edificio: piano 1
east1a = GRID([[-2.5, 25], [2.5], [-27, 24]])
east1b = GRID([[-30, 25], [2.5], [-27, 24]])
east1c = GRID([[-85, 25], [2.5], [-27, 24]])
east1d = GRID([[-56, 26.5], [2.5], [-27, 10, -10, 4]])
east1 = STRUCT([east1a,east1b,east1c,east1d])

//mura a est dell'edificio: piano 2
east2a = GRID([[-2.5, 25], [2.5], [-52, 24]])
east2b = GRID([[-30, 25], [2.5], [-52, 24]])
east2c = GRID([[-82.5, 27.5], [2.5], [-52, 24]])
east2d = GRID([[-56, 26.5], [2.5], [-52, 10, -10, 4]])
east2 = STRUCT([east2a,east2b,east2c,east2d])

//mura a est dell'edificio: piano 3
east3a = GRID([[55], [2.5], [-77, 7.14, -15.86]])
east3b = GRID([[-82.5, 27.5], [2.5], [-77, 23]])
east3c = GRID([[-56, 26.5], [2.5], [-77, 7.14, -10, 5.86]])
east3 = STRUCT([east3a,east3b,east3c])

//mura a est dell'edificio
east = STRUCT([east0,east0a,east0b,east0c,east1,east2,east3])

//mura a sud dell'edificio
south01 = GRID([[2.5],[-50,-2.5,-10,+2.5],[1,25]])
south02 = GRID([[-13.75,2.5],[-2.5,-18.86,28.64],[-1,14.28,-9.47,1.25]])
south03 = GRID([[-13.75,2.5],[-2.5,-15.36,3.5],[1,25]])
south0 = STRUCT([south01,south02,south03])

south1 = GRID([[2.5],[-50,-10.82,4.18],[-1,-25,-1,24]])

south2 = GRID([[2.5],[-50,15],[-1,-25,-1,-24,-1,24]])

south3 = GRID([[2.5],[65],[-1,-25,-1,-24,-1,-24,-1,7.14]])

south = STRUCT([south0,south1,south2,south3])


//mura a ovest dell'edificio
west01 = GRID([[-2.5,25],[-62.5,2.5],[1,25]])
west02 = GRID([[-2.5,-25,46.78],[-62.5,2.5],[-1,25]])
west03 = GRID([[-2.5,-25,-46.78,5.71],[-62.5,2.5],[-1,17.14,-5.71,2.15]])
west04 = GRID([[-74.28,-5.71,18.51],[-62.5,2.5],[-1,25]])
west0 = STRUCT([west01,west02,west03,west04])

west11 = GRID([[63.57],[-62.5,2.5],[-1,-25,-1,24]])
west12 = GRID([[-63.57,25.71],[-62.5,2.5],[-1,-25,-1,12]])
west13 = GRID([[-63.57,-25.71,23.22],[-62.5,2.5],[-1,-25,-1,24]])
west1 = STRUCT([west11,west12,west13])

west21 = GRID([[89.28],[-62.5,2.5],[-1,-25,-1,-24,-1,24]])
west22 = GRID([[-89.28,1.25],[-62.5,2.5],[-1,-25,-1,-24,-1,6,-12,6]])
west23 = GRID([[-89.28,-1.25,5.71],[-62.5,2.5],[-1,-25,-1,-24,-1,24]])
west24 = GRID([[-89.28,-1.25,-5.71,1.25],[-62.5,2.5],[-1,-25,-1,-24,-1,6,-12,6]])
west25 = GRID([[-89.28,-1.25,-5.71,-1.25, 15.01],[-62.5,2.5],[-1,-25,-1,-24,-1,24]])
west2 = STRUCT([west21,west22,west23,west24,west25])
west3 = GRID([[112.5],[-62.5,2.5],[-1,-25,-1,-24,-1,-24,-1,23]])

west = STRUCT([west0,west1,west2,west3])

//base di appoggio edificio
buildingBase = COLOR([0,1,0])(T([2,3])([-1,-1])(GRID([[120],[80],[1]])))

building = STRUCT([buildingBase,pillars0,pillars1,pillars2,pillars3,floor0,floor1,floor2,floor3,floor4,north,east,south,west])

VIEW(building)