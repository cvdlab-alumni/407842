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

//base di appoggio edificio
buildingBase = COLOR([0,1,0])(T([2,3])([-1,-1])(GRID([[120],[80],[1]])))

building = STRUCT([buildingBase,pillars0,pillars1,pillars2,pillars3,floor0,floor1,floor2,floor3,floor4])

VIEW(building)