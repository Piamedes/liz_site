import React from 'react';
import GameSetupBase from "./GameSetupBase.js";
import {DIRS} from "../../lib/Constants.js";
import PuzzleSpot from "../../components/PuzzleSpot.js";
import RoomAtriumL0 from "../rooms/RoomAtriumL0.js";
import RoomE2 from "../rooms/RoomE2.js";

class GameSetupGrey extends GameSetupBase{
	initRoomsPathsPuzzles(ME,storedSettings={}){
		//outside entrace
		let start = ME.createRoom({
			id: "START",
			descriptions: [<span>You find yourselves trapped just outside the front lobby of the Boston Museum of science, with all the surrounding roads completely flooded.  There's a note taped to the door: 'Welcome!  <b>Knock</b> for entry'<PuzzleSpot PSCB={this.props.PSCB} ME={this.props.ME} puzzleId={'P0'} text={''}/></span>],
			hiddenDescription: <span>You step back outside the musem and immediately hear a creaking noise.  Maybe this wasn't your best idea</span>,
			includeDirText: false,
		})

		let LANDING = ME.createRoom({
			id: "LANDING",
			descriptions: [
				<span>on the door and wait a few seconds with no answer.  As you go to knock again a trap door opens below you, and you drop into a dim room filled with old shells and other boring natural science stuff.  There's a door to the <b>north</b> out to the lobby basement.</span>,
				<span>the natural mysteries room, which is still just a dim room filled with old shells and other boring natural science stuff.  There's a door to the <b>north</b> out to the lobby basement.</span>
			],
			hiddenDescription: <span>The trap door opens up and unceremoniously drops you into the natural mysteries room again. You can take the door <b>north</b> to the lobby basement.</span>,
		})

		let AL0 = ME.addRoom( new RoomAtriumL0({id:"AL0",pathName:'lobby basement'}) );

		let AL1 = ME.createRoom({
			id: "AL1",
			descriptions: ["museum's main lobby"],
			pathName:"museum's main lobby"
		});

		let AL2 = ME.createRoom({
			id: "AL2",
			descriptions: ["the atrium atop the lobby bridge"],
			pathName:'lobby bridge',
		})

		ME.connectRooms( start, LANDING, ['knock'], {doorDescription:null,lockPuzzleIds:[]});
		ME.makeDoor(LANDING, AL0, [],[DIRS.N],[DIRS.S],null);

		//ME.makeHiddenDoor(start,AL1,[DIRS.N],[DIRS.S],true)

		ME.connectRoomsHidden( AL1, start, [DIRS.S]);

		let E2 = ME.addRoom( new RoomE2({id:"E2",pathName:'lair'}))

		ME.connectRooms( AL0, E2, [DIRS.D], {doorDescription:null,lockPuzzleIds:['S7']});

		return {AL0,AL1,AL2,start,LANDING}
	}
}

export default GameSetupGrey;

//where the staircase 