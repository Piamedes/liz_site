import React from 'react';
import GameSetupBase from "./GameSetupBase.js";
import {DIRS} from "../../lib/Constants.js";

class GameSetupBlue extends GameSetupBase{

	initRoomsPathsPuzzles(GB,storedSettings={}){
		//basement floor
		let BM0 = GB.createRoom({
				id:"BMO",
				descriptions: ["blue wing main room, basement floor"],
		});

		let BDino = GB.createRoom({
				id:"BDino",
				descriptions: ["blue wing dino room, basement floor"],
		});

		let BCloser = GB.createRoom({
				id:"BCloser",
				descriptions: ["blue wing southwest room (turtles!), basement floor"],
		});

		let BMath = GB.createRoom({
				id:"BMath",
				descriptions: ["blue wing math room, basement floor"],
		});		

		GB.makeDoor(BM0, BDino,   [],[DIRS.SE],[DIRS.N]);
		GB.makeDoor(BM0, BCloser, [],[DIRS.SW],[DIRS.N]);
		GB.makeDoor(BM0, BMath,   [],[DIRS.E]);

		//first floor
		let BM1 = GB.createRoom({
				id:"BM1",
				descriptions: ["blue wing main room, first floor"],  //covers wicked smart &trex
		});

		let BScenes = GB.createRoom({
				id:"BScenes",
				descriptions: ["blue wing behind the scenes"],
		});

		let BElectricL = GB.createRoom({
				id:"BElectricL",
				descriptions: ["blue wing electric theatre landing"],
		});

		let BElectricB = GB.createRoom({
				id:"BElectricB",
				descriptions: ["blue wing electric theatre basement"],
		});

		let BEng = GB.createRoom({
				id:"BEng",
				descriptions: ["blue wing engineering design shop"],
		});


		let BArtic = GB.createRoom({
				id:"BArtic",
				descriptions: ["blue wing artic"],
		});		

		GB.makeDoor(BM1, BElectricL, [],[DIRS.E],[DIRS.W],"large door");
		GB.makeDoor(BM1, BEng,       [],[DIRS.NE],[DIRS.S]);
		GB.makeDoor(BM1, BArtic,	   [],[DIRS.NW],[DIRS.S]);
		GB.makeDoor(BElectricL, BElectricB, [],[DIRS.D],[],"staircase");
		GB.makeDoor(BElectricL, BScenes, [],[DIRS.U],[],"staircase");

		//second floor
		let BM2 = GB.createRoom({
				id:"BM2",
				descriptions: ["blue wing main room second floor"], //covers light house and science in the park
		});


		let BPlay = GB.createRoom({
				id:"BPlay",
				descriptions: ["blue wing electric playhouse"],
		});


		let BTheater = GB.createRoom({
				id:"BTheater",
				descriptions: ["blue wing theater"],
		});

		GB.makeDoor(BM2, BPlay,    [],[DIRS.NE],[DIRS.S],"large door");
		GB.makeDoor(BM2, BTheater, [],[DIRS.NW],[DIRS.S]);


		//cross floor links
		GB.makeDoor(BM0, BM1,    [],[DIRS.U],[DIRS.D],"escalator");
		GB.makeDoor(BMath,BElectricB,[],[DIRS.U],[DIRS.D],"stairs");
		GB.makeDoor(BM1, BM2,    [],[DIRS.U],[DIRS.D],"escalator");	
		GB.connectRooms( BDino, BM1, ['climb'], {doorDescription:'dino_tail',lockPuzzleIds:[],descriptions:["dinodes"]});

		return {BM0,BM1,BM2}
	}
}

export default GameSetupBlue;