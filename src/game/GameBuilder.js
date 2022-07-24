import React from 'react';

import {clone, componentExists} from "../lib/Utils.js";
import {DIR_OPPOSITES} from "../lib/Constants.js";
import Room from "./Room.js";
import Path from "./Path.js";
import Puzzle from "./Puzzle.js";

class GameBuilder extends React.Component{
	constructor(props){
		super(props);

		this.player    = {};
		this.roomMap   = {};
		this.puzzleMap = {};
		this.pathMap   = {};

		this.validate = false;
	}

	createRoom(props){
		if( props.id in this.roomMap )
			throw new Error( 'room id already in use')
		else{
			this.roomMap[props.id] = new Room(props);

			for(const puzzleId in this.roomMap[props.id]._puzzleIds)
				this.validatePuzzleId(puzzleId);
	
			return props.id;
		}
	}

	createPuzzle(props){
		if( props.id in this.puzzleMap )
			throw new Error( 'puzzle id already in use')
		else{
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
		let newProps = clone( propsBase );

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

	validatePuzzleId(puzzleId){
		if(this.validate && !componentExists(this.puzzleMap,puzzleId))
			throw new Error(puzzleId+' does not exist in puzzle map');		
	}
}

export default GameBuilder;