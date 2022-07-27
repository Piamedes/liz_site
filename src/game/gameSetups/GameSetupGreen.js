import React from 'react';
import GameSetupBase from "./GameSetupBase.js";
import {DIRS} from "../../lib/Constants.js";

class GameSetupGreen extends GameSetupBase{

	initRoomsPathsPuzzles(GB,storedSettings={}){
		//basement
		let G0SW = GB.createRoom({
			id: "G0SW",
			descriptions: ["green SW"],
			pathName: 'green wing stairs and elevator',
		})

		let G0SE = GB.createRoom({
			id: "G0SE",
			descriptions: ["green SE"],
			pathName: 'green wing lobby',
		})

		let G0NW = GB.createRoom({
			id: "G0NW",
			descriptions: ["green NW"],
			pathName: 'science stage',
		});

		let G0NE = GB.createRoom({
			id: "G0NE",
			descriptions: ["green NE"],
			pathName: 'hunting lodge room',
		});

		GB.makeDoor(G0SW, G0NW, [],[DIRS.N]);
		GB.makeDoor(G0SE, G0NE, [],[DIRS.N]);
		GB.makeDoor(G0SW, G0SE, [],[DIRS.E]);
		GB.makeDoor(G0NW, G0NE, [],[DIRS.E]);

		//first floor
		let G1 = GB.createRoom({
			id: "G1",
			descriptions: ["green First floor"],
		})

		//second floor
		let G2Landing = GB.createRoom({
			id: "G2Landing",
			descriptions: ["green second floor landing"],
		})		


		let G2Nano = GB.createRoom({
			id: "G2Nano",
			descriptions: ["green second floor humans and nano"],
		})

		let G2Insects = GB.createRoom({
			id: "G2Insects",
			descriptions: ["green second floor bees & tamarinds"],
		})

		let G2Venice = GB.createRoom({
			id: "G2Venice",
			descriptions: ["green second floor venice"],
		})

		GB.makeDoor(G2Landing, G2Venice, [],[DIRS.SW]);
		GB.makeDoor(G2Venice, G2Nano, [],[DIRS.N]);
		GB.makeDoor(G2Landing, G2Insects, [],[DIRS.N]);
		GB.makeDoor(G2Landing,G2Nano,[],[DIRS.W]);

		//connect the floors!
		GB.makeDoor(G0SW, G1,       [],[DIRS.U],[DIRS.D],'staircase');
		GB.makeDoor(G1, G2Landing,  [],[DIRS.U],[DIRS.D],'staircase');

		return {G2Landing,G1,G0SE}
	}
}

export default GameSetupGreen;