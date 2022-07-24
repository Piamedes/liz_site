import React from 'react';
import GameSetupMain from "./gameSetups/GameSetupMain.js";
import {DIRS,DIR_LIST} from "../lib/Constants.js";
import {camelCase} from "../lib/Utils.js";

class Game extends React.Component {
	constructor(props) {
		super(props);

		let initialSetup = new GameSetupMain();
		initialSetup.init()

		//OBJECTS IMPACTING STATE
		//setup the player object - it will maintain it's own state (so updates to it need to go through it's state function) -- does this need to be rendered at any point (maybe inventory screen)?
		this.player = initialSetup.player;
		//console.log(this.player.currentRoomId());
		//Room ID to room object (each with own state) - objects may be removed from state updates and pushed onto the message queue for rendering with that locked state
		this.roomMap = initialSetup.GB.roomMap;

		//Path ID to path object (each with own state) - objects may be removed from state updates and pushed onto the message queue for rendering with that locked state
		this.pathMap = initialSetup.GB.pathMap;

		//Puzzle ID to puzzle object (each with own state) - objects may be removed from state updates and pushed onto the message queue for rendering with that locked state
		this.puzzleMap = initialSetup.GB.puzzleMap;

		//REFERENCE INFO - this stuff doesn't change over time
		this.validDirections = this.getValidMovementDirections();
		this.dirList = DIR_LIST;

		this.processInput = this.processInput.bind(this);
	}

	getValidMovementDirections(){
		let directions = {};

		for( const roomId in this.roomMap)
			for( const dir in this.roomMap[roomId].paths)
				directions[dir]=dir;

		let extra = {
			n: DIRS.N,
			s: DIRS.S,
			e: DIRS.E,
			w: DIRS.W,
		};

		for( let key in extra )
			directions[key] = extra[key];

		return directions
	}

	//Logic for determining what inputs mean what and when
	processInput(rawText){
		/*
		Inputs can be one of three things:
		-direction to move, including secret ones that one work on a specific path on a specific room
		-puzzle answer
		-garbage

		Puzzle answers can only be applied to the room they're in, so first check that, then 
		*/
		let text = rawText.toLowerCase();
		let data = {}
		var msg  = {message:<p>??? - Currently invalid input</p>}

		if(text==="look"){
			msg = {message:this.roomMap[this.player.currentRoomId()].render()}
		}else if( this.checkAnswer(this.player.currentRoomId(),text).match){
			//Is this the answer to a puzzle?
			data = this.checkAnswer(this.player.currentRoomId(),text);

			if(!this.puzzleMap[data.id].solved()){
				this.applyCorrectAnswer(data.id);
				msg = {message:this.answerClearedMessage(data.id)};
			}else{
				msg = {message:<p>You've already solved that puzzle</p>};
			}
		}else if(text in this.validDirections){
			let direction 	= this.validDirections[text];
			let moveDetails = this.canMove(this.player.currentRoomId(),direction)

			if(!moveDetails.isLocked && moveDetails.exists){
				let moveMessage = this.moveRooms(direction); 
				msg = {message:moveMessage};	
			}else if(moveDetails.exists){
				msg = {message:moveDetails.message}
			}		
		}

		return msg
	}

	//Logic for handling changing state (movement & puzzle answers)
	checkAnswer(roomId, input){
		let puzzleIds = this.roomMap[roomId].puzzleIds();
		let match     = {match:false,id:''}

		for( let id of puzzleIds){
			if(this.puzzleMap[id].isCorrect(input)){
				match = {match:true, id}
				break;
			}
		}

		return match;
	}

	applyCorrectAnswer(puzzleId){
		this.puzzleMap[puzzleId].solve();

		for(let pathId in this.paths)
			this.paths[pathId].updateLockState(this.puzzleMap);
	}

	answerClearedMessage(puzzleId){
		return this.puzzleMap[puzzleId].onSolvedMessage()
	}

	renderPuzzles(roomId){
		return null
	}

	renderPaths(roomId){
    	let msg  = [];
    	let room = this.roomMap[roomId];

    	for( let key in room.paths){
    		if(this.pathMap[room.paths[key]].isVisible())
    			msg.push( <span><br/><b>{camelCase(key)}:  </b>{this.pathMap[room.paths[key]].render()}</span>)
    	}

    	return msg;
	}

	renderMessage(direction,roomIdNew){
		let text = 'You ';

		if(this.dirList.includes(direction))
			text += 'go ' + direction + ' into ';
		else
			text += direction + ' ';

		return <span>{text}{this.roomMap[roomIdNew].render()}{this.renderPuzzles(roomIdNew)}{this.renderPaths(roomIdNew)}</span>		
	}

	moveRooms(direction){
		let roomIdNew = this.pathMap[this.roomMap[this.player.currentRoomId()].paths[direction]].roomIdB;
	
		this.player.moveRooms(roomIdNew);

		return this.renderMessage(direction,roomIdNew)
	}

	canMove(roomId, direction, lockMatters=true ){ 
		let exists   = direction in this.roomMap[roomId].paths;
		let isLocked = !lockMatters || !( exists && !this.pathMap[this.roomMap[roomId].paths[direction]].isLocked());
		let message = (exists && !isLocked) ? <p>{this.pathMap[this.roomMap[roomId].paths[direction]].doorDescription}</p> : null

		return {
			isLocked,
			exists,
			message,
		}
    }
}

export default Game