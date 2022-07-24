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

        let lockState = this.processLockState(props.puzzleMap);

	    this.state = {
	    	lockedPuzzleState: lockState.lockedPuzzleState,
	    	isLocked: lockState.isLocked,
	    	descriptionIndex: 0,
	    }
    }

    isVisible(){
    	return true
    }

    isLocked(){
    	return this.state.isLocked;
    }

    componentDidMount(){
 		this.updateDescriptionState();   	
    }

    renderDoor(){
    	let locked = (this.state.isLocked ? 'locked ' : '');
    	return <span>{locked}{this.doorDescription}</span>
    }

	render(){
		return <span>{this.descriptions[this.state.descriptionIndex]}</span>
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
	        	_isLocked = _isLocked && puzzleMap[puzzleId].solved;
	        }
        };		

		return {lockedPuzzleState,isLocked:_isLocked}
	}

    updateLockState(puzzleMap){
    	this.setState(function(state,props){
			return this.processLockState(props.puzzleMap);
    	})
    }

	describe(){
		return this.render()
	}

}

export default Path