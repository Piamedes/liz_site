import React from 'react';
import {componentExtract,componentExists} from "../lib/Utils.js";

class Room extends React.Component{
    constructor(props){
        super(props);
        //Unique string identifying the room - must be unique across all rooms
        this.id   		   = props.id;
        //description array (i.e. if there's more than one description we only show the first on the first entry)
        this.descriptions  = props.descriptions;
        this.paths		   = {};
        this._puzzleIds    = this.puzzleIdsFromDescriptions(props.descriptions);

        this.state = {
        	descriptionIndex: 0,
        };
    }

    findPuzzleSpots(children){
    	let puzzles = {};
    	let nested  = {};

    	for(const child of	 children){
    		if(typeof(child) !== 'string' && componentExists(child,'props')){
    			if( componentExists( child, "children")){
    				nested = this.findPuzzleSpots(child.children);
    				puzzles = {...puzzles, ...nested};
    			}else{
    				puzzles[child.props.puzzleId]=true;
    			}
    		}
    	}

    	return puzzles
    }

    puzzleIdsFromDescriptions(descriptions){
    	let puzzles = {};
    	let nested  = {};

    	for(const description of descriptions){
    		if(typeof(description)!=='string'){
    			nested  = this.findPuzzleSpots(description.props.children)
    			puzzles = {...puzzles,...nested};
    		}
    	}

    	return Object.keys(puzzles);
    }


    updateDescriptionState(){
    	//increment but never above the length, assuming zero indexing
    	this.setState({ descriptionIndex: Math.min(this.descriptions.length - 1, this.state.descriptionIndex+1)})
    }

    //The Room class is used in two places:  storing state within the main application state, and rendering the UI
    //In the rendering case, the state is disconnected from live main application state
	render(){
		return <span>{this.descriptions[this.state.descriptionIndex]}</span>
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

    addPuzzleId(puzzleId){
    	if(!(puzzleId in this._puzzleIds))
    		this._puzzleIds.push(puzzleId);
    }


}

export default Room