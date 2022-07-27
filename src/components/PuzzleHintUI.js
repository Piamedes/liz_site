import React from 'react';
import PuzzleHint from './PuzzleHint.js';
import Accordion from 'react-bootstrap/Accordion';

class PuzzleHintUI extends React.Component {


	puzzleRow(puzzle){
		return <PuzzleHint key={puzzle.name} hints={puzzle.hints()}/>;
	}

	render(){
		return(
			<Accordion>
				{this.props.puzzles.map((puzzle)=>(
					<Accordion.Item eventKey={puzzle.id}>
						<Accordion.Header>{puzzle.name}</Accordion.Header>
						<Accordion.Body>{this.puzzleRow(puzzle)}</Accordion.Body>
					</Accordion.Item>))
			}
			</Accordion>
		);
	}
}

export default PuzzleHintUI