import React from 'react';
import {componentExtract,componentExists,dirText} from "../../lib/Utils.js";
import {DIR_LIST,DIRS} from "../../lib/Constants.js";
import RoomAdv from "../RoomAdv.js";
import PuzzleSpot from "../../components/PuzzleSpot.js";

class RoomGreenM1 extends RoomAdv{
	render(direction,path){
		let paths = this.renderPaths(); //skip the escalator

		return <span>{dirText(direction)} {this.props.pathName}. {this.globeText()}{paths}</span>
	}

	globeText(){
		if( this.globeIsOpen() )
			return <span> The giant earth globe is spinning and the banner in front has switched to showing a <PuzzleSpot PSCB={this.ME.PSCB} ME={this.ME} puzzleId={'S6'} text={<u>puzzle</u>}/>. </span>
		else
			return <span> The giant earth globe sits silently in the middle of the room. </span>
	}

	puzzleIds(){
		return ['P1','S2','S5'];
	}

	globeIsOpen(){
		let open = true;

		for(const id of this.puzzleIds())
			open = open && this.ME.getPuzzle(id).solved;

		return open
	}
}

export default RoomGreenM1