import React from 'react';
import {dirText} from "../../lib/Utils.js";
import {DIRS} from "../../lib/Constants.js";
import RoomAdv from "../RoomAdv.js";

class RoomAtriumL0 extends RoomAdv{
	constructor(props){
		super(props);

		this.staircaseRendered = false;
	}

	render(direction,path){
 		return <span>{this.preface(direction)} Large waves crash against the wharf outside the back entrance, the spray raining on the backdoor. The <b>eastern</b> exit to the blue wing is wide open. The <b>southern</b> door goes to the natural mysteries room. {this.westExit()} {this.staircase()}</span>;	
	}

	preface(direction){
		let msg = dirText(direction);

		return <span>{msg} the lobby basement.</span>
	}

	westExit(){
		return this.ME.getPath(this.paths[DIRS.W]).render(DIRS.W,this.id)
	}

	staircase(){
		let msg = '';

		if( this.ME.allRoomsVisitedOnce() ){
			if(!this.staircaseRendered){
				msg = <span>The marble sculpture seems to be making a grinding noise.  As you continue to watch it starts spinning and sinking into the ground.  In it's place a staircase <b>down</b> has appeared.</span>
				this.staircaseRendered = true;
				this.ME.getPuzzle('S7').solve();
			}else{
				msg = <span>There's a staircase <b>down</b> to somewhere in the statue's place</span>
			}
		}else{
			this.ME.resetRoomVisitMap();
			msg = <span>The staircase seems to be missing, and there's marble spiral sculpture in it's place.</span>
		}

		return msg;
	}
}

export default RoomAtriumL0






























