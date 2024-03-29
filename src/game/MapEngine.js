import React from 'react';
import {clone, componentExists,componentExtract,getSavedValue,setSavedValue} from "../lib/Utils.js";
import {DIR_OPPOSITES} from "../lib/Constants.js";
import Room from "./Room.js";
import Path from "./Path.js";
import PathHidden from "./PathHidden.js";
import Puzzle from "./Puzzle.js";

class MapEngine extends React.Component{
	constructor(props){
		super(props);

		this.player    = {};
		this.roomMap   = {};
		this.puzzleMap = {};
		this.pathMap   = {};
		this.puzzleHints = {};
		this.PSCB = props.PSCB;

		this.validate = false;

		this.resetRoomVisitMap();

		this.movementEnabled 	= getSavedValue('ME','movementEnabled',true);
		this.hiddenPathsVisible = getSavedValue('ME','hiddenPathsVisible',false);
		let stored = getSavedValue('ME','roomVisitMap',null)
		if(stored!==null)
			this.roomVisitMap = stored;
	}

	resetRoomVisitMap(){
		this.roomVisitMap = {};
		for(const roomId in this.roomMap){
			this.roomVisitMap[roomId] = 0;
		}
		setSavedValue('ME','roomVisitMap',this.roomVisitMap)
	}

	showHiddenPaths(){
		this.setHiddenPaths(true)
	}

	setHiddenPaths(value){
		this.hiddenPathsVisible = value;
		setSavedValue('ME','hiddenPathsVisible',value)
	}

	incrementRoomVisitMap(roomId){
		this.roomVisitMap[roomId] +=1;
		setSavedValue('ME','roomVisitMap',this.roomVisitMap)
	}

	allRoomsVisitedOnce(){
		let result = true

		for(const roomId in this.roomVisitMap){
			if(this.roomVisitMap[roomId]!==1){
				result =  false;
				break;
			}			
		}
	
		return result
	}

	disableMovement(){
		this.movementEnabled = false
		setSavedValue('ME','movementEnabled',false);
	}

	enableMovement(){
		this.movementEnabled = true;
		setSavedValue('ME','movementEnabled',true);
	}

	//To Build a Map (RW)
	createRoom(props){
		if( props.id in this.roomMap )
			throw new Error( 'room id already in use')
		else{
			props.ME = this;
			this.roomMap[props.id] = new Room(props);

			for(const puzzleId in this.roomMap[props.id]._puzzleIds)
				this.validatePuzzleId(puzzleId);
	
			return props.id;
		}
	}

	addRoom(room){
		if( room.type !== 'custom room')
			throw new Error('invalid room type to add, only custom rooms allowed');

		room.ME = this;
		this.roomMap[room.id] = room;

		return room.id;
	}

	createPuzzle(props,storedSettings){
		if( props.id in this.puzzleMap )
			throw new Error( 'puzzle id already in use')
		else{
			props.ME = this;
			this.puzzleMap[props.id] = new Puzzle(props)
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
			pathProps.ME 	  = this;

			this.pathMap[pathProps.id] = (!pathProps.isHidden) ? new Path(pathProps) : new PathHidden(pathProps)

			for(let dir of directions){
				if(dir in this.roomMap[roomIdA].paths)
					throw new Error( roomIdA + " already has a " + dir + " in use")
				else
					this.roomMap[roomIdA].paths[dir] = pathProps.id;
			}

			return pathProps.id;
		}		
	}

	connectRoomsHidden(roomIdA, roomIdB, directions){
		let props = this.enrichPathProps( roomIdA, roomIdB, {doorDescription:null,lockDescription:'',lockPuzzleIds:[],isHidden:true} )

		return this.connectRooms(roomIdA,roomIdB,directions,props)
	}

	enrichPathProps(roomIdA, roomIdB,propsBase){
		let newProps = clone( propsBase );

		newProps.id   	 = this.makePathId( roomIdA, roomIdB, componentExtract(newProps,'isHidden',false) );
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

	makePathId(roomIdA,roomIdB,isHidden=false){
		return roomIdA + '->' + roomIdB + (isHidden ? 'H' : '' )
	}

	makeDoor(roomIdA, roomIdB, lockPuzzleIds, roomADirs, roomBDirs=[], doorDescription = "makeDoorDefaultDoor ",lockDescription="makeDoorDefaultLock "){

		let propsBase = {
			doorDescription,
			lockDescription,
			lockPuzzleIds,
		};

		if(!roomBDirs.length){
			for( let dir of roomADirs)
				roomBDirs.push(DIR_OPPOSITES[dir])
		}

		return this.makeTwoWayConnection(roomIdA,roomIdB,roomADirs,roomBDirs,propsBase);
	}

	makeHiddenDoor(roomIdA,roomIdB,roomADirs,roomBDirs=[]){
		let propsBase = {
			isHidden: true,
			doorDescription: '',
			lockDescription: '',
			lockPuzzleIds: [],
		}

		if(!roomBDirs.length){
			for( let dir of roomADirs)
				roomBDirs.push(DIR_OPPOSITES[dir])
		}

		return this.makeTwoWayConnection(roomIdA,roomIdB,roomADirs,roomBDirs,propsBase);
	}

	validatePuzzleId(puzzleId){
		if(this.validate && !componentExists(this.puzzleMap,puzzleId))
			throw new Error(puzzleId+' does not exist in puzzle map');		
	}


	//To Interact with a map (RO)
	getValidMovementDirections(extra){
		let directions = {};

		for( const roomId in this.roomMap)
			for( const dir in this.roomMap[roomId].paths)
				directions[dir]=dir;

		for( let key in extra )
			directions[key] = extra[key];

		return directions
	}

	getMapElement(id, type){
		let map = (type === 'room') ? this.roomMap : (type==='path') ? this.pathMap : this.puzzleMap;

		if(componentExists(map,id))
			return map[id]
		else
			throw new Error( 'Invalid ' + type + ' id:' + id);
	}

	getRoom(id){
		return this.getMapElement(id,'room')
	}

	getPath(id){
		return this.getMapElement(id,'path')
	}

	getPuzzle(id){
		return this.getMapElement(id,'puzzle')
	}

	getVisiblePuzzles(){
		let puzzles = [];

		for(const puzzleId in this.puzzleMap)
			if(this.getPuzzle(puzzleId).rendered)
				puzzles.push(this.getPuzzle(puzzleId))

		return puzzles
	}

	addPuzzleHints(hintMap){
		this.puzzleHints = hintMap;
	}

	getPuzzleHints(puzzleId){
		return this.puzzleHints[puzzleId];
	}
}

export default MapEngine;