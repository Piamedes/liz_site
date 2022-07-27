import React from 'react';
import GameSetupBase from "./GameSetupBase.js";
import {DIRS} from "../../lib/Constants.js";
import PuzzleSpot from "../../components/PuzzleSpot.js";
import RoomAtriumL0 from "../rooms/RoomAtriumL0.js";

class GameSetupGrey extends GameSetupBase{
	initRoomsPathsPuzzles(GB,storedSettings={}){
		//outside entrace
		let start = GB.createRoom({
			id: "START",
			descriptions: [<span>You find yourselves trapped just outside the front lobby of the Boston Museum of science, with all the surrounding roads completely flooded.  There's a <PuzzleSpot PSCB={this.props.PSCB} puzzleId={'P0'} text={<u>small sign</u>}/> on the door.</span>],
			includeDirText: false,
		})

		let LANDING = GB.createRoom({
			id: "LANDING",
			descriptions: [
				<span>on the door and wait a few seconds with no answer.  As you go to knock again a trap door opens below you, and you drop into a dim room filled with old shells and other boring natural science stuff.  There's a door to the <b>north</b> out to the lobby basement.</span>,
				<span>the natural mysteries room, which is still just a dim room filled with old shells and other boring natural science stuff.  There's a door to the <b>north</b> out to the lobby basement.</span>
			],
		})

		let AL0 = GB.addRoom( new RoomAtriumL0({id:"AL0"}) );

		// let AL0 = GB.createRoom({
		// 	id: "AL0",
		// 	descriptions: [<span>the lobby basement.  The <b>eastern</b> exit to the blue wing is wide open. The <b>southern</b> door goes to the natural mysteries room.  </span>],
		// });

		let AL1 = GB.createRoom({
			id: "AL1",
			descriptions: ["museum's main lobby"],
		});

		let AL2 = GB.createRoom({
			id: "AL2",
			descriptions: ["lobby bridge"],
		})

		GB.connectRooms( start, LANDING, ['knock'], {doorDescription:null,lockPuzzleIds:[]});
		GB.makeDoor(LANDING, AL0, [],[DIRS.N],[DIRS.S],null);
		GB.makeDoor(AL1, AL0, [],[DIRS.D],[DIRS.U],"staircase");

		return {AL0,AL1,AL2}
	}
}

export default GameSetupGrey;

//where the staircase 