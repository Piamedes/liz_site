import React from 'react';
import {tableInit} from "../../lib/Utils.js";

class PuzzleSetup extends React.Component{
	init(ME,storedSettings){
		let puzzles = this.puzzleProps();

		for(let puzzleProp of puzzles){
			ME.createPuzzle(puzzleProp);
		}

		ME.addPuzzleHints(this.hintMap());
	}

	puzzleProps(){
		var boolean = require('../../resources/boolean.png');
		var tetris  = require('../../resources/tetris.png');

		//multiple possible paths after the invitation:
		let puzzles = tableInit([
			["id",	"name",							"answer",								"image",  		"symbol",  			"verbose", "pdf"],
			//standard:  looping back and forth
			["P0",	"Invitation",					"knock",								tetris,	  		"envelope",			false	 ],
			["P1",	"Abydos",	    				"pyramid",								null,			"circle",			true	 ],  //math room, unlocks lightning basement
			["P2",	"Got an Ood Feeling", 			"reflect upon the dangers vampire",		null,			"orb",				true	 ],  //attic, unlocks green basement landing
			["P3",	"Familiar Faces",				"melody pond",							null,			"tv",				true 	 ],  //hall of human life, unlocks venice
			["P4",	"Bad Wolf",						"gallifrey",							null,			"wolf",				true	 ],  //venice room, unlocks bridge
			["P5",	"Time Loops",					"peri brown",							null,			"dalek",			true	 ],
			["P6",	"Who am I",						"king arthur pendragon",				null,			"sword",			true	 ],

			//secret 1/2:  turtle->lab->main floor or dino->main floor
			["S1",	"T Rex",						['climb','scale','scramble'],			null,	  		"t rex",			false	 ],
			["S2",	"P3X-179",						"boom",									null,			"box",				true	 ],  //turtle room, unlocks lightning exit
			["S3",	"Tetris",						"6886",									tetris,			"tetromino",		true	 ],  
			["S4",	"Boolean",						"314725",								boolean, 		"equal sign",		true	 ],  
			["S5",	"Searching for Artifacts",		"zero point module",					null,			"artifact",			true	 ],  
			["S6",	"Thirteeen Steps to Victory",	"the ori",								null,			"letters",			true	 ],  
			["S7",	"Trophy Puzzle",				null,									null,			null,				false	 ], 
			
			//endings
			["E1",	"You Slayed the Dragon",		"stealthier",							null,	  		"dragon",			false	 ],
			["E2",	"The Enchanted Forest",			"magic",								null,	  		"trees",			false	 ],
		]);

		return( puzzles);
	}

	hintMap(){
		let map = {
			P0:[
				'HINT ME',
			],
			P1:[
				"The dots are arrange very specifically such that you can create 7 straight lines",
				"Use the 7 glyphs on the second page.  Notice that they show up twice.",
				"The pairs are semaphore",
				"Use number of dots in the lines created in step one to determine letter placement",
				"Pyramid",
			],
			P2:[
				'You need to pay attention to only some of the numbered circles, but which ones?',
				'Try looking at only the Ood ones (odd numbered circles)',
				'"Unable to see" the solution?  Are you blind?',
				'They form four rows of Braille',
				"The last row doesn't code right. Perhaps the lines so far and/or the flavor text could help? What is the 'Angle of Incidence'?",
				"The Braille on the last line is reflected along the vertical axis",
				'REFLECT UPON THE DANGERS VAMPIRE (mirrored Braille)'
			],
			P3:[
				'Each set of answer blanks will be the name of a famous actor or actress.  Famous means IMDB top 100 of all time',
				'There is a movie in the collection at the bottom for each actor or actress',
				'Each real name (or part of a name) is obscured in the puzzle by a related word like a synonym, e.g. Harri=Badger, son=child, Ford=Cross',
				'Also consider homophones like "Right and Wright"',
				'Also consider similar things like "Lem(m)on and Lime"',
				'Also consider instances of things like "Fawkes and Phoenix"',
				'The actors and actresses, in order, are Jack Lemmon, Nic Cage, Peter Sellers, Harrison Ford, Heath Ledger, Cary Grant, River Phoenix, Robin Wright, John Hurt, Brad Pitt',
				'Putting the names in place, you get "Melody Pond".',
			],
			P4:[
				"There's an important # you get to get out of the flavor text.  It'll help you find the answers to the clues",
				"Each answer will be exactly seven letters (The number of letters in BadWolf, The 7 seas, the 7 muses, and the 7 deadly sins)",
				"Notice the first letters of each clue spell out 'Bad Wolf' in each column.",
				"Each answer will also start with the letters from Bad Wolf",
				"The answers to the clues are: Baptist, Azimuth, Dictate, Weekend, Orlando, Laconic, Fastest, Buffalo, Another, Detours, WH Smith, Oregano, Legroom, Frisbee",
				"You've looked at the first letter of each answer.  Perhaps look at a different letter?",
				"The last letters spell 'The Doctor's Home' which is GALLIFREY, as found on the reference sheet"
			],
			P5:[
				"You are going to need your code sheet for this one",
				"The flavor text keywords to notice: 'Organize' 'Parallel'.",  
				"You have to view the loops side-by-side",
				"Rotate the loops until they match up TARDIS with TARDIS and Dalek with Dalek and number with number",
				"The dots on the Daleks are Braille ",
				"Each TARDIS is one of the two semaphore flag pairs ",
				"You need to read both sides of each loop ",
				"The Daleks' message is 'SUBTRACT NINETY' ",
				"The Doctor's message is 'REPAIR LOOPS' ",
				"The Dalek's message is telling you how to interpret the numbers. Subtract ninety from each then look up the decimal letter on the code sheet ",
				"The Doctor's message is telling you that you now need to recombine the two loops into one loop. ",
				"If you put the loops together correctly, the numbers spell out 'MORSE CODE' on one side and 'WRONG SIDE' on the other side. ",
				"This is telling you to read the loop one more time but decoding morse code with every TARDIS a Dash and every Dalek a Dot (A Dalek is a single Dot regardless of the number of Braille dots on its chassis). Numbers separate morse letters. Only one side will decode correctly, the 'WRONG SIDE' won't",
				"'PERI BROWN', one of the Doctor's companions as listed on the reference sheet",
			],
			P6:[
				"The answers to these 20 questions will clue you to the meta puzzle answer by describing it. But what are the answers?",
				"Answer each question using the puzzle answer from the puzzle specified in the first column. For example, Answer 1 is 'Yes' because River Song grows and breathes",
				"Use the reference material provided to help answer the questions",
				"There are four indicated letters at the bottom, find those four letters using the five questions answers for each puzzle.", 
				"This is done via a binary translation to find the letters, yes is 1. ",
				"The answers to the questions are FF->Y,N,N,Y,N=R / OF->N,N,Y,N,Y=E / BW->N,N,Y,Y,Y=G / TL->N,Y,Y,Y,Y=O",
				"Now play normal 20 questions and try to figure out the answer as if ALL these 20 questions were all being asked about the meta's answer",
				"To summarize.  A fictional character from Earth born a long time ago, often in a castle, which has a place of authority which is round, who is not a wizard, but is a warrior noble.  someone sacrificed thier life for him or her and he or she has a friend with extraordinary abilities",
				"The first word is KING.  Know any fictional kings from old stories?",
				"The 20 questions describe 'KING ARTHUR PENDRAGON'",			
			],
			S1:[
				"What would be awesome to do with a dinosaur?",
				"Can the T Rex help you get to another room?",
				"Climb/Scramble/Scale",
			],
			S2:[
		    	"Create the single path from the start to end with the pieces.",
		    	"What is left?",
		    	"BOOM",		
			],
			S3:[
				"HINT ME",
			],
			S4:[
				"HINT ME",
			],
			S5:[
				"Shaded letters are the first letter of each answer",
				"Ascend, Glyph, Jumper, Daedalus, Embarkation, Aurora, Atalantis, Chevron, Anubis",
				"What do you have left over?",
				"Zero Point Module",
			],
			S6:[
				"You must use the other stargate puzzles to solve!",
				"Place the puzzle answers in one of the grids",
				"Translate the ancient into another grid and then convert to letters some how",
				"The coversion is based on the puzzle the matching answer in the grid location is from.",
				"The first set, use Abyods and count around the 1st page stargate then put the symbol into the grid like you did when you originally solved that puzzle",
				"Second set use P3X-179 and use the grid coordinates",
				"Third set use Artifact",
				"It seems like there are errors?  Or are those relevant? This grid is so nicely laid out for a certain encoding that use 2*3 blocks",
				"Using braille, use only the blocks where the letters match both the puzzle answers and the ancient translations",
				"THE ORI",
			],
			S7:[
				'This is a victory lap of all rooms NOT all paths',
				'You will have to use the new off-floor paths',
				'Figure out the starting and ending points first',
				'Starting Point - are there any rooms with one entrace/exit?',
				'The starting point is the tropy room',
				"Where does that then limit the possible ending points to?",
				"Are there any rooms with odd things you haven't figured out yet?",
				'The ending room is the atrium basement',
				'Multiple paths exist.  Go exploring and find all the now visible hidden paths',
			],
			E1:[
				"This is a form of a common puzzle type called 'Signpost' or 'Arrow Path'",
				"It's helpful to number each step of your path from 1 (The starting square in the top left corner) to 16 (the cave entrance in the lower right corner)",
				"Beyond the 'moors' is meant to clue morse code",
				"Bags of gold/coins on your path are dots, and keys are dashes.",
				"ITEMS COLLECTED: -- .- --. .. -.-.",
				"magic",
			],
			E2:[
				"This is a deduction puzzle.  Start with putting the line containing 'last 10 damage needed to slay the dragon' in the last slot.",
				"The dragon's damage will be consistent based on which attack he uses.  So his tail will always do 5 damage.",
				"As you can tell from the '20 damage kills you' line, his fire breath always must be avoided by using your cloak",
				"You'll want to heal when you're down to exactly 1 hit point.",
				"His jaws will do more damage than his claw",
				"Once you have the right choices, notice which item you used for each line.",
				"Apply the Initative value as an index on the puzzle answer corresponding to the item you used on each line",
				"STEALTHIER",
			],
		}

		return map;
	}
}

export default PuzzleSetup