import React from 'react';
import {dirText} from "../../lib/Utils.js";
import {DIRS} from "../../lib/Constants.js";
import RoomAdv from "../RoomAdv.js";
import PuzzleSpot from "../../components/PuzzleSpot.js";

class RoomBlueM2 extends RoomAdv{
	constructor(props){
		super(props);

		this._puzzleIDs = ['P7'];
	}

	render(direction,path){
		let paths = this.renderPaths([DIRS.U]); //skip the escalator

		return <span>{dirText(direction)} blue wing second floor lobby. {this.puzzle()}{paths}{this.escalator()}</span>
	}

	puzzle(){
		if( this.ME.getPuzzle('P5').solved && this.ME.getPuzzle('P6').solved )
			return <span> A bunch of the lights in the Light House on the southern side of the room are lit up and projecting a set of <PuzzleSpot PSCB={this.ME.PSCB} ME={this.ME} puzzleId={'P7'} text={<u>questions</u>}/> on the ceiling. </span>
		else
			return null
	}

	puzzleIds(){
		return ['P7'];
	}

	escalatorState(){
		let S3 = this.ME.getPuzzle('S3').solved;
		let S6 = this.ME.getPuzzle('S6').solved;

		if( S3 && S6  )
			return 3
		else if(S3)
			return 2
		else if(S6)
			return 1
		else 
			return 0 
	}

	escalator(){
		let msg = '';

		switch(this.escalatorState()){
			case 0:
				msg = <span>The escalators to the first floor seem very broken and not in the normal 'becoming stairs' way.  The stairs themselves are missing; you'd have to climb across a ton of fast moving metal parts.</span>;
				break;
			case 1:
				msg = <span>The escalators are working but terrifying.  They have power and now seem like giant death machines.</span>;
				break;
			case 2:
				msg = <span>Many of the escalators' metal parts have retracted, but they still aren't safe enough to use.</span>;
				break;
			case 3:
				msg = <span>The escalators seem to be working.  You can go <b>down</b> to the first floor.</span>
				break
			default:
				msg = <span>You're really special you broke the game.  Not a joke.  Hopefully you can go <b>down</b> to the first floor.  If not you may need to reload.</span>
		
		}

		return msg;	
	}
}

export default RoomBlueM2






























