import React from 'react';

class PuzzleHintRow extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			isHovering: false,
		};

		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut  = this.handleMouseOut.bind(this);
	}

	handleMouseOver(){
		this.setState({isHovering:true})
	}

	handleMouseOut(){
		this.setState({isHovering:false})
	}

	hintText(){
		if(this.state.isHovering)
			return this.props.hintText
		else
			return 'Hover for Hint';
	}

	preface(){
		if(this.props.isSolution)
			return <b>SOLUTION: </b>
		else
			return null
	}

	render(){
		console.log('testing')
  		return <span>{this.preface()}<span onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>{this.hintText()}</span></span>
  	}
};

export default PuzzleHintRow;