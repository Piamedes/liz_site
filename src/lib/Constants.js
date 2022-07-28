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
	[DIRS.SW]: DIRS.NE,
	[DIRS.U]:  DIRS.D,
	[DIRS.D]:  DIRS.U,
}


const DIRS_SHORT_MAP = {
    n: DIRS.N,
    s: DIRS.S,
    e: DIRS.E,
    w: DIRS.W,
    u: DIRS.U,
    d: DIRS.D,    
    ne: DIRS.NE,
    nw: DIRS.NW,
    se: DIRS.SE,
    sw: DIRS.SW,	
}

const DIRS_STRING_DEFAULTS = {
	[DIRS.NE]: 'north east',
	[DIRS.NW]: 'north west',
	[DIRS.SE]: 'south east',
	[DIRS.SW]: 'south west',	
}

export {DIRS, DIR_LIST,DIR_OPPOSITES,DIRS_SHORT_MAP,DIRS_STRING_DEFAULTS}