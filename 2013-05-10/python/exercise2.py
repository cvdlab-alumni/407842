'''
Created on 10/mag/2013

@author: kix
'''
from pyplasm import *
import scipy
from scipy import *

def VERTEZTRUDE((V,coords)):
    """
        Utility function to generate the output model vertices in a 
        multiple extrusion of a LAR model.
        V is a list of d-vertices (each given as a list of d coordinates).
        coords is a list of absolute translation parameters to be applied to 
        V in order to generate the output vertices.
        
        Return a new list of (d+1)-vertices.
    """
    return CAT(AA(COMP([AA(AR),DISTR]))(DISTL([V,coords])))


def larExtrude(model,pattern):
    V,FV = model
    d = len(FV[0])
    offset = len(V)
    m = len(pattern)
    outcells = []
    for cell in FV:
        # create the indices of vertices in the cell "tube"
        tube = [v + k*offset for k in range(m+1) for v in cell]
        # take groups of d+1 elements, via shifting by one
        rangelimit = len(tube)-d
        cellTube = [tube[k:k+d+1] for k in range(rangelimit)]
        outcells += [scipy.reshape(cellTube,newshape=(m,d,d+1)).tolist()]
    outcells = AA(CAT)(TRANS(outcells))
    outcells = [group for k,group in enumerate(outcells) if pattern[k]>0 ]
    coords = list(cumsum([0]+(AA(ABS)(pattern))))
    outVerts = VERTEZTRUDE((V,coords))
    newModel = outVerts, CAT(outcells)
    return newModel

def cumsum(iterable):
    # cumulative addition: list(cumsum(range(4))) => [0, 1, 3, 6]
    iterable = iter(iterable)
    s = iterable.next()
    yield s
    for c in iterable:
        s = s + c
        yield s

def GRID(args):
    model = ([[]],[[0]])
    for k,steps in enumerate(args):
        model = larExtrude(model,steps*[1])
    V,cells = model
    verts = AA(list)(scipy.array(V) / AA(float)(args))
    return MKPOL([verts, AA(AA(lambda h:h+1))(cells), None])

def Ellipse(r,R):
    def ellipse0(p):
        a=p[0]
        return [R*SIN(a), r*COS(a)]
    return ellipse0;


domain = GRID([20])
roundDomain = INTERVALS(2*PI)(32)

def curveHermite(c1):
    dom = domain
    return MAP(CUBICHERMITE(S1)(c1))(dom);


Bezier = BEZIER(S1)


antBottomZ = POLYLINE([[0,0.3],[4,0]]);

wheelAntPointsZ = [[4,0],[9,0],[0,12],[0,-12]]
wheelAntZ = curveHermite(wheelAntPointsZ)

ctrlPmiddle = [[9,0],[13,0.2],[15,0.2],[18,0]]
middleZ = MAP(Bezier(ctrlPmiddle))(domain)

wheelPostPointsZ = [[18,0],[23,0],[0,12],[0,-12]]
wheelPostZ = curveHermite(wheelPostPointsZ)

postBottomZ = POLYLINE([[23,0],[26,0.5]]);

ctrlPBottomPost = [[26,0.5],[26.2,0.6],[27,0.8],[27,1]]
postBottomZcurve = MAP(Bezier(ctrlPBottomPost))(domain)

fenderPoints = [[27,1],[27.2,2.3],[0,1],[1,1]]
fenderZ = curveHermite(fenderPoints)

postZ1p = [[27.2,2.3],[26,3.6],[0,1],[-1,-1]]
postZ1 = curveHermite(postZ1p)

postZ2p = [[26,3.6],[26.3,4.3],[0,1],[0,1]]
postZ2 = curveHermite(postZ2p)

postUpZ1 = POLYLINE([[26.3,4.3],[25.3,4.3]])
postUpZ2p = [[25.3,4.3],[24.8,4],[-1,0],[-1,0]]
postUpZ2 = curveHermite(postUpZ2p)

postUpZ3p = [[25,4.1],[23.2,5],[-0.5,0],[-1,-1]]
postUpZ3 = curveHermite(postUpZ3p)

postUpZ4 = POLYLINE([[24.8,4],[23.2,5]])

postUpZ5Down = POLYLINE([[23.2,5],[19.5,6]])
postUpZ5p = [[19.5,6],[19.2,6.3],[-1,1],[-1,1]]
postUpZ5 = curveHermite(postUpZ5p)

postUpZ5UpPoints = [[23.32,5.05],[19.2,6.3],[-0.5,0.5],[-0.5,0.5]]
postUpZ5Up = curveHermite(postUpZ5UpPoints)

middleUpZp = [[19.2,6.3],[12.5,6.4],[-0.5,0.5],[-4,-4]]
middleUpZ = curveHermite(middleUpZp)

middleDownZp = [[19.5,6],[12.6,6.3],[-0.5,0.5],[-4,-4]]
middleDownZ = curveHermite(middleDownZp)

middleUnionZ = POLYLINE([[12.5,6.4],[12.6,6.3]])

antGlassZp = [[12.5,6.4],[8.5,4.5],[-0.5,0],[-0.5,-0.5]]
antGlassZ = curveHermite(antGlassZp)

antGlassZp1 = [[12.6,6.3],[10,4.55],[0.7,-0.7],[-0.5,-0.5]]
antGlassZ1 = curveHermite(antGlassZp1)

antGlassZ2 = POLYLINE([[8.5,4.5],[10,4.55]])

hoodZp = [[8.5,4.5],[3.5,4],[-0.5,0],[-0.5,-0.5]]
hoodZ = curveHermite(hoodZp)

hoodZp1 = [[3.5,4],[0,2],[-0.5,0],[0,-3]]
hoodZ1 = curveHermite(hoodZp1)

hoodZp2 = [[0,2],[0.5,1],[0,-2],[0,-3]]
hoodZ2 = curveHermite(hoodZp2)

hoodZp3 = [[0,0.3],[0.5,1],[0,1],[1,0]]
hoodZ3 = curveHermite(hoodZp3)

windowZUpP = [[10.5,4.55],[13.1,6.2],[1,0],[1,0]]
windowZUp = curveHermite(windowZUpP)

windowZUnion = POLYLINE([[10.5,4.55],[10,4.55]])

windowZUpP1 = [[13.1,6.2],[20.5,5.3],[3,3],[1,-1]]
windowZUp1 = curveHermite(windowZUpP1)

windowZUpP2 = [[20.5,5.3],[10.5,4.55],[3,-3],[-3,-1]]
windowZUp2 = curveHermite(windowZUpP2)

windowZUp3 = POLYLINE([[17.5,6.2],[17,4.7]])

doorZp = [[17,4.7],[15,1],[4,-4],[-1,0]]
doorZ = curveHermite(doorZp)

doorLineZ = POLYLINE([[15,1],[8.86,1]])

doorLineZp = [[10,4.55],[10,1],[-2,-2],[2,-2]]
doorLineZ1 = curveHermite(doorLineZp)

ventZp = [[17.5,4.4],[17.1,2.5],[1,-1],[-2,-2]]
ventZ = curveHermite(ventZp)

ventZp1 = [[17.5,4.4],[17.1,2.5],[9,0],[-2,-2]]
ventZ1 = curveHermite(ventZp1)

lineBackZ = POLYLINE([[21.95,2.5],[27,2.8]])

lightLineZp = [[26.7,2.8],[25.4,3.6],[0,0.5],[0,0]]
lightLineZ = curveHermite(lightLineZp)

lightLineZp1 = [[25.4,3.6],[24.3,2.65],[-0.2,0.2],[3,-5]]
lightLineZ1 = curveHermite(lightLineZp1)

LightLineZ2 = POLYLINE([[24.05,3.2],[26.15,3.2]])

LightFrontZp = [[3.5,4],[1.5,2.7],[-1,0],[0,-1]]
LightFrontZ = curveHermite(LightFrontZp)

LightFrontZp1 = [[1.5,2.7],[3.5,4],[1,0],[0,1]]
LightFrontZ1 = curveHermite(LightFrontZp1)



zModel1 = STRUCT([antBottomZ,wheelAntZ,middleZ,wheelPostZ,postBottomZ,postBottomZcurve,
            fenderZ,postZ1,postZ2,postUpZ1,postUpZ2,postUpZ3,postUpZ4,postUpZ5Down,
            postUpZ5,postUpZ5Up,middleUpZ,middleDownZ,middleUnionZ,antGlassZ,antGlassZ,
            antGlassZ1,antGlassZ2,hoodZ,hoodZ1,hoodZ2,hoodZ3,windowZUp,windowZUnion,
            windowZUp1,windowZUp2,windowZUp3,doorZ,doorLineZ,doorLineZ1,ventZ,ventZ1,
            lineBackZ,lightLineZ,lightLineZ1,LightLineZ2,LightFrontZ,LightFrontZ1])

zModel = T(2)(1)(T(1)(-6.5)(R([1,3])(PI/2)(zModel1)))


bottomXp = [[0,1],[5.5,2],[20,0],[1.5,3]]
bottomX = curveHermite(bottomXp)

sideXp = [[5.5,2],[5.7,6],[2,10],[-2,2]]
sideX = curveHermite(sideXp)

hoodX = POLYLINE([[5.7,6],[0,6]])

topSideXp = [[5.7,6],[3.5,8.5],[-1,2],[-2,0]]
topSideX = curveHermite(topSideXp)

topX = POLYLINE([[3.5,8.5],[0,8.5]])

topSideXp1 = [[5.5,6],[3.3,8.2],[-1,2],[-2,0]]
topSideX1 = curveHermite(topSideXp1)

topX1 = POLYLINE([[3.3,8.2],[0,8.2]])

sideXp1 = [[5.7,6],[6,2],[3,-1],[0,-3]]
sideX1 = curveHermite(sideXp1)

sideXp2 = [[6,2],[5.4,1.8],[0,-1],[-1,0]]
sideX2 = curveHermite(sideXp2)

mirrorXp = [[5.5,6],[6.5,6.5],[2,0],[0,1]]
mirrorX = curveHermite(mirrorXp)

mirrorXp1 = [[6.5,6.5],[5.8,6.7],[0,1],[-1,0]]
mirrorX1 = curveHermite(mirrorXp1)

mirrorXp2 = [[5.8,6.7],[5.6,6.2],[-2,0],[-0.5,0]]
mirrorX2 = curveHermite(mirrorXp2)

hoodX1 = POLYLINE([[0,4],[2.7,4]])

hoodX2p = [[2.7,4],[5.5,6],[1,3],[1,0]]
hoodX2 = curveHermite(hoodX2p)

lightXp = [[3,4.5],[4.3,5.2],[3,0],[2,0]]
lightX = curveHermite(lightXp)

lightXp1 = [[4.3,5.2],[4.3,3.8],[3,0],[-3,0]]
lightX1 = curveHermite(lightXp1)

lightXp2 = [[4.3,3.8],[2.7,4],[-1,1],[-1,0]]
lightX2 = curveHermite(lightXp2)

lightX3 = T(2)(4.6)(T(1)(4.4)(MAP(Ellipse(0.4, 0.5))(roundDomain)))
lightX4 = T(2)(4.3)(T(1)(3.5)(MAP(Ellipse(0.15, 0.25))(roundDomain)))

lineGridX = POLYLINE([[0,1.7],[1.5,1.7]])
lineGridX2 = POLYLINE([[0,2.3],[1.5,2.3]])
lineGridX3 = POLYLINE([[0,1.9],[1.7,1.9]])
lineGridX4 = POLYLINE([[0,1.7],[0,2.3]])
lineGridX5 = POLYLINE([[1,1.7],[1.1,2.3]])


lineGridX1p = [[1.5,1.7],[1.5,2.3],[1,1],[-1,0]]
lineGridX1 = curveHermite(lineGridX1p)




xModel1 = STRUCT([bottomX,sideX,hoodX,topSideX,topX,sideX1,sideX2,mirrorX,mirrorX1,mirrorX2,hoodX1,
                  topSideX1,topX1,hoodX2,lightX,lightX1,lightX2,lightX3,lightX4,lineGridX,
                  lineGridX1,lineGridX2,lineGridX3,lineGridX4,lineGridX5])
xModel2 = R([1,3])(PI)(xModel1)
xModel = STRUCT([xModel1,xModel2])


backPostYp = [[0,0],[6.2,4],[10,0],[0,15]]
backPostY = curveHermite(backPostYp)

backPostYp1 = [[6.2,4],[5.7,10],[0,3],[0,1]]
backPostY1 = curveHermite(backPostYp1)

backMiddleY = POLYLINE([[5.7,10],[5.6,23]])

antYp = [[5.6,23],[0,27],[0,5],[-15,0]]
antY = curveHermite(antYp)

middleY1 = POLYLINE([[0,8],[3,8]])

middleYp = [[3,8],[3,3],[0,1],[0,-1]]
middleY = curveHermite(middleYp)

middleYp2 = [[3,3],[0,2.5],[0,-1],[-1,0]]
middleY2 = curveHermite(middleYp2)

middleYp3 = [[3,3.5],[0,3],[0,-1],[-1,0]]
middleY3 = curveHermite(middleYp3)

middleY4 = POLYLINE([[3,8],[3.5,14.5]])

middleYp5 = [[3.5,14.5],[0,14.2],[-1,-1],[-2,0]]
middleY5 = curveHermite(middleYp5)

middleYp6 = [[3.5,14.5],[4.5,17],[1,0],[0,1]]
middleY6 = curveHermite(middleYp6)

middleYp7 = [[4.5,17],[0,18],[0,2.5],[-1,0]]
middleY7 = curveHermite(middleYp7)

middleYp8 = [[4.5,17],[0,18.5],[0,4.5],[-1,0]]
middleY8 = curveHermite(middleYp8)

antYp1 = [[4.2,17.65],[3,25],[2,2],[2,2]]
antY1 = curveHermite(antYp1)

antYp2 = [[3,25],[0,25.5],[0,1],[-1,0]]
antY2 = curveHermite(antYp2)

lightY3 = T(2)(25)(T(1)(4)(MAP(Ellipse(0.4, 0.5))(roundDomain)))
lightY4 = T(2)(25.5)(T(1)(3.4)(MAP(Ellipse(0.15, 0.25))(roundDomain)))

windowYp = [[3.7,14],[4.5,17],[0,-45],[0,20]]
windowY = curveHermite(windowYp)

windowUnion = POLYLINE([[3.7,14],[4.5,16]])

yModel1 = STRUCT([backPostY,backPostY1,backMiddleY,antY,middleY1,middleY,middleY2,middleY3,middleY4,middleY5,
                  middleY6,middleY7,middleY8,antY1,antY2,lightY4,lightY3,windowY,windowUnion])
yModel2 = R([1,3])(PI)(yModel1)
yModel = T(2)(9)(T(3)(27)(R([1,3])(PI)(R([2,3])(PI/2)(STRUCT([yModel1,yModel2])))))



model = COLOR(BLACK)(STRUCT([xModel,zModel,yModel]))
VIEW(model)
