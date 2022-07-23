import React from 'react';

class Puzzle extends React.Component{
    constructor(props){
    	super(props);
        this.id   = props.id;   
        this.name  = props.name;
        this.image = props.mage;
        this.answer = props.answer;
        this.solved = false;
        this.description =  props.description;

        this.state = {
        	solved: false,
        }
    }

    solve(){
    	this.setState({solved:true});
    }

    onSolvedMessage(){
    	let string = " is the correct answer!!";
    	return <p>{this.answer}{string}</p>;
    }

    isCorrect(input){
    	return this.answer === input.replace(/\s+/g,'')
    }

}

export default Puzzle