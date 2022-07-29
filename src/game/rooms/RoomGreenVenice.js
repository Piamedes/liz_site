import React from 'react';
import {dirText} from "../../lib/Utils.js";
import {DIRS} from "../../lib/Constants.js";
import RoomAdv from "../RoomAdv.js";

class RoomGreenVenice extends RoomAdv{
	constructor(props){
		super(props);

		this.waterLevelMax = 4;
		this.waterLevelMin = 1;
		this.waterLevel    = this.waterLevelMax;
	}

	render(direction,path){
		this.updateWaterLevels(direction);
		return <span>{dirText(direction)} the venice room, showing just how screwed the city is from flooding.  {this.waterMessage()}. {this.renderPaths()}</span>
	}

	waterMessage(){
		let message;

		switch(this.waterLevel){
			case 4:
				message = <span>The floodwaters cover the city with barely anything visible</span>;
				break;
			case 3:
				message = <span>The canals are barely even visible with the waterlevel up at the second stories of many buildings</span>;
				break;
			case 2:
				message = <span>The canals are overflowing, flooding many people's homes and St. Mark's square.</span>;
				break;
			case 1:
				message = <span>The floodwaters have receded entirely.  You saved Venice!</span>;
				this.ME.getPuzzle('P4').solve();
				break;
			default:
				message = <span>Well you broke something but let's say you finished the puzzle anyways just in case</span>
				this.ME.getPuzzle('P4').solve();				
		}
	
		return message;
	}

	updateWaterLevels(direction){
		if(direction === DIRS.S)
			this.waterLevel = Math.max(this.waterLevel - 1,this.waterLevelMin)
		else
			this.waterLevel = Math.min(this.waterLevel + 1,this.waterLevelMax);
	}

	puzzleIds(){
		return ['P4'];
	}
}

export default RoomGreenVenice