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

		//multiple possible paths after the invitation:
		let puzzles = tableInit([
			["id",	"name",			"answer",			"description",		"image",		"verbose"],
			["P0",	"Invitation",	"knock",			null,				"none",			false	 ],


			//standard:  looping back and forth
			["P1",	"MATH",		    "TBD",				"TBD",				"none",			true	 ],  //math room, unlocks lightning basement
			["P2",	"ATTIC",		"TBD",				"TBD",				"none",			true	 ],  //attic, unlocks green basement landing
			["P3",	"BEES",			"TBD",				"TBD",				"none",			true	 ],  //bee room, unlocks venice
			["P4",	"VENICE",		"TBD",				"TBD",				"none",			true	 ],  //venice room, unlocks bridge

			["P5",	"Turtles",		"TBD",				"TBD",				"none",			true	 ],
			["P6",	"Turtles",		"TBD",				"TBD",				"none",			true	 ],

			//secret 1/2:  turtle->lab->main floor or dino->main floor
			["PS1",	"TURTLES",		"TBD",				"TBD",				"none",			true	 ],  //turtle room, unlocks lightning exit
			["PS2",	"DINO",			"TBD",				"TBD",				"none",			true	 ],  


			//main blue floor
			["P7",	"ENG1",		"TBD",				"TBD",				"none",			true	 ],  //eng 1
			["P8",	"ENG2",		"TBD",				"TBD",				"none",			true	 ],  //eng 2
			["P9",	"ENG2",		"TBD",				"TBD",				"none",			true	 ],  //eng 2


			//Escalators
		]);

		return( puzzles);
	}
}

export default PuzzleSetup