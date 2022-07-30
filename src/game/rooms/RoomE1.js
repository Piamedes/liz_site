import React from 'react';
import RoomAdv from "../RoomAdv.js";
import PuzzleSpot from "../../components/PuzzleSpot.js";
import {getSavedValue,setSavedValue} from "../../lib/Utils.js";

class RoomE1 extends RoomAdv{
	constructor(props){
		super(props);

		this.entered = getSavedValue(this.id,'entered',false);
	}

	render(direction,path){
		if(!this.entered){
			this.ME.disableMovement();
			this.entered = true;
			setSavedValue(this.id,'entered',true)
			return <span>As the elevator doors open to the ceremony room, it's like stepping into a giant forest in another world.  The trees are huge, but you still can't see the sky through the canopy.  After only a few steps in you realize you're quickly lost.  While searching for any exit you stumble upon a surprisingly crisp <PuzzleSpot PSCB={this.ME.PSCB} ME={this.ME} puzzleId={'E1'} text={<u>tree carving</u>}/> and a question below it <br/> 'Marriage with the right person is just like?'</span>
		}else if(!this.ME.getPuzzle('E1').solved){ //only if they've called look?
			return <span>Feels like you're wandering around in circles, as you keep ending up at this <PuzzleSpot PSCB={this.ME.PSCB} ME={this.ME} puzzleId={'E1'} text={<u>tree carving</u>}/> and a question <br/> 'Marriage with the right person is just like?'</span>
		}else{
			this.ME.enableMovement();
			return <span>The forest looks magical and peaceful. {this.renderPaths()}</span>
		}
	}

	puzzleIds(){
		return ['E1'];
	}
}

export default RoomE1