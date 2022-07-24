import React from 'react';
import {componentExtract} from "../lib/Utils.js";

class Room extends React.Component{
    constructor(props){
        super(props);
        //Unique string identifying the room - must be unique across all rooms
        this.id   		   = props.id;
        //description array (i.e. if there's more than one description we only show the first on the first entry)
        this.descriptions  = props.descriptions;
        //key value map of ACTION - Path ID
        this.paths 		   = componentExtract( props, "paths", {} );
        //list of puzzle ids
        this._puzzleIds    = componentExtract( props, "puzzleIds", [] );

        this.state = {
        	descriptionIndex: 0,
        };
    }

    updateDescriptionState(){
    	//increment but never above the length, assuming zero indexing
    	this.setState({ descriptionIndex: Math.min(this.descriptions.length - 1, this.state.descriptionIndex+1)})
    }

    //The Room class is used in two places:  storing state within the main application state, and rendering the UI
    //In the rendering case, the state is disconnected from live main application state
	render(){
		return <span>{this.descriptions[this.state.descriptionIndex]}:</span>
	}

    componentDidMount(){
 		this.updateDescriptionState();   	
    }

	describe(){
		return this.render()
	}

	//just in case we need to potentially filter out hidden puzzles?
	puzzleIds(){
		return this._puzzleIds;
	}

    getPuzzleId(){
        if(!this.puzzleSpots.length)
            return ''
        else{
            console.log( this.puzzleSpots[0].puzzleId);
            return this.puzzleSpots[0].puzzleId
        }
    }
}

export default Room