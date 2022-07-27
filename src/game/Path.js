import React from 'react';
import {DIR_LIST,DIRS_STRING_DEFAULTS} from "../lib/Constants.js";
import {componentExtract,dirText} from "../lib/Utils.js";

class Path extends React.Component{
    constructor(props){ 

        super(props);
        //Unique string identifying the room - must be unique across all rooms
        this.id   		   = props.id;
        //description array (i.e. if there's more than one description we only show the first on the first entry.  This describes the path as you traverse it - not when you see it)
		this.doorDescription = props.doorDescription;
       	//path goes from room A to room B
        this.roomIdA     = props.roomIdA;
        this.roomIdB     = props.roomIdB;
        //array of puzzle IDs locking this path
        this.lockPuzzleIds = props.lockPuzzleIds;
        this.customDirectionText = componentExtract(props,'customDirectionText','');

        this.lockDescription = props.lockDescription;

        this.ME = props.ME;
    }

    roomIdOther(roomId){
    	return (roomId === this.roomIdA) ? this.roomIdB : this.roomIdA;
    }

    isVisible(){
    	return this.doorDescription !== null
    }

    isLocked(){
    	let locked;

    	if(this.lockPuzzleIds.length){
			locked = true;

			for(const puzzleId of this.lockPuzzleIds){
				console.log(puzzleId)
				locked = locked && !this.ME.getPuzzle(puzzleId).solved
			}
    	}else
    		locked = false;

    	return locked
    }

    directionText(direction){
    	if(this.customDirectionText.length)
    		return this.customDirectionText
    	else
    		return dirText(direction)
    }

    render(direction,roomIdFrom){
    	let roomName    = this.ME.getRoom(this.roomIdOther(roomIdFrom)).pathName;
    	let lockDesc    = this.isLocked() ? 'locked' : 'wide open';
    	let directional;

    	if(direction=="up" || direction=="down")
    		directional = <span>staircase <b>{direction}</b></span> 
    	else 
    		directional = <span><b>{componentExtract(DIRS_STRING_DEFAULTS,direction,direction)}ern</b> exit</span>

    	return <span>The {directional} to the {roomName} is {lockDesc}.</span> 
    }
}

export default Path