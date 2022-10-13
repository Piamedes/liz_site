import React from 'react';
import {getSavedValue,setSavedValue} from "../lib/Utils.js";

class Puzzle extends React.Component{
    constructor(props){
    	super(props);
        this.id   = props.id;   
        this.name  = props.name;
        this.image = props.image;
        this.verbose = props.verbose;
        this.symbol = props.symbol;
        this.description =  props.description;

        this.ME = props.ME;

        if(typeof props.answer === 'string')
        	this.answers = [props.answer]
        else
        	this.answers = props.answer;

        //state to load and save
        this.solved = getSavedValue(this.id,'solved',false);
        this.rendered = getSavedValue(this.id,'rendered',false);
    }

    onFirstRender(){
    	this.rendered = true;
    	setSavedValue(this.id,'rendered',true)
    }

    solve(){
    	this.solved = true;
    	setSavedValue(this.id,'solved',true)

		if(this.id==='E1')
			this.ME.enableMovement();

		if(this.id==='S7')
			this.ME.showHiddenPaths();
    }

    onSolvedMessage(){
    	if( !this.verbose ) return null

		if(this.id==='E1'){
			return <p>A great marriage is definitely magic!  Good luck and have fun on more adventures together.  Why not find the true ending to this game?  You have a bunch more puzzles to go and the real prize awaits!</p>
		}else if(this.id ==='E2'){
			return <p>Amazing!  I'm honestly surprised the game managed to hold together to this point.  Call Elliot for your prize!</p>
		}else{
	    	let string = " is the correct answer!!";
    		return <p>{this.answers[0]}{string}</p>;			
		}
    }

    hints(){
    	return this.ME.getPuzzleHints(this.id);
    }

    isCorrect(input){
    	if(this.answers === null || this.answers[0] === null)
    		return false

    	for(const answer of this.answers){
    		if(answer.replace(/\s+/g,'') === input.replace(/\s+/g,''))
    			return true
    	}

    	return false
    }

    lockedMessage(){
    	return ( (this.symbol[0] in ['a','e','i','o','u']) ? 'an ' : 'a ' ) + ( (this.solved) ? 'glowing ' : 'dark ') + this.symbol
    }
}

export default Puzzle