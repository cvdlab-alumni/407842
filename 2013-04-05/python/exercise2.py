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


#base di apooggio edificio
buildingBase = COLOR(GREEN)(T([2,3])([-1,-1])(GRID([[120],[80],[1]])))

building = STRUCT([buildingBase,pillars0,pillars1,pillars2,pillars3,floor0,floor1,floor2,floor3,floor4])

VIEW(building)