import React from 'react';
import {componentExtract,componentExists,dirText} from "../../lib/Utils.js";
import {DIR_LIST,DIRS} from "../../lib/Constants.js";
import RoomAdv from "../RoomAdv.js";

class RoomBlueM0 extends RoomAdv{
	constructor(props){
		super(props);

		this._puzzleIDs = [];
	}

	render(direction,path){
		let paths = this.renderPaths([DIRS.U]); //skip the escalator

		return <span>{dirText(direction)} blue wing basement. {paths}{this.escalator()}</span>
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
				msg = <span>The escalators seem to be working.  You can go <b>up</b> to the first floor of the blue wing.</span>
		}

		return msg;	
	}
}

export default RoomBlueM0






























