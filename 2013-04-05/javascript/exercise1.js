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

building = STRUCT([pillars0,pillars1,pillars2,pillars3])

VIEW(building)