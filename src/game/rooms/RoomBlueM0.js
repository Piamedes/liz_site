import React from 'react';
import {componentExtract,componentExists,dirText} from "../../lib/Utils.js";
import {DIR_LIST,DIRS} from "../../lib/Constants.js";
import RoomAdv from "../RoomAdv.js";

class RoomBlueM0 extends RoomAdv{
	constructor(props){
		super(props);
		
		//I expect flags to be updated whenever the subscribed puzzles are updated - HOW?!?!
		this.FLAGS = {
			escalator: 0,
		}

		this._puzzleIDs = [];
	}

	render(direction,path){
		let paths = this.renderPaths([DIRS.U]); //skip the escalator

		return <span>{dirText(direction)} blue wing basement. {paths}{this.escalator()}</span>
	}

	escalator(){
		let msg = '';

		switch(this.FLAGS.escalator){
			case 0:
				msg = <span>The escalators to the first floor seem very broken and not in the normal 'becoming stairs' way.  The stairs themselves are missing; you'd have to climb across a ton of fast moving metal parts.</span>;
				break;
			case 1:
				msg = <span>COMPLETE LATER</span>;
				break;
		}

		return msg;	
	}
}

export default RoomBlueM0






























