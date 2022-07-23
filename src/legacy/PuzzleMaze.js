import React from 'react';
import { Image, Button } from 'react-bootstrap/dist/react-bootstrap.min.js';
import InitBoard from "./InitBoard.js";
import {DIRS} from "./Constants.js";

class ActionList extends React.Component {

	render(){
		return (
			<ul>
			{this.props.actions.map((action) => (
				<li key={action.id}>
					<div className="content">{action.message}</div>
					<PuzzleButton handleModalShowCallback={this.props.handleModalShowCallback} puzzleId={action.puzzleId} puzzles={this.props.puzzles}/>
				</li>
			))}
			</ul>
			);
	}
}

class PuzzlePopups extends React.Component {
	constructor(props) {
		super(props);

		var initialState = new InitBoard();

		this.state = { 
			actions:         [], 
			inputText:       '', 
			currentPuzzleId: '',

			roomId:  initialState.board.startingRoomId,
			board:   initialState.board,
			puzzles: initialState.puzzles,
		};

		this.validDirections = this.getValidDirections();

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.dirList = [DIRS.N,DIRS.S,DIRS.W,DIRS.E];

		let action = this.state.board.roomDescriptionDetails(this.state.roomId);
		action.puzzleId = ''
		action.id       = Date.now();
		action.message  = action.text;

		this.state.actions = [action];
		console.log(this.state.actions);
	}

	//UI rendering & bindings
	render() {       
		return (
			<div> 
				<div className="container">
					<ActionList actions={this.state.actions} puzzles={this.state.puzzles.puzzles} handleModalShowCallback={this.props.handleModalShowCallback}/>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="new-action"> What would you like to do?</label>
						<input id="new-action" onChange={this.handleChange} value={this.state.inputText} />
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

	getValidDirections(){
		var directions = this.state.board.getAllPathDirections();

		let extra = {
			n: DIRS.N,
			s: DIRS.S,
			e: DIRS.E,
			w: DIRS.W,
		};

		for( const key in extra )
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
		var defaultMsg = {text:"??? - Currently invalid input"}

		if(text==="look"){
			this.publishResult(this.state.board.roomDescriptionDetails(this.state.roomId));
		}else if( this.checkAnswer(this.state.roomId,text).match){
			//Is this the answer to a puzzle?
			data = this.checkAnswer(this.state.roomId,text);

			if(!this.state.puzzles.puzzles[data.id].solved){
				this.applyCorrectAnswer(data.id);
				this.publishResult({text:this.answerClearedMessage(data.id)})
			}else{
				this.publishResult({text:"You've already solved that puzzle"});
			}
		}else if(text in this.validDirections){
			if(this.canGo(this.state.roomId,this.validDirections[text]).canGo){
				data = this.moveRooms(this.validDirections[text]);
				this.publishResult(data)	
			}else{
				data = this.canGo(this.state.roomId,this.validDirections[text]);

				if(data.isLocked)
					this.publishResult({text:'The door is locked'})
				else
					this.publishResult(defaultMsg)
			}			
		}else{
			this.publishResult(defaultMsg)
		}
	}

	//Logic for handling changing state (movement & puzzle answers)
	checkAnswer(roomId, input){
		let puzzleIds = this.state.board.puzzleIdsforRoom(roomId);
		var result    = {match:false,id:''}

		for( let id of puzzleIds){
			if(this.state.puzzles.puzzles[id].answer === input.replace(/\s+/g,'')){
				result = {match:true, id}
				break;
			}
		}

		return result;
	}

	applyCorrectAnswer(puzzleId){
		let puzzles = this.state.puzzles;
		puzzles.puzzles[puzzleId].solved = true;

		let board   = this.state.board;
		let lockIds = board.puzzleToLockMap[puzzleId];

		for(let lockId of lockIds){
			for( let pathId of board.lockToPathMap[lockId] ){
				if(board.canUnlockPath(pathId, puzzles)){
					board.paths[pathId].isLocked = false;
				}        
			}  
		}

		const newState = {
			puzzles: puzzles,
			board:   board,
		}

		this.setState( newState );
	}

	answerClearedMessage(puzzleId){
		return this.state.puzzles.puzzles[puzzleId].onSolvedMessage()
	}

	moveRooms(direction){
		let roomIdOld = this.state.roomId;
		let roomIdNew = this.state.board.nextRoomId(roomIdOld, direction);

		const newState = {
			roomId: roomIdNew
		}

		this.setState( newState )

		var result = this.state.board.roomDescriptionDetails(roomIdNew);
		var text = 'You ';

		if(this.dirList.includes(direction))
			text += 'go ' + direction + ' into ';
		else
			text += direction;

		result.text = <div>{text}{result.text}</div>;

		return result;
	}

	canGo(roomId, direction, lockMatters=true ){ return this.state.board.canGo(roomId,direction,lockMatters)}

	validateAction(action){
		return( true )
	}

	publishResult(message){
		const newAction = {
			message: message.text,
			puzzleId: ( "puzzleId" in message ) ? message.puzzleId : '',
			id: Date.now()
		};

		this.setState(state => ({
			actions: state.actions.concat(newAction),
			inputText: '',
			currentPuzzle: message.puzzleId,
		}));
	}

}

class PuzzleButton extends React.Component{
	constructor(props){
		super(props);
		this.handleClickPuzzle = this.handleClickPuzzle.bind(this);
	}

	handleClickPuzzle(){
		var puzzle = this.props.puzzles[this.props.puzzleId];
		var image  = puzzle.image;

		var callback = this.props.handleModalShowCallback("",<Image className="center-block" float="center" src={image} responsive/>);
		callback();   
	}

	render(){
		var result = null

		if(this.props.puzzleId !== '')
			result = <Button variant="info" onClick={this.handleClickPuzzle}>Puzzle?</Button>;

		return result  
	}
}

export default PuzzlePopups;