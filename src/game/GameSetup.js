import React from 'react';

import {clone, componentExists} from "../lib/Utils.js";
import {DIRS,DIR_OPPOSITES} from "../lib/Constants.js";
import Room from "./Room.js";
import Path from "./Path.js";
import Puzzle from "./Puzzle.js";
import Player from "./Player.js";

class GameSetup extends React.Component{
	constructor(props){
		super(props);

		this.player    = {};
		this.roomMap   = {};
		this.puzzleMap = {};
		this.pathMap   = {};
	}

	init(storedSettings={}){
		this.initPlayer(storedSettings);
		this.initRoomsPathsPuzzles(storedSettings);
	}

	initPlayer(storedSettings){
		this.player = new Player({roomId: "START"});
	}

	initRoomsPathsPuzzles(storedSettings){
		let greenIds  = this._buildGreenWing();
		let blueIds   = this._buildBlueWing();
		let atriumIds = this._buildAtrium();

		this.makeDoor(blueIds.BM0,atriumIds.AL0,[],[DIRS.W]);
		this.makeDoor(blueIds.BM1,atriumIds.AL1,[],[DIRS.W]);
		this.makeDoor(blueIds.BM2,atriumIds.AL2,[],[DIRS.W]);

		this.makeDoor(greenIds.G0SE,     atriumIds.AL0,[],[DIRS.E]);
		this.makeDoor(greenIds.G1,	     atriumIds.AL1,[],[DIRS.E]);
		this.makeDoor(greenIds.G2Landing,atriumIds.AL2,[],[DIRS.E]);
	}

	//Functions for building the various wings of the museum - returns the IDs needed for connecting wings together
	_buildGreenWing(){
		//basement
		let G0SW = this.createRoom({
			id: "G0SW",
			descriptions: ["green SW"],
		})

		let G0SE = this.createRoom({
			id: "G0SE",
			descriptions: ["green SE"],
		})

		let G0NW = this.createRoom({
			id: "G0NW",
			descriptions: ["green NW"],
		});

		let G0NE = this.createRoom({
			id: "G0NE",
			descriptions: ["green NE"],
		});

		//first floor
		let G1 = this.createRoom({
			id: "G1",
			descriptions: ["green First floor"],
		})

		//second floor
		let G2Landing = this.createRoom({
			id: "G2Landing",
			descriptions: ["green second floor landing"],
		})		


		let G2Nano = this.createRoom({
			id: "G2Nano",
			descriptions: ["green second floor humans and nano"],
		})

		let G2Insects = this.createRoom({
			id: "G2Insects",
			descriptions: ["green second floor bees & tamarinds"],
		})

		let G2Venice = this.createRoom({
			id: "G2Venice",
			descriptions: ["green second floor venice"],
		})

		return {G2Landing,G1,G0SE}
	}

	_buildBlueWing(){
		//basement floor
		let BM0 = this.createRoom({
				id:"BMO",
				descriptions: ["blue wing main room, basement floor"],
		});

		let BDino = this.createRoom({
				id:"BDino",
				descriptions: ["blue wing dino room, basement floor"],
		});

		let BCloser = this.createRoom({
				id:"BCloser",
				descriptions: ["blue wing southwest room (turtles!), basement floor"],
		});

		let BMath = this.createRoom({
				id:"BMath",
				descriptions: ["blue wing math room, basement floor"],
		});		

		this.makeDoor(BM0, BDino,   [],[DIRS.SE],[DIRS.N]);
		this.makeDoor(BM0, BCloser, [],[DIRS.SW],[DIRS.N]);
		this.makeDoor(BM0, BMath,   [],[DIRS.E]);

		//first floor
		let BM1 = this.createRoom({
				id:"BM1",
				descriptions: ["blue wing main room, first floor"],  //covers wicked smart &trex
		});

		let BScenes = this.createRoom({
				id:"BScenes",
				descriptions: ["blue wing behind the scenes"],
		});

		let BElectricL = this.createRoom({
				id:"BElectricL",
				descriptions: ["blue wing electric theatre landing"],
		});

		let BElectricB = this.createRoom({
				id:"BElectricB",
				descriptions: ["blue wing electric theatre basement"],
		});

		let BEng = this.createRoom({
				id:"BEng",
				descriptions: ["blue wing engineering design shop"],
		});


		let BArtic = this.createRoom({
				id:"BArtic",
				descriptions: ["blue wing artic"],
		});		

		this.makeDoor(BM1, BElectricL, [],[DIRS.E],[DIRS.W],"large door");
		this.makeDoor(BM1, BEng,       [],[DIRS.NE],[DIRS.S]);
		this.makeDoor(BM1, BArtic,	   [],[DIRS.NW],[DIRS.S]);
		this.makeDoor(BElectricL, BElectricB, [],[DIRS.D],[],"staircase");
		this.makeDoor(BElectricL, BScenes, [],[DIRS.U],[],"staircase");

		//second floor
		let BM2 = this.createRoom({
				id:"BM2",
				descriptions: ["blue wing main room second floor"], //covers light house and science in the park
		});


		let BPlay = this.createRoom({
				id:"BPlay",
				descriptions: ["blue wing electric playhouse"],
		});


		let BTheater = this.createRoom({
				id:"BTheater",
				descriptions: ["blue wing theater"],
		});

		this.makeDoor(BM2, BPlay,    [],[DIRS.NE],[DIRS.S],"large door");
		this.makeDoor(BM2, BTheater, [],[DIRS.NW],[DIRS.S]);


		//cross floor links
		this.makeDoor(BM0, BM1,    [],[DIRS.U],[DIRS.D],"escalator");
		this.makeDoor(BMath,BElectricB,[],[DIRS.U],[DIRS.D],"stairs");
		this.makeDoor(BM1, BM2,    [],[DIRS.U],[DIRS.D],"escalator");	
		this.connectRooms( BDino, BM1, ['climb'], {doorDescription:'dino_tail',lockPuzzleIds:[],descriptions:["dinodes"]});

		return {BM0,BM1,BM2}
	}

	_buildAtrium(){

		//outside entrace
		let start = this.createRoom({
			id: "START",
			descriptions: ["game start"],
		})

		let LANDING = this.createRoom({
			id: "LANDING",
			descriptions: ["game start"],
		})

		let AL0 = this.createRoom({
			id: "AL0",
			descriptions: ["atrium basement"],
		});

		let AL1 = this.createRoom({
			id: "AL1",
			descriptions: ["atrium main lobby"],
		});

		let AL2 = this.createRoom({
			id: "AL2",
			descriptions: ["atrium bridge"],
		})
		this.connectRooms( start, LANDING, ['knock'], {doorDescription:'slide',lockPuzzleIds:[],descriptions:["testing"]});
		this.makeDoor(LANDING, AL0, [],[DIRS.N]);
		this.makeDoor(AL1, AL0, [],[DIRS.D],[DIRS.U],"staircase");

		return {AL0,AL1,AL2}
	}

	//Helper functions for building the graph
	createRoom(props){
		if( props.id in this.roomMap )
			throw new Error( 'room id already in use')
		else{
			this.roomMap[props.id] = new Room(props)
			return props.id;
		}
	}

	connectRooms(roomIdA, roomIdB, directions, pathProps){
		if(!componentExists(pathProps, 'id'))
			pathProps.id = this.makePathId(roomIdA,roomIdB);

		if( pathProps.id in this.pathMap )
			throw new Error( 'path id already in use')
		else{

			pathProps.roomIdB = roomIdB;
			pathProps.roomIdA = roomIdA

			this.pathMap[pathProps.id] = new Path(pathProps)

			for(let dir of directions){
				if(dir in this.roomMap[roomIdA].paths)
					throw new Error( roomIdA + " already has a " + dir + " in use")
				else
					this.roomMap[roomIdA].paths[dir] = pathProps.id;
			}

			return pathProps.id;
		}		
	}

	enrichPathProps(roomIdA, roomIdB,propsBase){
		let newProps = clone( propsBase);

		newProps.id   	 = this.makePathId( roomIdA, roomIdB );
		newProps.roomIdA = roomIdA;
		newProps.roomIdB = roomIdB;

		return newProps
	}

	makeTwoWayConnection(roomIdA, roomIdB, roomADirs, roomBDirs, pathProps){
		let propsA = this.enrichPathProps( roomIdA, roomIdB, pathProps );
		let propsB = this.enrichPathProps( roomIdB, roomIdA, pathProps );

		let pathIdA = this.connectRooms( roomIdA, roomIdB, roomADirs, propsA);
		let pathIdB = this.connectRooms( roomIdB, roomIdA, roomBDirs, propsB);		

		return {pathIdA, pathIdB}
	}

	makePathId(roomIdA,roomIdB){
		return roomIdA + '->' + roomIdB
	}

	makeDoor(roomIdA, roomIdB, lockPuzzleIds, roomADirs, roomBDirs=[], doorDescription = "when does this get used?"){

		let propsBase = {
			doorDescription,
			lockPuzzleIds,
			descriptions: ['the rooom continues on'],
		};

		if(!roomBDirs.length){
			for( let dir of roomADirs)
				roomBDirs.push(DIR_OPPOSITES[dir])
		}

		return this.makeTwoWayConnection(roomIdA,roomIdB,roomADirs,roomBDirs,propsBase);
	}
}

export default GameSetup;