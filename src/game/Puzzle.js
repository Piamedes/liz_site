import React from 'react';

class Puzzle extends React.Component{
    constructor(props){
    	super(props);
        this.id   = props.id;   
        this.name  = props.name;
        this.image = props.image;
        this.answer = props.answer;
        this.verbose = props.verbose;
        this.solved = false;

        this.rendered = false;
        this.description =  props.description;

        this.ME = props.ME;

    }

    onFirstRender(){
    	this.rendered = true;
    }

    solve(){
    	this.solved = true;
    }

    onSolvedMessage(){
    	if( !this.verbose ) return null

    	let string = " is the correct answer!!";
    	return <p>{this.answer}{string}</p>;
    }

    hints(){
    	return this.ME.getPuzzleHints(this.id);
    }

    isCorrect(input){
    	return this.answer.replace(/\s+/g,'') === input.replace(/\s+/g,'')
    }

}

export default Puzzle