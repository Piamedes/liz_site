import React from 'react';
import MapSetup from "./gameSetups/MapSetup.js";
import {DIRS,DIR_LIST,DIRS_SHORT_MAP} from "../lib/Constants.js";
import {camelCase,componentExtract,componentExists} from "../lib/Utils.js";

class GameEngine extends React.Component {
	constructor(props) {
		super(props);

		let mapSetup = new MapSetup(props);
		mapSetup.init();
		this.mapEngine = mapSetup.ME;

		this.player = mapSetup.player;

		//REFERENCE INFO - this stuff doesn't change over time
		this.validDirections = this.mapEngine.getValidMovementDirections(DIRS_SHORT_MAP);
		this.processInput = this.processInput.bind(this);
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
		let text  = rawText.toLowerCase();
		let words = text.split(" ");
		let data  = {}
		var msg   = {message:<p>??? - Currently invalid input</p>}

		if(words[0]==='debug'){


		}else{

			if(this.isValidPuzzleSolutionInRoom(text)){
				msg = this.applyPuzzleSolutionInRoom(text);
				if(msg.message !== null)
					return msg;


				//some puzzles may require re-rendering.  how to do that:
				//{some unlock message}{look message from down below(which now will reflect new state)}
			};

			if(text==="look"||text==='l'){
				msg = {message:this.renderMessage('',this.player.currentRoomId())};
			}else if(text in this.validDirections){
				let direction 	= this.validDirections[text];
				let moveDetails = this.canMove(this.player.currentRoomId(),direction)

				if(moveDetails.exists){
					if(!moveDetails.isLocked ){
						let moveMessage = this.moveRooms(direction); 
						msg = {message:moveMessage};	
					}else{
						msg = {message:<span>You can't go that way, it's locked.</span>}
					}
				}
			}		
		}

		return msg
	}

	isValidPuzzleSolutionInRoom(text){
		let room    = this.mapEngine.getRoom(this.player.currentRoomId());
		let puzzles = room.puzzleIds();

		for(const puzzleId of puzzles){
			if(this.mapEngine.getPuzzle(puzzleId).isCorrect(text)){
				return true
			}
		}
	}

	applyPuzzleSolutionInRoom(text,defaultMsg){
		let puzzle = null;
		let msg    = defaultMsg;

		for(const puzzleId of this.mapEngine.getRoom(this.player.currentRoomId()).puzzleIds()){
			puzzle = this.mapEngine.getPuzzle(puzzleId);

			if(puzzle.isCorrect(text)){
				if(puzzle.solved){
					msg = {message:<p>You've already solved that puzzle</p>};
				}else{
					this.applyCorrectAnswer(puzzleId);
					msg = {message:this.answerClearedMessage(puzzleId)};				
				}

				break;
			}
		}

		return msg;
	}

	applyCorrectAnswer(puzzleId){
		this.mapEngine.getPuzzle(puzzleId).solve();
	}

	answerClearedMessage(puzzleId){
		return this.mapEngine.getPuzzle(puzzleId).onSolvedMessage()
	}

	renderMessage(direction,roomIdNew,path){
		return this.mapEngine.getRoom(roomIdNew).render(direction,path)
	}

	moveRooms(direction){
		let path      = this.mapEngine.getPath(this.mapEngine.getRoom(this.player.currentRoomId()).paths[direction]);
		let roomIdNew = path.roomIdB;
	
		this.player.moveRooms(roomIdNew);

		return this.renderMessage(direction,roomIdNew,path)
	}

	canMove(roomId, direction, lockMatters=true ){ 
		let exists   = direction in this.mapEngine.getRoom(roomId).paths;
		let isLocked = !lockMatters || !( exists && !this.mapEngine.getPath(this.mapEngine.getRoom(roomId).paths[direction]).isLocked());
		let message = (exists && !isLocked) ? <p>{this.mapEngine.getPath(this.mapEngine.getRoom(roomId).paths[direction]).doorDescription}</p> : null

		return {
			isLocked,
			exists,
			message,
		}
    }
}

export default GameEngine