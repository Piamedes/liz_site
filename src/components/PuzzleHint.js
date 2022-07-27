import React from 'react';
import PuzzleHintRow from './PuzzleHintRow.js';

class PuzzleHint extends React.Component {

	render(){

		let hints 	 = this.props.hints.slice(0,-1);
		let solution = this.props.hints[this.props.hints.length-1];

		return (
			<ol>
				{hints.map((hint) => (<li><PuzzleHintRow hintText={hint} isSolution={false}/></li>))}
				<PuzzleHintRow hintText={solution} isSolution={true}/>
			</ol>
			);
	}
}

export default PuzzleHint