import React from 'react';
import Path from "./Path.js";
import {DIRS_STRING_DEFAULTS} from "../lib/Constants.js";
import {componentExtract} from "../lib/Utils.js";

class PathHidden extends Path{
    constructor(props){ 
        super(props);

        this.lockPuzzleIds = [];
        this.toStart = props.toStart
    }


    isVisible(){
    	return this.doorDescription !== null && ( (this.isHidden && this.ME.hiddenPathsVisible) || !this.isHidden )
    }

    isLocked(){
    	return !this.ME.hiddenPathsVisible
    }

    lockedMessage(){
    	return null
    	//throw new Error('hidden paths should never be usable when locked to get this function to trigger')
    }

    render(direction,roomIdFrom){
    	if(this.toStart)
    		return <span>The keycard will let you open the entrance door to the <b>south</b>.</span>
    	else{
        	let roomName    = this.ME.getRoom(this.roomIdOther(roomIdFrom)).pathName;

	    	if(direction==='stairwell')
	    		return <span>You can take the service <b>stairwell</b> to {roomName}.</span> 
			else{
	    		let directional = componentExtract(DIRS_STRING_DEFAULTS,direction,direction)
		    	return <span>You can take the service corridor <b>{directional}</b> to {roomName}.</span> 	
		    }	
    	}
    }
}

export default PathHidden