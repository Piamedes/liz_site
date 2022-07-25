import React from 'react';

class Path extends React.Component{
    constructor(props){ 

        super(props);
        //Unique string identifying the room - must be unique across all rooms
        this.id   		   = props.id;
        //description array (i.e. if there's more than one description we only show the first on the first entry.  This describes the path as you traverse it - not when you see it)
        this.descriptions  = props.descriptions;
		this.doorDescription = props.doorDescription;
       	//path goes from room A to room B
        this.roomIdA     = props.roomIdA;
        this.roomIdB     = props.roomIdB;
        //array of puzzle IDs locking this path
        this.lockPuzzleIds = props.lockPuzzleIds;

        this.lockDescription = props.lockDescription;

        this.ME = props.ME;
        this.lockState = this.processLockState(this.ME.puzzleMap);

	    this.descriptionIndex = 0;


    }

    isVisible(){
    	return this.doorDescription !== null
    }

    isLocked(){
    	return this.lockState.isLocked;
    }

    render(){
    	let message = this.isLocked() ? this.lockDescription : this.doorDescription;
    	return <span>{message}</span>	
    }

    updateDescriptionState(){
    	//increment but never above the length, assuming zero indexing
    	this.setState({ descriptionIndex: Math.min(this.descriptions.length - 1, this.state.descriptionIndex+1)})
    }

    processLockState(puzzleMap){
        let lockedPuzzleState = [];
        let _isLocked = false;

        if(this.lockPuzzleIds.length>0){
        	_isLocked = true;

        	for(let puzzleId of this.lockPuzzleIds){
	        	lockedPuzzleState.push({id:puzzleId,name:puzzleMap[puzzleId].name,solved:puzzleMap[puzzleId].solved});
	        	_isLocked = _isLocked && !puzzleMap[puzzleId].solved;
	        }
        };		

		return {lockedPuzzleState,isLocked:_isLocked}
	}

    updateLockState(puzzleMap){
    	this.lockState = this.processLockState(puzzleMap);

    }
}

export default Path