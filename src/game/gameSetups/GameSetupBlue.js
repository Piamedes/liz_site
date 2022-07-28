import React from 'react';
import GameSetupBase from "./GameSetupBase.js";
import {DIRS} from "../../lib/Constants.js";
import PuzzleSpot from "../../components/PuzzleSpot.js";
import RoomBlueM0 from "../rooms/RoomBlueM0.js";
import RoomBlueM1 from "../rooms/RoomBlueM1.js";
import RoomBlueM2 from "../rooms/RoomBlueM2.js";

class GameSetupBlue extends GameSetupBase{

	initRoomsPathsPuzzles(ME,storedSettings={}){
		//basement floor

		//let BM0 = ME.addRoom( new RoomBlueM0({id:"BM0"}) );

		let BM0 = ME.addRoom(new RoomBlueM0({
				id:"BM0",
				pathName:"blue wing basement"
		}));

		let BDino = ME.createRoom({
				id:"BDino",
				descriptions: [<span>the dinosaur room.  Lots of dinosaur statues are all around, looking awesome as per usual.  The T. Rex looks as cool as well, reaching well up to the next floor. <PuzzleSpot PSCB={this.props.PSCB} ME={this.props.ME} puzzleId={'S1'} text={null}/></span>],
				pathName:"dinosaur room",
		});

		let BTurtle = ME.createRoom({
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

		let BMath = ME.createRoom({
				id:"BMath",
				descriptions: [<span>the math room with fun and surprisingly difficult interactive games. A <PuzzleSpot PSCB={this.props.PSCB} ME={this.props.ME} puzzleId={'P1'} text={<u>puzzle</u>}/> is taped up on a wall.</span>],
				pathName: "math room"
		});		

		ME.makeDoor(BM0, BDino,   [],[DIRS.SE],[DIRS.N]);
		ME.makeDoor(BM0, BTurtle, [],[DIRS.SW],[DIRS.N]);
		ME.makeDoor(BM0, BMath,   [],[DIRS.E]);

		//first floor

		let BM1 = ME.addRoom(new RoomBlueM1({
				id:"BM1",
				pathName:"blue wing first floor lobby"
		}));

		let BAttic = ME.createRoom({
				id:"BScenes",
				descriptions: [<span>the sitting area overlooking the electricity theatre. A <PuzzleSpot PSCB={this.props.PSCB} ME={this.props.ME} puzzleId={'P2'} text={<u>puzzle</u>}/> is posted on the wall.</span>],
		});

		let BElectricL = ME.createRoom({
				id:"BElectricL",
				descriptions: [<span>the landing overlooking the electricity theatre.</span>],
				pathName:"electric theatre",
		});

		let BElectricB = ME.createRoom({
				id:"BElectricB",
				descriptions: [<span>electricity theatre's basement stage.</span>],
				pathName:"electric theatre basement",
		});

		let BEng = ME.createRoom({
				id:"BEng",
				descriptions: [<span>the 'teach kids how to code with fun games engineering workshop'.  Definitely one of the coolest rooms in the museum.  Teaching through <PuzzleSpot PSCB={this.props.PSCB} ME={this.props.ME} puzzleId={'S3'} text={<u>games</u>}/> and <PuzzleSpot PSCB={this.props.PSCB} ME={this.props.ME} puzzleId={'S4'} text={<u>riddles</u>}/>.</span>],
				pathName:"engineering workshop",
		});


		let BArtic = ME.createRoom({
				id:"BArtic",
				descriptions: [<span>the "explore the artic before it's all gone" room!  Some fun science games but not much else.</span>],
				pathName: 'artic room',
		});		

		ME.makeDoor(BM1, BElectricL, ["S2"],[DIRS.E],[DIRS.W]);
		ME.makeDoor(BM1, BEng,       [],[DIRS.NE],[DIRS.S]);
		ME.makeDoor(BM1, BArtic,	   [],[DIRS.NW],[DIRS.S]);
		ME.makeDoor(BElectricL, BElectricB, [],[DIRS.D],[]);
		ME.makeDoor(BElectricL, BAttic, [],[DIRS.U],[]);

		//second floor
		let BM2 = ME.addRoom(new RoomBlueM2({
				id:"BM2",
				pathName:"blue wing first second floor lobby", 
		}));

		let BPlay = ME.createRoom({
				id:"BPlay",
				descriptions: [<span>the electric playhouse.  None of the games are active.  There's just an out of order notice taped to the wall.  Something is written on it's <PuzzleSpot PSCB={this.props.PSCB} ME={this.props.ME} puzzleId={'P6'} text={<u>back</u>}/>.</span>],
				pathName: 'electric playhouse',
		});


		let BTheater = ME.createRoom({
				id:"BTheater",
				descriptions: [<span>the regular science theatre (not the weird 4D one).  The projector isn't showing a movie, just a still <PuzzleSpot PSCB={this.props.PSCB} ME={this.props.ME} puzzleId={'P5'} text={<u>image</u>}/> on the screen.</span>],
				pathName: 'theatre',
		});

		ME.makeDoor(BM2, BPlay,    [],[DIRS.NE],[DIRS.S],"large door");
		ME.makeDoor(BM2, BTheater, [],[DIRS.NW],[DIRS.S]);

		//cross floor links
		ME.makeDoor(BM0, BM1,    ['S3','S6'],[DIRS.U],[DIRS.D],null);
		ME.makeDoor(BMath,BElectricB,['P1'],[DIRS.U],[DIRS.D],"stairs");
		ME.makeDoor(BM1, BM2,    ['S3','S6'],[DIRS.U],[DIRS.D],null);	

		ME.connectRooms( BDino, BM1, ['climb','scramble','scale'], {doorDescription:null,lockPuzzleIds:[],customDirectionText:"You manage to scramble up the T. Rex's tail using the other statues to help.  You drop off the dinosaur's back into the "});

		return {BM0,BM1,BM2}
	}
}

export default GameSetupBlue;