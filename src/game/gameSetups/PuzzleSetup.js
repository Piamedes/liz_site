import React from 'react';
import {tableInit} from "../../lib/Utils.js";
	import forest  from '../../resources/the_enchanted_forest.pdf';

class PuzzleSetup extends React.Component{
	init(GB,storedSettings){
		let puzzles = this.puzzleProps();

		for(let puzzleProp of puzzles){
			GB.createPuzzle(puzzleProp);
		}
	}

	puzzleProps(){

		var boolean = require('../../resources/boolean.png');
		var tetris  = require('../../resources/tetris.png');
	

		//multiple possible paths after the invitation:
		let puzzles = tableInit([
			["id",	"name",							"answer",								"image",  		"symbol",  			"verbose", "pdf"],
			//standard:  looping back and forth
			["E2",	"Invitation",					"knock",								tetris,	  		"envelope",			false	 , null],
			["P1",	"Abydos",	    				"pyramid",								null,			"circle",			true	 , null],  //math room, unlocks lightning basement
			["P2",	"Got an Ood Feeling", 			"reflect upon the dangers vampire",		null,			"orb",				true	 , null],  //attic, unlocks green basement landing
			["P3",	"Familiar Faces",				"melody pond",							null,			"tv",				true 	 , null],  //hall of human life, unlocks venice
			["P4",	"Bad Wolf",						"gallifrey",							null,			"wolf",				true	 , null],  //venice room, unlocks bridge
			["P5",	"Time Loops",					"peri brown",							null,			"dalek",			true	 , null],
			["P6",	"Who am I",						"king arthur pendragon",				null,			"sword",			true	 , null],

			//secret 1/2:  turtle->lab->main floor or dino->main floor
			["S1",	"T Rex",						['climb','scale','scramble'],			null,	  		"t rex",			false	 , null],
			["S2",	"P3X-179",						"boom",									null,			"box",				true	 , null],  //turtle room, unlocks lightning exit
			["S3",	"Tetris",						"6886",									tetris,			"tetromino",		true	 , null],  
			["S4",	"Boolean",						"314725",								boolean, 		"equal sign",		true	 , null],  
			["S5",	"Searching for Artifacts",		"zero point module",					null,			"artifact",			true	 , null],  
			["S6",	"Thirteeen Steps to Victory",	"the ori",								null,			"letters",			true	 , null],  
			["S7",	"Trophy Puzzle",				null,									null,			null,				false	 , null], 
			
			//endings
			["E1",	"You Slayed the Dragon",		"stealthier",							null,	  		"dragon",			false	 , null],
			["P0",	"The Enchanted Forest",			"magic",								null,	  		"trees",			false	 , forest],
		]);

		return( puzzles);
	}
}

export default PuzzleSetup