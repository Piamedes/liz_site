import React from 'react';
import GameSetupBase from "./GameSetupBase.js";
import {DIRS} from "../../lib/Constants.js";
import PuzzleSpot from "../../components/PuzzleSpot.js";
import RoomBlueM0 from "../rooms/RoomBlueM0.js";

class GameSetupBlue extends GameSetupBase{

	initRoomsPathsPuzzles(GB,storedSettings={}){
		//basement floor

		//let BM0 = GB.addRoom( new RoomBlueM0({id:"BM0"}) );

		let BM0 = GB.addRoom(new RoomBlueM0({
				id:"BM0",
				pathName:"blue wing basement"
		}));

		let BDino = GB.createRoom({
				id:"BDino",
				descriptions: [<span>the dinosaur room.  Lots of dinosaur statues are all around, looking awesome as per usual.  The T. Rex looks as cool as well, reaching well up to the next floor. <PuzzleSpot PSCB={this.props.PSCB} ME={this.props.ME} puzzleId={'S1'} text={null}/></span>],
				pathName:"dinosaur room",
		});

		let BTurtle = GB.createRoom({
				id:"BTurle",
				descriptions: [
					<span>the boring animal room.  There's a few slow moving reptiles around and nothing else.</span>,
					<span>the boring animal room.  Still just a few slow moving reptiles around and nothing else.</span>,
					<span>the boring animal room.  Still just a few slow moving reptiles around and nothing else.</span>,
					<span>the boring animal room.  Still just a few slow moving reptiles around and nothing else.</span>,
					<span>the boring animal room.  Still just a few slow moving reptiles around and nothing else.</span>,
					<span>the boring animal room.  Still just a few slow moving reptiles around and nothing else.</span>,
					<span>the boring animal room.  One of the turtles seems to be moving around a bit more.</span>,
					<span>the boring animal room.  Looks like the turtle stopped.</span>,
					<span>the boring animal room.  The turtle is moving again!  Nevermind it stopped.  Walked up behind one of the other turtles and plopped down.</span>,
					<span>a sexy? animal room. You can see clearly these two turtles need to talk more, as kicking your tank mate in the face for trying to mount you really seems like an unhealthy relationship</span>,
					<span>the boring animal room.  The turtles went to sleep.  Have a <PuzzleSpot PSCB={this.props.PSCB} ME={this.props.ME} puzzleId={'S2'} text={<u>puzzle</u>}/>.</span>,
				],
				pathName: 'boring animal room',
		});

		let BMath = GB.createRoom({
				id:"BMath",
				descriptions: [<span>the math room with fun and surprisingly difficult interactive games. A <PuzzleSpot PSCB={this.props.PSCB} ME={this.props.ME} puzzleId={'P1'} text={<u>puzzle</u>}/> is taped up on a wall.</span>],
				pathName: "math room"
		});		

		GB.makeDoor(BM0, BDino,   [],[DIRS.SE],[DIRS.N]);
		GB.makeDoor(BM0, BTurtle, [],[DIRS.SW],[DIRS.N]);
		GB.makeDoor(BM0, BMath,   [],[DIRS.E]);

		//first floor
		let BM1 = GB.createRoom({
				id:"BM1",
				descriptions: ["first floor of the blue wing.  You can see down below to the basement"],  //covers wicked smart &trex
				pathName:"blue wing first floor lobby",
		});

		let BAttic = GB.createRoom({
				id:"BScenes",
				descriptions: [<span>the sitting area overlooking the electricity theatre. A <PuzzleSpot PSCB={this.props.PSCB} ME={this.props.ME} puzzleId={'P2'} text={<u>puzzle</u>}/> is posted on the wall.</span>],
		});

		let BElectricL = GB.createRoom({
				id:"BElectricL",
				descriptions: [<span>the landing overlooking the electricity theatre.</span>],
				pathName:"electric theatre",
		});

		let BElectricB = GB.createRoom({
				id:"BElectricB",
				descriptions: [<span>electricity theatre's basement stage.</span>],
				pathName:"electric theatre basement",
		});

		let BEng = GB.createRoom({
				id:"BEng",
				descriptions: ["blue wing engineering design shop"],
				pathName:"engineering workshop",
		});


		let BArtic = GB.createRoom({
				id:"BArtic",
				descriptions: ["blue wing artic"],
				pathName: 'artic room',
		});		

		GB.makeDoor(BM1, BElectricL, ["S2"],[DIRS.E],[DIRS.W]);
		GB.makeDoor(BM1, BEng,       [],[DIRS.NE],[DIRS.S]);
		GB.makeDoor(BM1, BArtic,	   [],[DIRS.NW],[DIRS.S]);
		GB.makeDoor(BElectricL, BElectricB, [],[DIRS.D],[]);
		GB.makeDoor(BElectricL, BAttic, [],[DIRS.U],[]);

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
		GB.makeDoor(BMath,BElectricB,['P1'],[DIRS.U],[DIRS.D],"stairs");
		GB.makeDoor(BM1, BM2,    [],[DIRS.U],[DIRS.D],"escalator");	

		GB.connectRooms( BDino, BM1, ['climb','scramble','scale'], {doorDescription:null,lockPuzzleIds:[],customDirectionText:"You manage to scramble up the T. Rex's tail using the other statues to help.  You drop off the dinosaur's back into the "});

		return {BM0,BM1,BM2}
	}
}

export default GameSetupBlue;