import React from 'react';
import {dirText,getSavedValue,setSavedValue} from "../../lib/Utils.js";
import RoomAdv from "../RoomAdv.js";

class RoomGreenTrophy extends RoomAdv{
	constructor(props){
		super(props);


		this.entered = getSavedValue(this.id,'entered',false);
	}

	render(direction,path){
		let msg

		if(!this.entered){
			msg = <span>You walk into the trophy room, and everything is a little bit off from what you recall the last time you were in this creepy room.  The hunting trophies are mostly still there, but some have been replaced by items with abusrdely fantastical labels.  Browsing you find:  Harry Potter's Wand, Mjölnir, Lucky Vial of Mysterious Fluid, Hylian Shield, an empty spot with a label for 'Excalibur', Elastic Cowl of Cowering, and Bag of Holding.  You notice a note on the desk, but as you turn to go read it you accidentally knock over the tiny sack on the bag of holding stand, which falls over and somehow a large sword falls out.  Because at this point why the hell not, you grab the bag, shove everything inside, and take it all with you.  <br/>The note on the table simply states "visit every room only once to leave".  Next to the note is a keycard that will let you use the service hallways throughout the museum.  You can leave to the <b>south</b>.</span>;
			this.entered = true;
			setSavedValue(this.id,'entered',true)
			this.ME.showHiddenPaths();
		}else{
			msg = <span>{dirText(direction)} the trophy room.  The stands for all the items you took sit empty (Harry Potter's Wand, Mjölnir, Lucky Vial of Mysterious Fluid, Hylian Shield, an empty spot with a label for 'Excalibur', Elastic Cowl of Cowering, and Bag of Holding).  The note on the table simply states "visit every room once to leave".  You can leave to the <b>south</b>.</span>
		}

		this.ME.resetRoomVisitMap()

		return msg;
	}

	puzzleIds(){
		return ['S7'];
	}
}

export default RoomGreenTrophy