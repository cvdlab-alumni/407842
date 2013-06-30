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

//Colors
var sittingGreen = [0.643137,1,0.584314];
var saddleRGreen = [0.0745098,0.231373,0.129412];
var saddleCGreen = [0.792157,0.956863,0.741176]
var saddleLGreen = [0.4,0.905882,0.12549];
var white = [1.5,1.5,1.5];

//Sitting

sittingBigLine = [[-8,0,0],[8,0,0],[0,0,0],[0,0,0]];
sittingSmallLine = [[-6,4,0],[6,4,0],[0,0,0],[0,0,0]];
SittingUpSurfaceUp = supHermite(sittingBigLine,sittingSmallLine,[0,0,0],[0,0,0]);

sittingBigLineUnder = [[-7,0.5,-0.5],[7,0.5,-0.5],[0,0,0],[0,0,0]];
sittingSmallLineUnder = [[-6,3.5,-0.5],[6,3.5,-0.5],[0,0,0],[0,0,0]];
SittingUpSurfaceDown = (supHermite(sittingBigLineUnder,sittingSmallLineUnder,[0,0,0],[0,0,0]));

SittingBehindSurface = supHermite(sittingBigLine,sittingBigLineUnder,[1,0,0],[-1,0,0]);
SittingBehindSurface1 = supHermite(sittingBigLine,sittingBigLineUnder,[-1,0,0],[1,0,0]);
SittingFrontSurface = supHermite(sittingSmallLine,sittingSmallLineUnder,[-1,0,0],[1,0,0]);
SittingFrontSurface1 = supHermite(sittingSmallLine,sittingSmallLineUnder,[1,0,0],[-1,0,0]);

RoundUpLineR = [[-8,0,0],[-6,4,0],[-3,0,0],[2,0,0]];
UpLineR = [[-8,0,0],[-6,4,0],[0,0,0],[0,0,0]];
RoundUpSurfaceR = supHermite(RoundUpLineR,UpLineR,[0,0,0],[0,0,0]);

RoundUpLineL = [[8,0,0],[6,4,0],[3,0,0],[-2,0,0]];
UpLineL = [[8,0,0],[6,4,0],[0,0,0],[0,0,0]];
RoundUpSurfaceL = supHermite(RoundUpLineL,UpLineL,[0,0,0],[0,0,0]);

RoundDownLineR = [[-7,0.5,-0.5],[-6,3.5,-0.5],[-3,0,0],[2,0,0]];
DownLineR = [[-7,0.5,-0.5],[-6,3.5,-0.5],[0,0,0],[0,0,0]];
RoundDownSurfaceR = supHermite(RoundDownLineR,DownLineR,[0,0,0],[0,0,0]);

RoundDownLineL = [[7,0.5,-0.5],[6,3.5,-0.5],[3,0,0],[-2,0,0]];
DownLineL = [[7,0.5,-0.5],[6,3.5,-0.5],[0,0,0],[0,0,0]];
RoundDownSurfaceL = supHermite(RoundDownLineL,DownLineL,[0,0,0],[0,0,0]);

RoundSideR = supHermite(RoundUpLineR,RoundDownLineR,[-1,0,0],[1,0,0]);
RoundSideL = supHermite(RoundUpLineL,RoundDownLineL,[1,0,0],[-1,0,0]);


//Right pillow

SittingSurface1 = COLOR(sittingGreen)(STRUCT([SittingUpSurfaceUp,SittingUpSurfaceDown,SittingBehindSurface,SittingBehindSurface1,SittingFrontSurface,SittingFrontSurface1,RoundUpSurfaceR,RoundUpSurfaceL,RoundDownSurfaceR,RoundDownSurfaceL,RoundSideR,RoundSideL]));
SittingSurface = S([0,1,2])([0.7,0.7,1])(SittingSurface1);

saddleRLineDown = [[0,0,0],[0,1.5,0],[14,0,0],[-4,2,0]];
saddleRLineDown1 = [[0,0,0],[0,1.5,0],[0,0,0],[0,0,0]];
saddleRLineSurface = supHermite(saddleRLineDown,saddleRLineDown1,[0,0,0],[0,0,0]);

saddleRLineDownBack = [[0,0,-0.5],[0,1.5,-0.5],[14,0,0],[-4,2,0]];
saddleRLineDown1Back = [[0,0,-0.5],[0,1.5,-0.5],[0,0,0],[0,0,0]];
saddleRLineSurfaceBack = supHermite(saddleRLineDownBack,saddleRLineDown1Back,[0,0,0],[0,0,0]);

saddleRlineLid = supHermite(saddleRLineDown,saddleRLineDownBack,[0,0,0],[0,0,0]);

saddleCLine = [[0,1.5,0],[-1.5,1.75,0],[-4,2,0],[-1,-0.5,0]];
saddleCLine1 = [[0,0,0],[-1.5,0,0],[0,0,0],[0,0,0]];
saddleCLineSurface = supHermite(saddleCLine,saddleCLine1,[0,0,0],[0,0,0]);

saddleCLineBack = [[0,1.5,-0.5],[-1.5,1.75,-0.5],[-4,2,0],[-1,-0.5,0]];
saddleCLine1Back = [[0,0,-0.5],[-1.5,0,-0.5],[0,0,0],[0,0,0]];
saddleCLineSurfaceBack = supHermite(saddleCLineBack,saddleCLine1Back,[0,0,0],[0,0,0]);

saddleClineLid = supHermite(saddleCLine,saddleCLineBack,[0,0,0],[0,0,0]);
saddleClineLid1 = supHermite(saddleCLine1,saddleCLine1Back,[0,0,0],[0,0,0]);

saddleLCLine = [[-1.5,0,0],[-2.5,0.5,0],[-1,0,0],[-2,2,0]];
saddleLCLine1 = [[-1.5,1.75,0],[-2.5,1.25,0],[0,0,0],[0,0,0]];
saddleLCLineSurface = supHermite(saddleLCLine,saddleLCLine1,[0,0,0],[0,0,0]);

saddleLCLineBack = [[-1.5,0,-0.5],[-2.5,0.5,-0.5],[-1,0,0],[-2,2,0]];
saddleLCLine1Back = [[-1.5,1.75,-0.5],[-2.5,1.25,-0.5],[0,0,0],[0,0,0]];
saddleLCLineSurfaceBack = supHermite(saddleLCLineBack,saddleLCLine1Back,[0,0,0],[0,0,0]);

saddleLCLineLid = supHermite(saddleLCLine,saddleLCLineBack,[0,0,0],[0,0,0]);
saddleLCLineLid1 = supHermite(saddleLCLine1,saddleLCLine1Back,[0,0,0],[0,0,0]);

saddleLLine = [[-2.5,0.5,0],[-2.5,1.25,0],[-1.5,1.5,0],[2,1,0]];
saddleLLine1 = [[-2.5,0.5,0],[-2.5,1.25,0],[0,0,0],[0,0,0]];
saddleLLineSurface = supHermite(saddleLLine,saddleLLine1,[0,0,0],[0,0,0]);

saddleLLineBack = [[-2.5,0.5,-0.5],[-2.5,1.25,-0.5],[-1.5,1.5,0],[2,1,0]];
saddleLLine1Back = [[-2.5,0.5,-0.5],[-2.5,1.25,-0.5],[0,0,0],[0,0,0]];
saddleLLineSurfaceBack = supHermite(saddleLLineBack,saddleLLine1Back,[0,0,0],[0,0,0]);

saddleLLineLid = supHermite(saddleLLine,saddleLLineBack,[0,0,0],[0,0,0]);

saddleRnt = COLOR(saddleRGreen)(STRUCT([saddleRLineSurface,saddleRLineSurfaceBack,saddleRlineLid,saddleCLineSurface,saddleCLineSurfaceBack,saddleClineLid,saddleClineLid1,saddleLCLineSurface,saddleLCLineSurfaceBack,saddleLCLineLid1,saddleLCLineLid,saddleLLineSurface,saddleLLineSurfaceBack,saddleLLineLid]));
saddleRnt1 = R([1,2])([PI/2])(saddleRnt);
saddleR = T([0,2])([-2,0.1])(R([0,1])(PI)(saddleRnt1));


//Central Pillow


saddleMRLine = [[0.25,0.25,0],[0.25,1.75,0],[6,3,0],[-6,3,0]];
saddleMRLine1 = [[0.25,0.25,0],[0.25,1.75,0],[0,0,0],[0,0,0]];
saddleMRLineSurface = supHermite(saddleMRLine,saddleMRLine1,[0,0,0],[0,0,0]);

saddleMRLineBack = [[0.25,0.25,-0.5],[0.25,1.75,-0.5],[6,3,0],[-6,3,0]];
saddleMRLine1Back = [[0.25,0.25,-0.5],[0.25,1.75,-0.5],[0,0,0],[0,0,0]];
saddleMRLineSurfaceBack = supHermite(saddleMRLineBack,saddleMRLine1Back,[0,0,0],[0,0,0]);

saddleMRLid = supHermite(saddleMRLine,saddleMRLineBack,[0,0,0],[0,0,0]);

saddleMCLineUp = [[0.25,1.75,0],[-1,1.75,0],[-2,1,0],[-2,-1,0]];
saddleMCLineDown = [[0.25,0.25,0],[-1,1,0],[-2,-1,0],[-2,2,0]];
saddleMCLineSurface = supHermite(saddleMCLineUp,saddleMCLineDown,[0,0,0],[0,0,0]);

saddleMCLineUpBack = [[0.25,1.75,-0.5],[-1,1.75,-0.5],[-2,1,0],[-2,-1,0]];
saddleMCLineDownBack = [[0.25,0.25,-0.5],[-1,1,-0.5],[-2,-1,0],[-2,2,0]];
saddleMCLineSurfaceBack = supHermite(saddleMCLineUpBack,saddleMCLineDownBack,[0,0,0],[0,0,0]);

saddleMCLidUp = supHermite(saddleMCLineUp,saddleMCLineUpBack,[0,0,0],[0,0,0]);
saddleMCLidDown = supHermite(saddleMCLineDown,saddleMCLineDownBack,[0,0,0],[0,0,0]);

saddleMLLine = [[-1,1.75,0],[-1,1,0],[-2,-1,0],[1,-1,0]];
saddleMLLine1 = [[-1,1.75,0],[-1,1,0],[0,0,0],[0,0,0]];
saddleMLLineSurface = supHermite(saddleMLLine,saddleMLLine1,[0,0,0],[0,0,0]);

saddleMLLineBack = [[-1,1.75,-0.5],[-1,1,-0.5],[-2,-1,0],[1,-1,0]];
saddleMLLine1Back = [[-1,1.75,-0.5],[-1,1,-0.5],[0,0,0],[0,0,0]];
saddleMLLineSurfaceBack = supHermite(saddleMLLineBack,saddleMLLine1Back,[0,0,0],[0,0,0]);

saddleMLLid = supHermite(saddleMLLine,saddleMLLineBack,[0,0,0],[0,0,0]);

saddleMnt = COLOR(saddleCGreen)(STRUCT([saddleMRLineSurface,saddleMRLineSurfaceBack,saddleMRLid,saddleMCLineSurface,saddleMCLineSurfaceBack,saddleMCLidUp,saddleMCLidDown,saddleMLLineSurface,saddleMLLineSurfaceBack,saddleMLLid]));
saddleMnt1 = R([1,2])([PI/2])(saddleMnt);
saddleM =  T([0,2])([1.2,1.1])(R([0,1])(PI)(saddleMnt1));


//Left Pillow


saddleLRLine = [[1.25,0,0],[1.25,1.75,0],[6,0,0],[-4,4,0]];
saddleLRLine1 = [[1.25,0,0],[1.25,1.75,0],[0,0,0],[0,0,0]];
saddleLRLineSurface = supHermite(saddleLRLine,saddleLRLine1,[0,0,0],[0,0,0]);

saddleLRLineBack = [[1.25,0,-0.5],[1.25,1.75,-0.5],[6,0,0],[-4,4,0]];
saddleLRLine1Back = [[1.25,0,-0.5],[1.25,1.75,-0.5],[0,0,0],[0,0,0]];
saddleLRLineSurfaceBack = supHermite(saddleLRLineBack,saddleLRLine1Back,[0,0,0],[0,0,0]);

saddleLRLid = supHermite(saddleLRLine,saddleLRLineBack,[0,0,0],[0,0,0]);

saddleLCRLine = [[1.25,1.75,0],[0.75,2,0],[-0.8,0.8,0],[-0.8,0,0]];
saddleLCRLine1 = [[1.25,0,0],[0.75,0,0],[0,0,0],[0,0,0]];
saddleLCRLineSurface = supHermite(saddleLCRLine,saddleLCRLine1,[0,0,0],[0,0,0]);

saddleLCRLineBack = [[1.25,1.75,-0.5],[0.75,2,-0.5],[-0.8,0.8,0],[-0.8,0,0]];
saddleLCRLine1Back = [[1.25,0,-0.5],[0.75,0,-0.5],[0,0,0],[0,0,0]];
saddleLCRLineSurfaceBack = supHermite(saddleLCRLineBack,saddleLCRLine1Back,[0,0,0],[0,0,0]);

saddleLCRLineLid = supHermite(saddleLCRLine,saddleLCRLineBack,[0,0,0],[0,0,0]);
saddleLCRLine1Lid = supHermite(saddleLCRLine1,saddleLCRLine1Back,[0,0,0],[0,0,0]);

saddleLCCLine = [[0.75,2,0],[0.25,2,0],[0,0,0],[0,0,0]];
saddleLCCLine1 = [[0.75,0,0],[0.25,0,0],[0,0,0],[0,0,0]];
saddleLCCLineSurface = supHermite(saddleLCCLine,saddleLCCLine1,[0,0,0],[0,0,0]);

saddleLCCLineBack = [[0.75,2,-0.5],[0.25,2,-0.5],[0,0,0],[0,0,0]];
saddleLCCLine1Back = [[0.75,0,-0.5],[0.25,0,-0.5],[0,0,0],[0,0,0]];
saddleLCCLineSurfaceBack = supHermite(saddleLCCLineBack,saddleLCCLine1Back,[0,0,0],[0,0,0]);

saddleLCCLineLid = supHermite(saddleLCCLine,saddleLCCLineBack,[0,0,0],[0,0,0]);
saddleLCCLineLid1 = supHermite(saddleLCCLine1,saddleLCCLine1Back,[0,0,0],[0,0,0]);

saddleLCLLine = [[0.25,2,0],[-0.25,1.75,0],[0,0,0],[-0.5,-0.625,0]];
saddleLCLLine1 = [[0.25,0,0],[-0.25,0.2,0],[0,0,0],[-1,0.75,0]];
saddleLCLLineSurface = supHermite(saddleLCLLine,saddleLCLLine1,[0,0,0],[0,0,0]);

saddleLCLLineBack = [[0.25,2,-0.5],[-0.25,1.75,-0.5],[0,0,0],[-0.5,-0.625,0]];
saddleLCLLine1Back = [[0.25,0,-0.5],[-0.25,0.2,-0.5],[0,0,0],[-1,0.75,0]];
saddleLCLLineSurfaceBack = supHermite(saddleLCLLineBack,saddleLCLLine1Back,[0,0,0],[0,0,0]);

saddleLCLLid = supHermite(saddleLCLLine,saddleLCLLineBack,[0,0,0],[0,0,0]);
saddleLCLLid1 = supHermite(saddleLCLLine1,saddleLCLLine1Back,[0,0,0],[0,0,0]);

saddleLLLine = [[-0.25,1.75,0],[-0.25,0.2,0],[-2.5,-3.125,0],[1.5,-1.875,0]];
saddleLLLine1 = [[-0.25,1.75,0],[-0.25,0.2,0],[0,0,0],[0,0,0]];
saddleLLLineSurface = supHermite(saddleLLLine,saddleLLLine1,[0,0,0],[0,0,0]);

saddleLLLineBack = [[-0.25,1.75,-0.5],[-0.25,0.2,-0.5],[-2.5,-3.125,0],[1.5,-1.875,0]];
saddleLLLine1Back = [[-0.25,1.75,-0.5],[-0.25,0.2,-0.5],[0,0,0],[0,0,0]];
saddleLLLineSurfaceBack = supHermite(saddleLLLineBack,saddleLLLine1Back,[0,0,0],[0,0,0]);

saddleLLLineLid = supHermite(saddleLLLine,saddleLLLineBack,[0,0,0],[0,0,0]);


saddleLnt = COLOR(saddleLGreen)(STRUCT([saddleLRLineSurface,saddleLRLineSurfaceBack,saddleLRLid,saddleLCRLineSurface,saddleLCRLineSurfaceBack,saddleLCRLineLid,saddleLCRLine1Lid,saddleLCCLineSurface,saddleLCCLineSurfaceBack,saddleLCCLineLid,saddleLCCLineLid1,saddleLCLLineSurface,saddleLCLLineSurfaceBack,saddleLCLLid,saddleLCLLid1,saddleLLLineSurface,saddleLLLineSurfaceBack,saddleLLLineLid]));
saddleLnt1 = R([1,2])([PI/2])(saddleLnt);
saddleL =  T([0,2])([3.5,0.1])(R([0,1])(PI)(saddleLnt1));

//Sofa body

sitting = STRUCT([SittingSurface,saddleR,saddleM,saddleL]);


//Front-Left branch

branchFLBase = [[-0.1,-1,0],[0,2,0],[0.25,1,0],[0,1,0]];
branchFLBase1 = [[0.5,-1,0],[0.5,2,0],[0.25,1,0],[0,1,0]];
branchFLBaseSurface = supHermite(branchFLBase,branchFLBase1,[0,0,0],[0,0,0]);

branchFLBaseBack = [[-0.1,-1,-0.2],[0,2,-0.2],[0.25,1,0],[0,1,0]];
branchFLBase1Back = [[0.5,-1,-0.2],[0.5,2,-0.2],[0.25,1,0],[0,1,0]];
branchFLBaseSurfaceBack = supHermite(branchFLBaseBack,branchFLBase1Back,[0,0,0],[0,0,0]);

branchFLBaseLid = supHermite(branchFLBase,branchFLBaseBack,[0,0,0],[0,0,0]);
branchFLBaseLid1 = supHermite(branchFLBase1,branchFLBase1Back,[0,0,0],[0,0,0]);

branchFLBranch = [[0.1,0,0],[1.5,2,0],[0.25,1,0],[0,1,0]];
branchFLBranch1 = [[0.5,0,0],[2,2,0],[0.25,1,0],[0,1,0]];
branchFLBranchSurface = supHermite(branchFLBranch,branchFLBranch1,[0,0,0],[0,0,0]);

branchFLBranchBack = [[0.1,0,-0.1],[1.5,2,-0.1],[0.25,1,0],[0,1,0]];
branchFLBranch1Back = [[0.5,0,-0.1],[2,2,-0.1],[0.25,1,0],[0,1,0]];
branchFLBranchSurfaceBack = supHermite(branchFLBranchBack,branchFLBranch1Back,[0,0,0],[0,0,0]);

branchFLBranchLid = supHermite(branchFLBranch,branchFLBranchBack,[0,0,0],[0,0,0]);
branchFLBranchLid1 = supHermite(branchFLBranch1,branchFLBranch1Back,[0,0,0],[0,0,0]);

branchFLBranchBehind = [[0.1,0,0],[0.75,2,-0.6],[0.25,1,0],[0,1,0]];
branchFLBranchBehind1 = [[0.5,0,0],[1.25,2,-0.6],[0.25,1,0],[0,1,0]];
branchFLBranchBehindSurface = supHermite(branchFLBranchBehind,branchFLBranchBehind1,[0,0,0],[0,0,0]);

branchFLBranchBehindBack = [[0.1,0,-0.1],[0.75,2,-0.8],[0.25,1,0],[0,1,0]];
branchFLBranchBehind1Back = [[0.5,0,-0.1],[1.25,2,-0.8],[0.25,1,0],[0,1,0]];
branchFLBranchBehindSurfaceBack = supHermite(branchFLBranchBehindBack,branchFLBranchBehind1Back,[0,0,0],[0,0,0]);

branchFLBranchBehindLid = supHermite(branchFLBranchBehind,branchFLBranchBehindBack,[0,0,0],[0,0,0]);
branchFLBranchBehindLid1 = supHermite(branchFLBranchBehind1,branchFLBranchBehind1Back,[0,0,0],[0,0,0]);


//Front-Right branch


branchFRBase = [[0.1,-1,0],[0,2,0],[0.25,1,0],[0,1,0]];
branchFRBase1 = [[-0.5,-1,0],[-0.5,2,0],[0.25,1,0],[0,1,0]];
branchFRBaseSurface = supHermite(branchFRBase,branchFRBase1,[0,0,0],[0,0,0]);

branchFRBaseBack = [[0.1,-1,-0.2],[0,2,-0.2],[0.25,1,0],[0,1,0]];
branchFRBase1Back = [[-0.5,-1,-0.2],[-0.5,2,-0.2],[0.25,1,0],[0,1,0]];
branchFRBaseSurfaceBack = supHermite(branchFRBaseBack,branchFRBase1Back,[0,0,0],[0,0,0]);

branchFRBaseLid = supHermite(branchFRBase,branchFRBaseBack,[0,0,0],[0,0,0]);
branchFRBaseLid1 = supHermite(branchFRBase1,branchFRBase1Back,[0,0,0],[0,0,0]);

branchFRBranch = [[-0.1,0,0],[-1.5,2,0],[0.25,1,0],[0,1,0]];
branchFRBranch1 = [[-0.5,0,0],[-2,2,0],[0.25,1,0],[0,1,0]];
branchFRBranchSurface = supHermite(branchFRBranch,branchFRBranch1,[0,0,0],[0,0,0]);

branchFRBranchBack = [[-0.1,0,-0.1],[-1.5,2,-0.1],[0.25,1,0],[0,1,0]];
branchFRBranch1Back = [[-0.5,0,-0.1],[-2,2,-0.1],[0.25,1,0],[0,1,0]];
branchFRBranchSurfaceBack = supHermite(branchFRBranchBack,branchFRBranch1Back,[0,0,0],[0,0,0]);

branchFRBranchLid = supHermite(branchFRBranch,branchFRBranchBack,[0,0,0],[0,0,0]);
branchFRBranchLid1 = supHermite(branchFRBranch1,branchFRBranch1Back,[0,0,0],[0,0,0]);

branchFRBranchBehind = [[-0.1,0,0],[-0.75,2,-0.6],[0.25,1,0],[0,1,0]];
branchFRBranchBehind1 = [[-0.5,0,0],[-1.25,2,-0.6],[0.25,1,0],[0,1,0]];
branchFRBranchBehindSurface = supHermite(branchFRBranchBehind,branchFRBranchBehind1,[0,0,0],[0,0,0]);

branchFRBranchBehindBack = [[-0.1,0,-0.1],[-0.75,2,-0.8],[0.25,1,0],[0,1,0]];
branchFRBranchBehind1Back = [[-0.5,0,-0.1],[-1.25,2,-0.8],[0.25,1,0],[0,1,0]];
branchFRBranchBehindSurfaceBack = supHermite(branchFRBranchBehindBack,branchFRBranchBehind1Back,[0,0,0],[0,0,0]);

branchFRBranchBehindLid = supHermite(branchFRBranchBehind,branchFRBranchBehindBack,[0,0,0],[0,0,0]);
branchFRBranchBehindLid1 = supHermite(branchFRBranchBehind1,branchFRBranchBehind1Back,[0,0,0],[0,0,0]);

//Front-Left - Front-Right branch structures

branchFLnt = COLOR(white)(STRUCT([branchFLBaseSurface,branchFLBaseSurfaceBack,branchFLBaseLid,branchFLBaseLid1,branchFLBranchSurface,branchFLBranchSurfaceBack,branchFLBranchLid,branchFLBranchLid1,branchFLBranchBehindSurface,branchFLBranchBehindSurfaceBack,branchFLBranchBehindLid,branchFLBranchBehindLid1]));
branchFLnt1 = R([1,2])(PI/2)(branchFLnt);
branchFL = T([0,1,2])([4,2.2,-1.2])(S([0,1,2])([0.3,0.5,0.4])(R([0,1])(-PI)(branchFLnt1)));

branchFRnt = COLOR(white)(STRUCT([branchFRBaseSurface,branchFRBaseSurfaceBack,branchFRBaseLid,branchFRBaseLid1,branchFRBranchSurface,branchFRBranchSurfaceBack,branchFRBranchLid,branchFRBranchLid1,branchFRBranchBehindSurface,branchFRBranchBehindSurfaceBack,branchFRBranchBehindLid,branchFRBranchBehindLid1]));
branchFRnt1 = R([1,2])(PI/2)(branchFRnt);
branchFR = T([0,1,2])([-4,2.2,-1.2])(S([0,1,2])([0.3,0.5,0.4])(R([0,1])(-PI)(branchFRnt1)));


//Back-Right branch


branchBRBase = [[0,0,0],[2.4,6.5,0],[0,3,0],[3,4,0]];
branchBRBase1 = [[0.5,0,0],[2.5,6.5,0],[0,3,0],[3,4,0]];
branchBRBaseSurface = supHermite(branchBRBase,branchBRBase1,[0,0,0],[0,0,0]);

branchBRBaseBack = [[0,0,-0.2],[2.4,6.5,-0.2],[0,3,0],[3,4,0]];
branchBRBase1Back = [[0.5,0,-0.2],[2.5,6.5,-0.2],[0,3,0],[3,4,0]];
branchBRBaseSurfaceBack = supHermite(branchBRBaseBack,branchBRBase1Back,[0,0,0],[0,0,0]);

branchBRBaseLid = supHermite(branchBRBase,branchBRBaseBack,[0,0,0],[0,0,0]);
branchBRBaseLid1 = supHermite(branchBRBase1,branchBRBase1Back,[0,0,0],[0,0,0]);

branchBRBranch = [[0.1,0,0],[6,6.5,0],[1,20,0],[3,1,0]];
branchBRBranch1 = [[0.5,0,0],[6,6.4,0],[1,20,0],[3,1,0]];
branchBRBranchSurface = supHermite(branchBRBranch,branchBRBranch1,[0,0,0],[0,0,0]);

branchBRBranchBack = [[0.1,0,-0.2],[6,6.5,-0.2],[1,20,0],[3,1,0]];
branchBRBranch1Back = [[0.5,0,-0.2],[6,6.4,-0.2],[1,20,0],[3,1,0]];
branchBRBranchSurfaceBack = supHermite(branchBRBranchBack,branchBRBranch1Back,[0,0,0],[0,0,0]);

branchBRBranchLid = supHermite(branchBRBranch,branchBRBranchBack,[0,0,0],[0,0,0]);
branchBRBranchLid1 = supHermite(branchBRBranch1,branchBRBranch1Back,[0,0,0],[0,0,0]);

BranchBLBranch = [[0.1,0,0],[-1.25,7,0],[5,20,0],[-3,3,0]];
BranchBLBranch1 = [[0.5,0,0],[-1.15,7,0],[5,20,0],[-3,3,0]];
BranchBLBranchSurface = supHermite(BranchBLBranch,BranchBLBranch1,[0,0,0],[0,0,0]);

BranchBLBranchBack = [[0.1,0,-0.2],[-1.25,7,-0.2],[5,20,0],[-3,3,0]];
BranchBLBranch1Back = [[0.5,0,-0.2],[-1.15,7,-0.2],[5,20,0],[-3,3,0]];
BranchBLBranchSurfaceBack = supHermite(BranchBLBranchBack,BranchBLBranch1Back,[0,0,0],[0,0,0]);

BranchBLBranchLid = supHermite(BranchBLBranch,BranchBLBranchBack,[0,0,0],[0,0,0]);
BranchBLBranchLid1 = supHermite(BranchBLBranch1,BranchBLBranch1Back,[0,0,0],[0,0,0]);

BranchBZBranch = [[0.1,0,0],[-0.7,4,-2.6],[0,10,0],[0,5,0]];
BranchBZBranch1 = [[0.5,0,0],[-0.3,4,-2.6],[0,10,0],[0,5,0]];
BranchBZBranchSurface = supHermite(BranchBZBranch,BranchBZBranch1,[0,0,0],[0,0,0]);

BranchBZBranchBack = [[0.1,0,-0.2],[-0.7,4,-2.8],[0,10,0],[0,5,0]];
BranchBZBranch1Back = [[0.5,0,-0.2],[-0.3,4,-2.8],[0,10,0],[0,5,0]];
BranchBZBranchSurfaceBack = supHermite(BranchBZBranchBack,BranchBZBranch1Back,[0,0,0],[0,0,0]);

BranchBZBranchLid = supHermite(BranchBZBranch,BranchBZBranchBack,[0,0,0],[0,0,0]);
BranchBZBranchLid1 = supHermite(BranchBZBranch1,BranchBZBranch1Back,[0,0,0],[0,0,0]);

branchBRnt = COLOR(white)(STRUCT([branchBRBaseSurface,branchBRBaseSurfaceBack,branchBRBaseLid,branchBRBaseLid1,branchBRBranchSurface,branchBRBranchSurfaceBack,branchBRBranchLid,branchBRBranchLid1,BranchBLBranchSurface,BranchBLBranchSurfaceBack,BranchBLBranchLid,BranchBLBranchLid1,BranchBZBranchSurface,BranchBZBranchSurfaceBack,BranchBZBranchLid,BranchBZBranchLid1]));
branchBRnt1 = R([1,2])(PI/2)(branchBRnt);
branchBR = T([0,1,2])([-2.5,-0.6,-1.9])(S([0,1,2])([0.4,0.5,0.4])(branchBRnt1));


//Back-Left branch


BranchBLCBase = [[0,0,0],[-2.25,10,0],[0,5,0],[-2,3,0]];
BranchBLCBase1 = [[0.5,0,0],[-2.15,10,0],[0,5,0],[-2,3,0]];
BranchBLCBaseSurface = supHermite(BranchBLCBase,BranchBLCBase1,[0,0,0],[0,0,0]);

BranchBLCBaseBack = [[0,0,-0.2],[-2.25,10,-0.2],[0,5,0],[-2,3,0]];
BranchBLCBase1Back = [[0.5,0,-0.2],[-2.15,10,-0.2],[0,5,0],[-2,3,0]];
BranchBLCBaseSurfaceBack = supHermite(BranchBLCBaseBack,BranchBLCBase1Back,[0,0,0],[0,0,0]);

BranchBLCBaseLid = supHermite(BranchBLCBase,BranchBLCBaseBack,[0,0,0],[0,0,0]);
BranchBLCBaseLid1 = supHermite(BranchBLCBase1,BranchBLCBase1Back,[0,0,0],[0,0,0]);

BranchBLCLBase = [[0,0,0],[-4.25,10.2,0],[-3,15,0],[-10,4,0]];
BranchBLCLBase1 = [[0.5,0,0],[-4.15,10.2,0],[-3,15,0],[-10,4,0]];
BranchBLCLBaseSurface = supHermite(BranchBLCLBase,BranchBLCLBase1,[0,0,0],[0,0,0]);

BranchBLCLBaseBack = [[0,0,-0.2],[-4.25,10.2,-0.2],[-3,15,0],[-10,4,0]];
BranchBLCLBase1Back = [[0.5,0,-0.2],[-4.15,10.2,-0.2],[-3,15,0],[-10,4,0]];
BranchBLCLBaseSurfaceBack = supHermite(BranchBLCLBaseBack,BranchBLCLBase1Back,[0,0,0],[0,0,0]);

BranchBLCLBaseLid = supHermite(BranchBLCLBase,BranchBLCLBaseBack,[0,0,0],[0,0,0]);
BranchBLCLBaseLid1 = supHermite(BranchBLCLBase1,BranchBLCLBase1Back,[0,0,0],[0,0,0]);

BranchBLCRBase = [[0.1,0,0],[-0.55,11,0],[-6,21,0],[1,2,0]];
BranchBLCRBase1 = [[0.5,0,0],[-0.45,11,0],[-6,21,0],[1,2,0]];
BranchBLCRBaseSurface = supHermite(BranchBLCRBase,BranchBLCRBase1,[0,0,0],[0,0,0]);

BranchBLCRBaseBack = [[0.1,0,-0.2],[-0.55,11,-0.2],[-6,21,0],[1,2,0]];
BranchBLCRBase1Back = [[0.5,0,-0.2],[-0.45,11,-0.2],[-6,21,0],[1,2,0]];
BranchBLCRBaseSurfaceBack = supHermite(BranchBLCRBaseBack,BranchBLCRBase1Back,[0,0,0],[0,0,0]);

BranchBLCRBaseLid = supHermite(BranchBLCRBase,BranchBLCRBaseBack,[0,0,0],[0,0,0]);
BranchBLCRBaseLid1 = supHermite(BranchBLCRBase1,BranchBLCRBase1Back,[0,0,0],[0,0,0]);

BranchBZCLBranch = [[0.1,0,0],[-2,4,-3.2],[0,10,0],[0,5,0]];
BranchBZCLBranch1 = [[0.5,0,0],[-1.6,4,-3.2],[0,10,0],[0,5,0]];
BranchBZCLBranchSurface = supHermite(BranchBZCLBranch,BranchBZCLBranch1,[0,0,0],[0,0,0]);

BranchBZCLBranchBack = [[0.1,0,-0.2],[-2,4,-3.4],[0,10,0],[0,5,0]];
BranchBZCLBranch1Back = [[0.5,0,-0.2],[-1.6,4,-3.4],[0,10,0],[0,5,0]];
BranchBZCLBranchSurfaceBack = supHermite(BranchBZCLBranchBack,BranchBZCLBranch1Back,[0,0,0],[0,0,0]);

BranchBZCLBranchLid = supHermite(BranchBZCLBranch,BranchBZCLBranchBack,[0,0,0],[0,0,0]);
BranchBZCLBranchLid1 = supHermite(BranchBZCLBranch1,BranchBZCLBranch1Back,[0,0,0],[0,0,0]);

BranchBZCRBranch = [[0.1,0,0],[2,4,-2.6],[0,10,0],[0,5,0]];
BranchBZCRBranch1 = [[0.5,0,0],[2.4,4,-2.6],[0,10,0],[0,5,0]];
BranchBZCRBranchSurface = supHermite(BranchBZCRBranch,BranchBZCRBranch1,[0,0,0],[0,0,0]);

BranchBZCRBranchBack = [[0.1,0,-0.2],[2,4,-2.8],[0,10,0],[0,5,0]];
BranchBZCRBranch1Back = [[0.5,0,-0.2],[2.4,4,-2.8],[0,10,0],[0,5,0]];
BranchBZCRBranchSurfaceBack = supHermite(BranchBZCRBranchBack,BranchBZCRBranch1Back,[0,0,0],[0,0,0]);

BranchBZCRBranchLid = supHermite(BranchBZCRBranch,BranchBZCRBranchBack,[0,0,0],[0,0,0]);
BranchBZCRBranchLid1 = supHermite(BranchBZCRBranch1,BranchBZCRBranch1Back,[0,0,0],[0,0,0]);


//Back-Right branch


BranchBRCBase = [[0.1,0,0],[2,7,0],[0,15,0],[1,2,0]];
BranchBRCBase1 = [[0.5,0,0],[2.1,7,0],[0,15,0],[1,2,0]];
BranchBRCBaseSurface = supHermite(BranchBRCBase,BranchBRCBase1,[0,0,0],[0,0,0]);

BranchBRCBaseBack = [[0.1,0,-0.2],[2,7,-0.2],[0,15,0],[1,2,0]];
BranchBRCBase1Back = [[0.5,0,-0.2],[2.1,7,-0.2],[0,15,0],[1,2,0]];
BranchBRCBaseSurfaceBack = supHermite(BranchBRCBaseBack,BranchBRCBase1Back,[0,0,0],[0,0,0]);

BranchBRCBaseLid = supHermite(BranchBRCBase,BranchBRCBaseBack,[0,0,0],[0,0,0]);
BranchBRCBaseLid1 = supHermite(BranchBRCBase1,BranchBRCBase1Back,[0,0,0],[0,0,0]);

BranchBRLBase = [[0.1,0,0],[0.8,7.5,0],[0,15,0],[0,10,0]];
BranchBRLBase1 = [[0.5,0,0],[0.9,7.5,0],[0,15,0],[0,10,0]];
BranchBRLBaseSurface = supHermite(BranchBRLBase,BranchBRLBase1,[0,0,0],[0,0,0]);

BranchBRLBaseBack = [[0.1,0,-0.2],[0.8,7.5,-0.2],[0,15,0],[0,10,0]];
BranchBRLBase1Back = [[0.5,0,-0.2],[0.9,7.5,-0.2],[0,15,0],[0,10,0]];
BranchBRLBaseSurfaceBack = supHermite(BranchBRLBaseBack,BranchBRLBase1Back,[0,0,0],[0,0,0]);

BranchBRLBaseLid = supHermite(BranchBRLBase,BranchBRLBaseBack,[0,0,0],[0,0,0]);
BranchBRLBaseLid1 = supHermite(BranchBRLBase1,BranchBRLBase1Back,[0,0,0],[0,0,0]);

BranchBRRBase = [[0.1,0,0],[4,6.1,0],[0,20,0],[4,-1,0]];
BranchBRRBase1 = [[0.5,0,0],[4,6,0],[0,20,0],[4,-1,0]];
BranchBRRBaseSurface = supHermite(BranchBRRBase,BranchBRRBase1,[0,0,0],[0,0,0]);

BranchBRRBaseBack = [[0.1,0,-0.2],[4,6.1,-0.2],[0,20,0],[4,-1,0]];
BranchBRRBase1Back = [[0.5,0,-0.2],[4,6,-0.2],[0,20,0],[4,-1,0]];
BranchBRRBaseSurfaceBack = supHermite(BranchBRRBaseBack,BranchBRRBase1Back,[0,0,0],[0,0,0]);

BranchBRRBaseLid = supHermite(BranchBRRBase,BranchBRRBaseBack,[0,0,0],[0,0,0]);
BranchBRRBaseLid1 = supHermite(BranchBRRBase1,BranchBRRBase1Back,[0,0,0],[0,0,0]);

branchBLnt = COLOR(white)(STRUCT([BranchBLCBaseSurface,BranchBLCBaseSurfaceBack,BranchBLCBaseLid,BranchBLCBaseLid1,BranchBLCLBaseSurface,BranchBLCLBaseSurfaceBack,BranchBLCLBaseLid,BranchBLCLBaseLid1,BranchBLCRBaseSurface,BranchBLCRBaseSurfaceBack,BranchBLCRBaseLid,BranchBLCRBaseLid1,BranchBZCLBranchSurface,BranchBZCLBranchSurfaceBack,BranchBZCLBranchLid,BranchBZCLBranchLid1,BranchBZCRBranchSurface,BranchBZCRBranchSurfaceBack,BranchBZCRBranchLid,BranchBZCRBranchLid1,BranchBRCBaseSurface,BranchBRCBaseSurfaceBack,BranchBRCBaseLid,BranchBRCBaseLid1,BranchBRLBaseSurface,BranchBRLBaseSurfaceBack,BranchBRLBaseLid,BranchBRLBaseLid1,BranchBRRBaseSurface,BranchBRRBaseSurfaceBack,BranchBRRBaseLid,BranchBRRBaseLid1]));
branchBLnt1 = R([1,2])(PI/2)(branchBLnt);
branchBL = T([0,1,2])([2,-0.6,-1.9])(S([0,1,2])([0.4,0.5,0.4])(branchBLnt1));


//Branch structure

branch = STRUCT([branchFL,branchFR,branchBR,branchBL]);


//Sofa structure

sofa = STRUCT([sitting,branch]);

DRAW(sofa);