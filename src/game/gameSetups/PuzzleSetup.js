import React from 'react';
import {tableInit} from "../../lib/Utils.js";

class PuzzleSetup extends React.Component{
	init(GB,storedSettings){
		let puzzles = this.puzzleProps();

		for(let puzzleProp of puzzles){
			GB.createPuzzle(puzzleProp);
		}
	}

	puzzleProps(){

		let puzzles = tableInit([
			["id","name","answer","description","image"],
			["P0","testing","hello","description","none"],
		]);

		return( puzzles);
	}
}

export default PuzzleSetup