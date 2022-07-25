import React from 'react';
import {componentExtract,componentExists} from "../lib/Utils.js";
import {DIR_LIST} from "../lib/Constants.js";

class Room extends React.Component{
    constructor(props){
        super(props);
        //Unique string identifying the room - must be unique across all rooms
        this.id   		   = props.id;
        //description array (i.e. if there's more than one description we only show the first on the first entry)
        this.descriptions  = componentExtract( props, 'descriptions',[]);
        this.paths		   = {};
        this._puzzleIds    = this.puzzleIdsFromDescriptions(this.descriptions);
        this.descriptionIndex = 0;
        this.type = 'base';

        this.ME = props.ME;
    }

    findPuzzleSpots(children){
    	let puzzles = {};
    	let nested  = {};

    	for(const child of	 children){
    		if(typeof(child) !== 'string' && componentExists(child,'props')){
    			if( componentExists( child, "children")){
    				nested = this.findPuzzleSpots(child.children);
    				puzzles = {...puzzles, ...nested};
    			}else if(componentExists(child,'props') && componentExists(child.props,'puzzleId')){
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

    //The Room class is used in two places:  storing state within the main application state, and rendering the UI
    //In the rendering case, the state is disconnected from live main application state
	render(direction){
		return <span>{this.directionText(direction)}{this.description()}{this.renderPaths()}</span>		
	}

	directionText(direction){
		let text = null;

		if(direction.length){
			if(DIR_LIST.includes(direction))
				text = 'You go ' + direction + ' into ';
			else
				text = 'You ' + direction + ' ';		
		}

		return text;		
	}

	description(){
		return this.descriptions[this.descriptionIndex];
	}

	renderPaths(){
    	let msg  = [];

    	for( let key in this.paths){
    		if(this.ME.getPath(this.paths[key]).isVisible())
   // 			msg.push( <span key={key}><br/><b>{camelCase(key)}:  </b>{this.pathMap[room.paths[key]].render()}</span>)
			msg.push( <span key={key}>{this.ME.getPath(this.paths[key]).render()}</span>)
    	}

    	return msg;
	}

	//just in case we need to potentially filter out hidden puzzles?
	puzzleIds(){
		return this._puzzleIds;
	}
}

export default Room