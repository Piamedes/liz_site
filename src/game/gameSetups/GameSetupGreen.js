import React from 'react';
import GameSetupBase from "./GameSetupBase.js";
import {DIRS} from "../../lib/Constants.js";
import RoomGreenM1 from "../rooms/RoomGreenM1.js";
import PuzzleSpot from "../../components/PuzzleSpot.js";
import RoomGreenVenice from "../rooms/RoomGreenVenice.js";

class GameSetupGreen extends GameSetupBase{

	initRoomsPathsPuzzles(GB,storedSettings={}){
		//basement
		let G0SW = GB.createRoom({
			id: "G0SW",
			descriptions: [<span>the green wing basement stairs and elevator.  The elevator requires a keycard. Need to use the bathroom? </span>],
			pathName: 'green wing basement access',
		})

		let G0SE = GB.createRoom({
			id: "G0SE",
			descriptions: [<span>the green wing basement lobby. Not much to see here</span>],
			pathName: 'green wing lobby',
		})

		let G0NW = GB.createRoom({
			id: "G0NW",
			descriptions: [<span>the science stage for interactive shows.  It's dark and boring right now. </span>],
			pathName: 'science stage',
		});

		let G0NE = GB.createRoom({
			id: "G0NE",
			descriptions: ["green NE"],
			pathName: 'hunting lodge room',
		});

		GB.makeDoor(G0SW, G0NW, ['E1','P7','S6'],[DIRS.N]);
		GB.makeDoor(G0SE, G0NE, [],[DIRS.N]);
		GB.makeDoor(G0SW, G0SE, [],[DIRS.E]);

		//first floor
		let G1 = GB.addRoom(new RoomGreenM1({
			id: "G1",
			pathName:'green wing first floor landing',
		}))

		//second floor
		let G2M = GB.createRoom({
			id: "G2M",
			descriptions: [<span>the green wing second floor landing.</span>],
			pathName:"green second floor landing"
		})		


		let G2Human = GB.createRoom({
			id: "GHuman",
			descriptions: [<span>the hall of human life.  There are a bunch of showcases of how science impacts our everday lives.  There's also a TV screen showing a <PuzzleSpot PSCB={this.props.PSCB} ME={this.props.ME} puzzleId={'P3'} text={<u>puzzle</u>}/>. </span>],
			pathName:'hall of human life'
		})

		let G2Insects = GB.createRoom({
			id: "G2Insects",
			descriptions: [<span> green second floor insect room.  I guess insects are neat?</span>],
			pathName: 'insect room',
		})

		let G2Venice = GB.addRoom(new RoomGreenVenice({
			id: "G2Venice",
			pathName: 'venice room'
		}));

		GB.makeDoor(G2M, G2Venice, [],[DIRS.SW]);
		GB.makeDoor(G2Venice, G2Human, ['P3'],[DIRS.N]);
		GB.makeDoor(G2M, G2Insects, [],[DIRS.N]);
		GB.makeDoor(G2M,G2Human,[],[DIRS.W]);

		//connect the floors!
		GB.makeDoor(G0SW, G1,       [],[DIRS.U],[DIRS.D],'staircase');
		GB.makeDoor(G1, G2M,  [],[DIRS.U],[DIRS.D],'staircase');

		return {G2M,G1,G0SE}
	}
}

export default GameSetupGreen;