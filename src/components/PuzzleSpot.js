import React from 'react';

//A PuzzleSpot is a simple class that takes in a puzzle ID and a callback to do all the work. 
//Makes inline puzzle writing much more convenient.  Usage is:
// <span> well howdy do how about you <PuzzleSpot PSCB={this.PSCB} puzzleId={puzzleId} text={<u>find something to do<u>} or go away</
class PuzzleSpot extends React.Component{

	render(){
		let onClick = this.props.PSCB(this.props.puzzleId);
		onClick.bind(this);

		return(<span onClick={onClick}><u>{this.props.text}</u></span>)
	}
}

export default PuzzleSpot