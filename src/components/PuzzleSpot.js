import React from 'react';
import Image from 'react-bootstrap/Image';

//A PuzzleSpot is a simple class that takes in a puzzle ID and a callback to do all the work. 
//Makes inline puzzle writing much more convenient.  Usage is:
// <span> well howdy do how about you <PuzzleSpot PSCB={this.props.PSCB} puzzleId={this.props.puzzleId} text={this.props.text} or go away</
class PuzzleSpot extends React.Component{
	constructor(props){
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick(){
		this.props.PSCB(this.props.puzzleId,this.modalMessage());
	}

	modalMessage(){
		if( this.isPdf() )
			return null

		return <Image className="center-block" float="center" src={this.puzzle().image} responsive/>
				
	}

	puzzle(){
		return this.props.ME.getPuzzle(this.props.puzzleId)
	}

	isPdf(){
		return this.puzzle().image === null
	}

	pdfLink(){
		if(!this.isPdf())
			return null
		else
			return this.puzzle().name.toLowerCase().replaceAll(" ","_") + ".pdf"
	}

	render(){
		if( this.isPdf() )
			return <span><a target="_blank" rel="noopener" href={this.pdfLink()}><u>{this.props.text}</u></a></span>
		else
			return <span onClick={this.onClick}><u>{this.props.text}</u></span>
	}
}

export default PuzzleSpot