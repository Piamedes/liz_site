import React from 'react';
import {componentExtract,componentExists,dirText,getSavedValue,setSavedValue} from "../lib/Utils.js";

class Room extends React.Component{
    constructor(props){
        super(props);
        //Unique string identifying the room - must be unique across all rooms
        this.id   		   = props.id;
        //description array (i.e. if there's more than one description we only show the first on the first entry)
        this.descriptions  = componentExtract( props, 'descriptions',[]);
        this.pathName	   = componentExtract( props, 'pathName','');
        this.paths		   = {};
        this._puzzleIds    = this.puzzleIdsFromDescriptions(this.descriptions);
        this.includeDirText = componentExtract(props, 'includeDirText',true);
        this.hiddenDescription = componentExtract(props,'hiddenDescription','')
        this.type = 'base';

        this.ME = props.ME;

        this.descriptionIndex = getSavedValue(this.id,'descriptionIndex',0)
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
	render(direction,path){
		if(this.ME.hiddenPathsVisible && this.hiddenDescription.length !== 0){
			return this.hiddenDescription
		}else{
			let desc = this.description();
			this.updateDescriptionIndex();

			return <span>{this.directionText(direction,path)}{desc} {this.renderPaths()}</span>	
		}
	}

	directionText(direction,path){
		return !this.includeDirText ? null : (path===null) ? dirText(direction) : path.directionText(direction);	
	}

	updateDescriptionIndex(){
		this.descriptionIndex = Math.min(this.descriptionIndex+1,this.descriptions.length-1);
		setSavedValue(this.id,'descriptionIndex',this.descriptionIndex);
	}

	description(){
		return this.descriptions[this.descriptionIndex];
	}

	renderPaths(skips=[]){
    	let msgs  = [];

    	for( let key in this.paths){
    		if(!skips.includes(key) && this.ME.getPath(this.paths[key]).isVisible()){
    			msgs.push( <span key={key}>{this.ME.getPath(this.paths[key]).render(key,this.id)} </span> );
    		}		
    	}

    	return <span>{msgs}</span>;
	}

	//just in case we need to potentially filter out hidden puzzles?
	puzzleIds(){
		return this._puzzleIds;
	}
}

export default Room