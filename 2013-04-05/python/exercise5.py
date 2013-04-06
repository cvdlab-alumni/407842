from pyplasm import *

#pilone rotondo
def roundPillar():
    pillar = CYLINDER([1.25,26])(36)
    centeredPillar = T([1,2])([1.25,1.25])(pillar)
    return centeredPillar
#piloni rotondi piano terra
roundPillars0 = STRUCT(NN(5)([roundPillar(),T([1])([27.5])]))
roundPillars0a = T([2])([50])(roundPillar())
roundPillars0b = T([1,2])([110,50])(roundPillar())

#pilone quadrato
GRID = COMP([INSR(PROD),AA(QUOTE)])
squarePillars0 = GRID([[-13.75, 2.5, -11.25, 2.5, -25, 2.5, -25, 2.5, -25], [-50, 2.5, -12.5], [-1,25]])

#piloni piano terra
pillars0 = STRUCT([squarePillars0,roundPillars0,roundPillars0a,roundPillars0b])

#piloni piano 1
squarePillarsLine1AA = GRID([[2.5,-25,2.5],[2.5],[-27,49]])
squarePillarsLine1AB = GRID([[-2.5,-25,-2.5,-25,2.5,-25,2.5,-25,2.5],[2.5],[-27,24]])
squarePillarsLine1BA = GRID([[2.5,-25,2.5],[-50,2.5],[-27,49]])
squarePillarsLine1BB = GRID([[-2.5,-25,-2.5,-25,2.5,-25,-2.5,-25,2.5],[-50,2.5],[-27,24]])
roundPillar1t = T([1,2,3])([2.5+25+2.5+25+2.5+25+1.25,50+1.25,27])(CYLINDER([1.25,24])(36))
pillars1 = STRUCT([squarePillarsLine1AA,squarePillarsLine1AB,squarePillarsLine1BA,squarePillarsLine1BB,roundPillar1t])

#piloni piano 2
squarePillars2a = GRID([[-55, 2.5, -52.5, 2.5], [2.5, -62.5], [-52, 24, -26]])
squarePillars2b = GRID([[-55, 2.5, -25, 2.5, -25, 2.5], [-50, 2.5, -12.5], [-52, 24, -26]])
pillars2 = STRUCT([squarePillars2a,squarePillars2b])

#piloni piano 3
smallSquarePillars3a = GRID([[1.25, -111.25], [1.25, -62.5], [-77, 23, -2]])
smallSquarePillars3b = GRID([[1.25, -26.25, 1.25], [-51.25, 1.25], [-77, 23, -2]])
squarePillars3a = GRID([[-55, 2.5, -52.5, 2.5],[2.5, -47.5, 2.5],[-77, 23, -2]])
squarePillars3b = GRID([[-55, 2.5, -25, 2.5, -25, 2.5],[-50, 2.5],[-77, 23, -2]])
pillars3 = STRUCT([squarePillars3a,squarePillars3b,smallSquarePillars3a,smallSquarePillars3b])


#Piani edificio

#disegna un semicerchio di spessore 1
def semiCircle(r):
    
    def semiCircle(p):
            alpha = p[0]
            b = p[1]
            a = [b*COS(alpha), b*SIN(alpha)] 
            return a
        
    dom = PROD([INTERVALS(PI)(36), INTERVALS(r)(1)])
    cerchioO = MAP(semiCircle)(dom)
    semiPlan = PROD([cerchioO, Q(1)])
    return semiPlan


#partizione orizzontale del piano terra
hpartition0a = GRID([[-13.75, 71.25], [-22, 43], [1]])
hpartition0b = GRID([[-85, 12.5, -15], [-42, 23], [1]])
hpartition0c = GRID([[-13.75, 12.5],[-18, 4],[1]])
hpartition0d = T([1,2])([97.5, 53.5])(R([1,2])(-PI/2)(semiCircle(11.5)))
hpartition0e = T([1,2])([20, 18])(R([1,2])(-PI)(semiCircle(6.25)))
#piano terra
floor0 = STRUCT([hpartition0a,hpartition0b,hpartition0c,hpartition0d,hpartition0e])

#partizione orizzontale del piano 1
hpartition1a = GRID([[2.5,8.57],[50,3.5,9,2.5],[-1,-25,1]])
hpartition1b = GRID([[-2.5,-8.57,40.22],[50,3.50,-9,2.5],[-1,-25,1]])
hpartition1c = GRID([[-2.5,-8.57,-31.65,-4.58,3.99],[-50,-3.5,9],[-1,-25,1]])
hpartition1d = GRID([[-2.5,-8.57,-31.65,-8.57,8.57],[65],[-1,-25,1]])
hpartition1e = GRID([[-2.5,-8.57,-31.65,-8.57,-8.57,52.64],[65],[-1,-25,1]])
#piano 1
floor1 = STRUCT([hpartition1a,hpartition1b,hpartition1c,hpartition1d,hpartition1e])

#partizione orizzontale del piano 2
hpartition2a = GRID([[2.5,5.71],[65],[-1,-25,-1,-24,1]])
hpartition2b = GRID([[-2.5,-5.71,37.14],[2.5,-51,-9,2.5],[-1,-25,-1,-24,1]])
hpartition2c = GRID([[-2.5,-5.71,-37.14,13.57],[2.5],[-1,-25,-1,-24,1]])
#pavimento diagonale piano2
verts = [[58.92,0],[45.35,51],[45.35,65],[58.92,65]]
cells = [[1,2,3,4]]
hpartition2d = MKPOL([verts,cells,None])
hpartition2d_3D = T([3])([1+25+1+24])(PROD([hpartition2d,Q(1)]))
hpartition2e = GRID([[-2.5,-5.71,-37.14,-13.57,53.53],[65],[-1,-25,-1,-24,1]])
#piano 2
floor2 = STRUCT([hpartition2a,hpartition2b,hpartition2c,hpartition2d_3D,hpartition2e])

##partizione orizzontale del piano 3
hpartition3a = GRID([[2.5],[65],[-1,-25,-1,-24,-1,-24,1]])
hpartition3b = GRID([[2.5,25,2.5,25],[2.5,61.25,1.25],[-1,-25,-1,-24,-1,-24,1]])
hpartition3c = GRID([[-2.5,-25,-2.5,-25,2.5],[65],[-1,-25,-1,-24,-1,-24,1]])
hpartition3d = GRID([[-2.5,-25,-2.5,-25,2.5,34.58],[54.75,-9,1.25],[-1,-25,-1,-24,-1,-24,1]])
hpartition3e = GRID([[-2.5,-25,-2.5,-25,2.5,-34.58,20.42],[65],[-1,-25,-1,-24,-1,-24,1]])
#piano 3
floor3 = STRUCT([hpartition3a,hpartition3b,hpartition3c,hpartition3d,hpartition3e])

#partizione orizzontale del piano 4
hpartition4a = GRID([[2.5],[65],[-1,-25,-1,-24,-1,-24,-1,-23,2]])
hpartition4b = GRID([[2.5,25,2.5,25],[2.5,-41.18,21.32],[-1,-25,-1,-24,-1,-24,-1,-23,2]])
hpartition4c = GRID([[-2.5,-25,-2.5,-25,2.5,25,2.5,25,2.5],[65],[-1,-25,-1,-24,-1,-24,-1,-23,2]])
#piano 4
floor4 = STRUCT([hpartition4a,hpartition4b,hpartition4c])



#traduzione di annulus circle in pyplasm
def pieceOfCircle(alpha, r , R):
    dom= PROD([INTERVALS(alpha)(36), T(1)(r)(INTERVALS(R-r)(1))])
    def mapping(v):
        a=v[0]
        r=v[1]
        return [r*COS(a), r*SIN(a)]
    model=MAP(mapping)(dom)
    return model

#muro rotondo a nord dell edificio
roundNorth0 = T([1,2,3])([97.5, 53.5, 1])(R([1,2])(-PI/2)(PROD([pieceOfCircle(PI, 9, 11.5), Q(25)])))
#muri a Nord
north0 = T([3])([1])(GRID([[-82.5, 2.5], [-22, 11.5], [25]]))
north0a = T([1,2,3])([82.5, 33.5, 23])(CUBOID([2.5,8.5,3]))
north0b = T([3])([1])(GRID([[-23.75, 2.5],[-18, 4],[25]]))
north1 = GRID([[-110, 2.5],[-2.5, 50],[-27, 10, -10, 4]])
north1a = GRID([[-110, 2.5], [-52.5, 7, -3, 2.5], [-27, 24]])
north1b = T([1,2,3])([110, 59.5,50])(CUBOID([2.5,3,1]))
north1c = T([1,2,3])([110, 59.5,27])(CUBOID([2.5,3,1]))
north2 = GRID([[-110, 2.5],[-2.5, 50],[-52, 7, -10, 7]])
north2a = GRID([[-110, 2.5], [-52.5, 7, -3, 2.5], [-52, 24]])
north2b = T([1,2,3])([110, 59.5,74.5])(CUBOID([2.5,3,1.5]))
north2c = T([1,2,3])([110, 59.5,52])(CUBOID([2.5,3,1.5]))
north3 = GRID([[-110, 2.5],[-2.5, 50],[-77, 5, -10, 8]])
north3a = GRID([[-110, 2.5], [-52.5, 7, -3, 2.5], [-77, 24]])
north3b = T([1,2,3])([110, 59.5,77])(CUBOID([2.5,3,2]))
north3c = T([1,2,3])([110, 59.5,99])(CUBOID([2.5,3,2]))
north = STRUCT([roundNorth0,north0,north0a,north0b,north1,north1a,north1b,north1c,north2,north2a,north2b,north2c,north3,north3a,north3b,north3c])

#muro rotondo a Est
east0 = T([1,2,3])([20, 18, 1])(R([1,2])(-PI)(PROD([pieceOfCircle(PI, 3.75, 6.25), Q(25)])))
#muri a Est
east0a = T([3])([1])(GRID([[-23.75, 32.25], [-22, 2.5], [25]]))
east0b = T([3])([1])(GRID([[-56, 26.5], [-22, 2.5], [14, -10, 1]]))
east0c = T([3])([1])(GRID([[-82.5, 15], [-42, 2.5],[25]]))
east1a = GRID([[-2.5, 25], [2.5], [-27, 24]])
east1b = GRID([[-30, 25], [2.5], [-27, 24]])
east1c = GRID([[-85, 25], [2.5], [-27, 24]])
east1d = GRID([[-56, 26.5], [2.5], [-27, 10, -10, 4]])
east1 = STRUCT([east1a,east1b,east1c,east1d])
east2a = GRID([[-2.5, 25], [2.5], [-52, 24]])
east2b = GRID([[-30, 25], [2.5], [-52, 24]])
east2c = GRID([[-82.5, 27.5], [2.5], [-52, 24]])
east2d = GRID([[-56, 26.5], [2.5], [-52, 10, -10, 4]])
east2 = STRUCT([east2a,east2b,east2c,east2d])
east3a = GRID([[55], [2.5], [-77, 7.14, -15.86]])
east3b = GRID([[-82.5, 27.5], [2.5], [-77, 23]])
east3c = GRID([[-56, 26.5], [2.5], [-77, 7.14, -10, 5.86]])
east3 = STRUCT([east3a,east3b,east3c])
east = STRUCT([east0,east0a,east0b,east0c,east1,east2,east3])

#muri a Sud
south01 = GRID([[2.5],[-50,-2.5,-10,2.5],[1,25]])
south02 = GRID([[-13.75,2.5],[-2.5,-18.86,28.64],[-1,14.28,-9.47,1.25]])
south03 = GRID([[-13.75,2.5],[-2.5,-15.36,3.5],[1,25]])
south0 = STRUCT([south01,south02,south03])

south1 = GRID([[2.5],[-50,-10.82,4.18],[-1,-25,-1,24]])
south2 = GRID([[2.5],[-50,15],[-1,-25,-1,-24,-1,24]])
south3 = GRID([[2.5],[65],[-1,-25,-1,-24,-1,-24,-1,7.14]])
south = STRUCT([south0,south1,south2,south3])

#muri a Ovest
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

#Struttura finestre

#finestre a Est
structureEast1 = COLOR(BLACK)(GRID([[-57.5, 25], [-1.5,0.5], [-37, 0.5, -9, 0.5, -4]]))
structureEast2 = COLOR(BLACK)(GRID([[-57.5, 0.5, -11.5, 1 , -11.5 , 0.5], [-1.5,0.5], [-37, 10, -4]]))
windowEast1 = STRUCT ([structureEast1,structureEast2])

windowEast2 = T([3])([25])(windowEast1)
windowEast3 = T([3])([22.14])(windowEast2)
structureEast3 = COLOR(BLACK)(GRID([[-56, 26.5], [-23.5, 0.5], [-15 ,0.5, -9 , 0.5]]))
structureEast4 = COLOR(BLACK)(GRID([[-56, 0.5, -12.25 , 1 , -12.25 , 0.5], [-23.5, 0.5], [-15 ,10]]))
windowEast4= STRUCT ([structureEast3,structureEast4])
windowEast = STRUCT([windowEast1,windowEast2,windowEast3,windowEast4])

#finestre a Nord
structureNorth1 = COLOR(BLACK)(GRID([[-110.5, 0.5],[-2.5, 47.5],[-37, 0.5, -9 , 0.5]]))
structureNorth2 = COLOR(BLACK)(GRID([[-110.5, 0.5],[-2.5, 0.6, -11.125, 0.6, -11.125 , 0.6, -11.125 , 0.6, -11.125 , 0.6],[-37, 10, -4]]))
windowNorth1 = STRUCT([structureNorth1,structureNorth2])

windowNorth2 = T([3])([22])(windowNorth1)
windowNorth3 = T([3])([23])(windowNorth2)
windowNorth = STRUCT([windowNorth2,windowNorth3,windowNorth1])

#finestre a Sud
structureSouth1 = COLOR(BLACK)(GRID([[-1.5,0.5],[-2.5,0.5,-10.875,1,-10.875,1,-10.875,1,-10.875,0.5],[-27,24]]))
structureSouth2 = COLOR(BLACK)(GRID([[-1.5,0.5],[-2.5,47.5],[-27,0.5,-11,1,-11,0.5]]))
windowSouth1 = STRUCT ([structureSouth1,structureSouth2])
windowSouth2 = T([3])([25])(windowSouth1)

structureSouth3 = COLOR(BLACK)(GRID([[-15.25,0.5],[-21.3, 0.5, -13.35, 1, -13.35, 0.5],[-15.28,9.47]]))
structureSouth4 = COLOR(BLACK)(GRID([[-15.25,0.5],[-21.3, 28.7],[-15.28,0.5,-8.47,0.5]]))
windowSouth3 = STRUCT ([structureSouth3,structureSouth4])
windowSouth = STRUCT([windowSouth1,windowSouth2,windowSouth3])

#Scale

#gradini rampa 1
depth = 2.66;
raiser = 2.55;
step2D = MKPOL([[[0,0],[0,1.4+raiser],[depth,raiser],[depth,1.4+raiser]],[[1,2,3,4]],None])
step3D = MAP([S1,S3,S2])(PROD([step2D,Q(10.25)]))
ramp1 = STRUCT(NN(10)([step3D,T([1,3])([depth,raiser])]))
stair1 = T([1,2])([20.89,2.5+47.5+2.5])(ramp1)

#gradini rampa 2
depth2 = 3.16;
raiser2 = 2.05;
step2D_2 = MKPOL([[[0,0],[0,1.4+raiser2],[depth2,raiser2],[depth2,1.4+raiser2]],[[1,2,3,4]],None])
step3D_2 = MAP([S1,S3,S2])(PROD([step2D_2,Q(10.25)]))
ramp2 = STRUCT(NN(12)([step3D_2,T([1,3])([depth2,raiser2])]))
stair2 = T([1,2,3])([10.5,2.5+47.5+2.5,25+1])(ramp2)

#rampa 3
ramp3 = STRUCT(NN(12)([step3D_2,T([1,3])([depth2,raiser2])]))
stair3 = T([1,2,3])([57.07,2.5+47.5+2.5,25+1+24+1])(ramp3)

#base di appoggio edificio
buildingBase = COLOR(GREEN)(T([2,3])([-1,-1])(GRID([[120],[80],[1]])))

building = STRUCT([buildingBase,pillars0,pillars1,pillars2,pillars3,floor0,floor1,floor2,floor3,floor4,north,east,south,west,windowNorth,windowEast,windowSouth,stair1,stair2,stair3])

VIEW(building)


