import React from 'react';
import { Image, Button } from 'react-bootstrap/dist/react-bootstrap.min.js';
import GameSetup from "./GameSetup.js";
import {DIRS,DIR_LIST} from "../lib/Constants.js";
import {camelCase} from "../lib/Utils.js";
import MessageList from "../components/MessageList.js";

class Game extends React.Component {
	constructor(props) {
		super(props);

		let initialSetup = new GameSetup();
		initialSetup.init()

		//OBJECTS IMPACTING STATE
		//setup the player object - it will maintain it's own state (so updates to it need to go through it's state function) -- does this need to be rendered at any point (maybe inventory screen)?
		this.player = initialSetup.player;
		//console.log(this.player.currentRoomId());
		//Room ID to room object (each with own state) - objects may be removed from state updates and pushed onto the message queue for rendering with that locked state
		this.roomMap = initialSetup.roomMap;

		//Path ID to path object (each with own state) - objects may be removed from state updates and pushed onto the message queue for rendering with that locked state
		this.pathMap = initialSetup.pathMap;

		//Puzzle ID to puzzle object (each with own state) - objects may be removed from state updates and pushed onto the message queue for rendering with that locked state
		this.puzzleMap = initialSetup.puzzleMap;

		//Initial message for the first room
		let message = {
			render: initialSetup.roomMap[initialSetup.player.currentRoomId()].render(),
			id:     Date.now(),
		};

		console.log(message.render);

		//top level game state, let's say used for messages & layout for now
		this.state = {
			inputText: '',   	 //user input text
			messages: [message], //messages to render - each is an object with props to give correct input state
		};

		//REFERENCE INFO - this stuff doesn't change over time
		this.validDirections = this.getValidMovementDirections();
		this.dirList = DIR_LIST;

		//Callback bindings
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	//UI rendering & bindings
	render() {       
		return (
			<div> 
				<div className="container">
					<MessageList messages={this.state.messages} handleModalShowCallback={this.props.handleModalShowCallback}/>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="new-action">So?</label>
						<input id="new-action" onChange={this.handleChange} value={this.state.inputText}/>
					</form>
				</div>
			</div>
		);
	}

	handleSubmit(e){
		e.preventDefault();

		if (this.state.inputText.length) this.processInput()
		
		return
	}

	handleChange(e) { this.setState({ inputText: e.target.value });
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
	processInput(){
		/*
		Inputs can be one of three things:
		-direction to move, including secret ones that one work on a specific path on a specific room
		-puzzle answer
		-garbage

		Puzzle answers can only be applied to the room they're in, so first check that, then 
		*/
		let text       = this.state.inputText.toLowerCase();
		let data       = {}
		var defaultMsg = {message:<p>??? - Currently invalid input</p>}

		if(text==="look"){
			this.publishResult({message:this.roomMap[this.player.currentRoomId()].render()});
		}else if( this.checkAnswer(this.player.currentRoomId(),text).match){
			//Is this the answer to a puzzle?
			data = this.checkAnswer(this.player.currentRoomId(),text);

			if(!this.puzzleMap[data.id].solved()){
				this.applyCorrectAnswer(data.id);
				this.publishResult({message:this.answerClearedMessage(data.id)})
			}else{
				this.publishResult({message:<p>You've already solved that puzzle</p>});
			}
		}else if(text in this.validDirections){
			let direction 	= this.validDirections[text];
			let moveDetails = this.canMove(this.player.currentRoomId(),direction)

			if(!moveDetails.isLocked && moveDetails.exists){
				let moveMessage = this.moveRooms(direction); 
				this.publishResult({message:moveMessage});	
			}else if(!moveDetails.exists){
				this.publishResult(defaultMsg)
			}else{
				this.publishResult({message:moveDetails.message})
			}			
		}else{
			this.publishResult(defaultMsg)
		}
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
    			msg.push( <li><b>{camelCase(key)}:</b>{this.pathMap[room.paths[key]].render()} </li> )
    	}

    	return msg;
	}

	moveRooms(direction){
		let roomIdNew = this.pathMap[this.roomMap[this.player.currentRoomId()].paths[direction]].roomIdB;
	
		this.player.moveRooms(roomIdNew);

		let text = 'You ';

		if(this.dirList.includes(direction))
			text += 'go ' + direction + ' into ';
		else
			text += direction;

		return <div>{text}{this.roomMap[roomIdNew].render()}{this.renderPuzzles(roomIdNew)}{this.renderPaths(roomIdNew)}</div>
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

	validateAction(action){
		return( true )
	}

	publishResult(message){
		const newMessage = {
			message: message.message,
			puzzleId: ( "puzzleId" in message ) ? message.puzzleId : '',
			id: Date.now()
		};

		this.setState(state => ({
			messages: state.messages.concat(newMessage),
			inputText: '',
			currentPuzzle: message.puzzleId,
		}));
	}

}

export default Game