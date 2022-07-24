import React from 'react';

//A PuzzleSpot is a simple class that takes in a puzzle ID and a callback to do all the work. 
//Makes inline puzzle writing much more convenient.  Usage is:
// <span> well howdy do how about you <PuzzleSpot PSCB={this.props.PSCB} puzzleId={this.props.puzzleId} text={this.props.text} or go away</
class PuzzleSpot extends React.Component{
	constructor(props){
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick(){
		this.props.PSCB(this.props.puzzleId);
	}

	render(){
		return(<span onClick={this.onClick}><u>{this.props.text}</u></span>)
	}
}

export default PuzzleSpot