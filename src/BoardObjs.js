import React from 'react';
import {DIRS} from "./Constants.js";

class Room extends React.Component{
    constructor(props){
        super(props);
        this.id   = props.id;   //Unique String
        this.description 	  = props.description;
        this.descriptionFirst = props.descriptionFirst;
        this.paths 		      = props.paths;
        this.puzzleSpots      = props.puzzleSpots;
    }

    getPuzzleId(){
        if(!this.puzzleSpots.length)
            return ''
        else{
            console.log( this.puzzleSpots[0].puzzleId);
            return this.puzzleSpots[0].puzzleId
        }
    }

    describe(firstEncounter = false){
        let msg = (firstEncounter ? this.descriptionfirst : this.description) + "<br>";
        let path;

        for( const pathDir in this.paths){
            path = this.paths[ pathDir ];

            if( path.isVisible )
                msg += "<br><b>" + pathDir.toUpperCase() + ":</b> " + path.describe(); //fix this later!!!       
        }

        for( const puzzleSpot of this.puzzleSpots){
        	msg += "<br><br>" + puzzleSpot.description 
        }

        return( msg ); 
    }
}

class Path extends React.Component{
    constructor(props){ 
        super(props);

        this.id          = props.id;
        this.roomIdA     = props.roomIdA;
        this.roomIdB     = props.roomIdB;
        this.description = props.description;
        this.lockIds     = props.lockIds; 
        this.isVisible   = props.isVisible;
        this.isOneWay    = props.isOneWay;
        this.isLocked    = true;
    }

    describe(){
    	let locked = (this.isLocked ? ' locked ' : '');
        return( "a " + locked + this.description ); 
    }

    getDestinationId( roomId ){
        if( roomId === this.roomIdA )
            return(this.roomIdB)
        else
            return(this.roomIdA)
    }

    canUnlock(puzzles,lockToPuzzleMap){
        let unlock = true;

        for(let lockId of this.lockIds){
            console.log(lockId);
            unlock = unlock && puzzles[lockToPuzzleMap[lockId]].solved;
        }   

        return( unlock );
    }

    canGoFrom(roomId){
    	return !this.isOneWay || this.roomIdA === roomId
    }
}

class PuzzleSpot extends React.Component{
    constructor(props){
        super(props)
        this.id   = props.id;   
        this.description = props.description;
        this.linkText = props.linkText;
        this.puzzleId = props.puzzleId;
    }
}

export {Path, Room, PuzzleSpot, DIRS};