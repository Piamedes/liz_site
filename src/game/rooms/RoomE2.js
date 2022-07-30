import React from 'react';
import {componentExtract,componentExists,dirText,getSavedValue,setSavedValue} from "../../lib/Utils.js";
import {DIR_LIST,DIRS} from "../../lib/Constants.js";
import RoomAdv from "../RoomAdv.js";
import PuzzleSpot from "../../components/PuzzleSpot.js";

class RoomE2 extends RoomAdv{
	constructor(props){
		super(props);
		this.entered = getSavedValue(this.id,'entered',false);
		this.attacked = getSavedValue(this.id,'attacked',false);
	}

	render(direction,path){
		let desc;
		let ps = <PuzzleSpot PSCB={this.ME.PSCB} ME={this.ME} puzzleId={'E2'} text={<u>piece of paper</u>}/>;

		if(!this.entered){
			this.ME.disableMovement();
			this.entered = true;
			setSavedValue(this.id,'entered',true)
			return <span>As you descend the twisting staircase it slowly turns from carved marble to rough-hewn stone.  You're starting to think that flavor text from the puzzle you found in the forest may not have been so meaningless after all.  Hope you took all the stuff from the tropy room, as a dragon comes around the corner.  <b>Attack</b>?</span>
		}else if(direction.toLowerCase()==='attack' ){ 
			this.attacked = true
		 	setSavedValue(this.id,'attacked',true)
			return <span>So that somehow worked and you have absolutely no recollection how and that's pretty annoying.  Confusingly there's a {ps} with 'game log' written on it and some instructions.</span>
		}else{
			return <span>There's just that {ps} with 'game log' written on it and some instructions.</span>
		}
	}

	puzzleIds(){
		return ['E2'];
	}
}

export default RoomE2