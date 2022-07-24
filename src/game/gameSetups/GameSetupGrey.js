import React from 'react';
import GameSetupBase from "./GameSetupBase.js";
import {DIRS} from "../../lib/Constants.js";
import PuzzleSpot from "../../components/PuzzleSpot.js";

class GameSetupGrey extends GameSetupBase{
	initRoomsPathsPuzzles(GB,storedSettings={}){
		//outside entrace
		let start = GB.createRoom({
			id: "START",
			descriptions: [<span>You find yourselves trapped just outside the front lobby of the Boston Museum of science, with all the surrounding roads completely flooded.  There's a <PuzzleSpot PSCB={this.props.PSCB} puzzleId={'P0'} text={<u>small sign</u>}/> on the door.</span>],
		})

		let LANDING = GB.createRoom({
			id: "LANDING",
			descriptions: [<span>on the door and wait a few seconds with no answer.  As you go to knock again a trap door opens below you, and you drop into a dim room</span>],
		})

		let AL0 = GB.createRoom({
			id: "AL0",
			descriptions: ["atrium's basement"],
		});

		let AL1 = GB.createRoom({
			id: "AL1",
			descriptions: ["museum's main lobby"],
		});

		let AL2 = GB.createRoom({
			id: "AL2",
			descriptions: ["lobby bridge"],
		})

		GB.connectRooms( start, LANDING, ['knock'], {doorDescription:'slide',lockPuzzleIds:[],descriptions:["testing"]});
		GB.makeDoor(LANDING, AL0, [],[DIRS.N]);
		GB.makeDoor(AL1, AL0, [],[DIRS.D],[DIRS.U],"staircase");

		return {AL0,AL1,AL2}
	}
}

export default GameSetupGrey;