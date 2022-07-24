import React from 'react';
import {DIRS} from "../../lib/Constants.js";
import Player from "../Player.js";
import GameBuilder from "../GameBuilder.js";
import GameSetupGreen from "./GameSetupGreen.js";
import GameSetupBlue from "./GameSetupBlue.js";
import GameSetupGrey from "./GameSetupGrey.js";
import PuzzleSetup from "./PuzzleSetup.js";

class GameSetupMain extends React.Component{
	constructor(props){
		super(props);

		this.GB = new GameBuilder();
	}

	init(storedSettings={}){
		this.initPlayer(storedSettings);
		this.initPuzzles(storedSettings);
		this.initRoomsPaths(storedSettings);
	}

	initPlayer(storedSettings){
		this.player = new Player({roomId: "START"});
	}

	initPuzzles(storedSettings){
		let puzzles = new PuzzleSetup();
		puzzles.init(this.GB,storedSettings);
	}

	initializeWing(storedSettings,classObj){
		let engine = new classObj({PSCB:this.props.puzzleSpotCallback});
		engine.init(this.GB,storedSettings);

		return engine.externalIds
	}

	initRoomsPaths(storedSettings){
		let atriumIds = this.initializeWing(storedSettings,GameSetupGrey);

		let greenIds  = this.initializeWing(storedSettings,GameSetupGreen);
		let blueIds   = this.initializeWing(storedSettings,GameSetupBlue);


		this.GB.makeDoor(blueIds.BM0,atriumIds.AL0,[],[DIRS.W]);
		this.GB.makeDoor(blueIds.BM1,atriumIds.AL1,[],[DIRS.W]);
		this.GB.makeDoor(blueIds.BM2,atriumIds.AL2,[],[DIRS.W]);

		this.GB.makeDoor(greenIds.G0SE,     atriumIds.AL0,[],[DIRS.E]);
		this.GB.makeDoor(greenIds.G1,	     atriumIds.AL1,[],[DIRS.E]);
		this.GB.makeDoor(greenIds.G2Landing,atriumIds.AL2,[],[DIRS.E]);
	}
}

export default GameSetupMain;