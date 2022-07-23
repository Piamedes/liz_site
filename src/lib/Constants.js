class DIRS{
    static W = "west";
    static E = "east";
    static N = "north";
    static S = "south";
    static U = "up";
    static D = "down";
    static NE = "northeast";
    static NW = "northwest";
    static SE = "southeast";
    static SW = "southwest";
}

const DIR_LIST = [
    DIRS.N,
    DIRS.S,
    DIRS.E,
    DIRS.W,
    DIRS.U,
    DIRS.D,    
    DIRS.NE,
    DIRS.NW,
    DIRS.SE,
    DIRS.SW,
]

const DIR_OPPOSITES = {
	[DIRS.N]:  DIRS.S,
	[DIRS.S]:  DIRS.N,
	[DIRS.E]:  DIRS.W,
	[DIRS.W]:  DIRS.E,
	[DIRS.NE]: DIRS.SW,
	[DIRS.NW]: DIRS.SE,
	[DIRS.SE]: DIRS.NW,
	[DIRS.SW]: DIRS.SE,
	[DIRS.U]:  DIRS.D,
	[DIRS.D]:  DIRS.U,
}

export {DIRS, DIR_LIST,DIR_OPPOSITES}