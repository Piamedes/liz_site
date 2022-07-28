import React from 'react';
import {DIRS} from "../../lib/Constants.js";
import Player from "../Player.js";
import MapEngine from "../MapEngine.js";
import GameSetupGreen from "./GameSetupGreen.js";
import GameSetupBlue from "./GameSetupBlue.js";
import GameSetupGrey from "./GameSetupGrey.js";
import PuzzleSetup from "./PuzzleSetup.js";

class MapSetup extends React.Component{
	constructor(props){
		super(props);
		this.ME = new MapEngine({PSCB:props.puzzleSpotCallback});
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
		puzzles.init(this.ME,storedSettings);
	}

	initializeWing(storedSettings,classObj){
		let engine = new classObj({PSCB:this.props.puzzleSpotCallback,ME:this.ME});
		engine.init(this.ME,storedSettings);

		return engine.externalIds
	}

	initRoomsPaths(storedSettings){
		let atriumIds = this.initializeWing(storedSettings,GameSetupGrey);
		let greenIds  = this.initializeWing(storedSettings,GameSetupGreen);
		let blueIds   = this.initializeWing(storedSettings,GameSetupBlue);


		this.ME.makeDoor(blueIds.BM0,atriumIds.AL0,[],[DIRS.W],[],null);
		this.ME.makeDoor(blueIds.BM1,atriumIds.AL1,[],[DIRS.W]);
		this.ME.makeDoor(blueIds.BM2,atriumIds.AL2,[],[DIRS.W]);

		this.ME.makeDoor(greenIds.G0SE,     atriumIds.AL0,["P2"],[DIRS.E],[],<span>The <b>western</b> exit to the green wing is wide open.</span>,<span>The <b>western</b> exit to the green wing is locked.</span>);
		this.ME.makeDoor(greenIds.G1,	    atriumIds.AL1,['P7'],[DIRS.E]);
		this.ME.makeDoor(greenIds.G2M,		atriumIds.AL2,['P4'],[DIRS.E]);
	}
}

export default MapSetup;