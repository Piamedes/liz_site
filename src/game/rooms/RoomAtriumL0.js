import React from 'react';
import {componentExtract,componentExists,dirText} from "../../lib/Utils.js";
import {DIR_LIST,DIRS} from "../../lib/Constants.js";
import RoomAdv from "../RoomAdv.js";

class RoomAtriumL0 extends RoomAdv{
	constructor(props){
		super(props);
		
		//I expect flags to be updated whenever the subscribed puzzles are updated - HOW?!?!
		this.FLAGS = {
			sculpture: 0,
			floodWaters: 0,
		}

		this._puzzleIDs = [];

		//this.puzzleRefs = //some function that uses GB and the list of puzzle IDs to register callbacks to when the puzzles change somehow????
	}

	render(direction,path){
 		return <span>{this.preface(direction)} {this.floodWaters()} The <b>eastern</b> exit to the blue wing is wide open. The <b>southern</b> door goes to the natural mysteries room. {this.westExit()} {this.staircase()}</span>;	
	}

	preface(direction){
		let msg = dirText(direction);

		return <span>{msg} the lobby basement.</span>
	}

	floodWaters(){
		let msg = '';

		switch(this.FLAGS.floodWaters){
			case 0:
				msg = <span>Large waves crash against the wharf outside the back entrance, the spray raining on the backdoor.</span>;
				break;
			case 1:
				msg = <span>Water is pooling up on the floor as the waves keep getting larger.</span>;
				break;
		}

		return msg;		
	}

	westExit(){
		return this.ME.getPath(this.paths[DIRS.W]).render(DIRS.W,this.id)
	}

	staircase(){
		let msg = '';

		switch(this.FLAGS.sculpture){
			case 0:
				msg = <span>The staircase seems to be missing, and there's small spiral sculpture in it's place.</span>
				this.FLAGS.sculpture = 1;
				break;
			case 1:
				msg = <span>That odd spiral sculpture is still where the stairs used to be.</span>
		}

		return msg;
	}
}

export default RoomAtriumL0






























