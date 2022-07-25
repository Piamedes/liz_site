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
        this.description =  props.description;

        this.ME = props.ME;

    }

    solve(){
    	this.solved = true;
    }

    onSolvedMessage(){
    	if( !this.verbose ) return null

    	let string = " is the correct answer!!";
    	return <p>{this.answer}{string}</p>;
    }

    isCorrect(input){
    	return this.answer === input.replace(/\s+/g,'')
    }

}

export default Puzzle