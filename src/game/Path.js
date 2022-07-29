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
        this.processInputPuzzleIDs(props.lockPuzzleIds);

        this.customDirectionText = componentExtract(props,'customDirectionText','');

        this.lockDescription = props.lockDescription;
        this.isHidden    = componentExtract(props,'isHidden',false);

        this.ME = props.ME;
    }

    processInputPuzzleIDs(puzzleIds){
    	if(puzzleIds.length === 0 || !( puzzleIds[0].includes('|') ) ){
    		this.orPuzzleMode  = false;
    		this.lockPuzzleIds = puzzleIds;
    	}else{
   			this.orPuzzleMode  = true;
    		this.lockPuzzleIds = puzzleIds.split('|');
    	}
    }

    roomIdOther(roomId){
    	return (roomId === this.roomIdA) ? this.roomIdB : this.roomIdA;
    }

    isVisible(){
    	return this.doorDescription !== null && ( (this.isHidden && this.ME.hiddenPathsVisible) || !this.isHidden )
    }

    isLocked(){
    	let locked;

    	if(this.lockPuzzleIds.length){
			for(const puzzleId of this.lockPuzzleIds){
				if(!this.orPuzzleMode){
					locked = false;
					locked = locked || !this.ME.getPuzzle(puzzleId).solved					
				}else{
					let open = false;
					open = open || this.ME.getPuzzle(puzzleId).solved
					locked = !open;
				}
			}
		}
    	return locked
    }

    lockedMessage(){
    	if(!this.isLocked())
    		return null
    	else{
    		let msgs   = [];
    		let length = this.lockPuzzleIds.length;

    		if(length===1){
    			msgs =  <span>{this.ME.getPuzzle(this.lockPuzzleIds[0]).lockedMessage()}</span>
    		}else if(length === 2){
    			msgs = <span>{this.ME.getPuzzle(this.lockPuzzleIds[0]).lockedMessage()} {(this.orPuzzleMode)? 'or' : 'and'} {this.ME.getPuzzle(this.lockPuzzleIds[1]).lockedMessage()}</span>
    		}else{
	    		let msg    = '';
	      		let puzzle = null;

				for(let idx=0;idx<length;idx++){
					puzzle = this.ME.getPuzzle(this.lockPuzzleIds[idx]);
					msg    = puzzle.lockedMessage();


					if(idx!=length-1)
						msg += ", "

					if(idx==length-2)
						msg += ((this.orPuzzleMode) ? 'or' : 'and') + ' '

					msgs.push(msg)
				}				
    		}

    		let door = (this.doorDescription==='elevator') ? 'elevator' : 'door';


			return <span>You can't go that way, it's locked.  As you look closely at the {door} you see {msgs} on it.</span>
    	}

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
    	let article     = 'the ';
    	let directional;

    	if(direction=="up" || direction=="down")
    		directional = <span>staircase <b>{direction}</b></span> 
    	else if(direction=='elevator')
    		directional = <span><b>elevator</b></span>
    	else if(direction==='floor1'||direction==='floor2'||direction==='basement'){
    		roomName 	= <b>{direction}</b> 
    		directional = 'elevator';
    		article     = '';
    	}else 
    		directional = <span><b>{componentExtract(DIRS_STRING_DEFAULTS,direction,direction)}ern</b> exit</span>

    	return <span>The {directional} to {article}{roomName} is {lockDesc}.</span> 
    }
}

export default Path