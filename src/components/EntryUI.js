import React from 'react';
import MessageList from "./MessageList.js";

class EntryUI extends React.Component {
	constructor(props) {
		super(props);

		//top level game state, let's say used for messages & layout for now
		this.state = {
			inputText: '',   	 //user input text
			messages: [], //messages to render - each is an object with props to give correct input state
		};

		//Callback bindings
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		//this.publishMessage = this.publishMessage.bind(this);
	}

	//UI rendering & bindings
	render() {       
		return (
			<div> 
				<div className="container">
					<MessageList messages={this.state.messages}/>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="new-action">So?</label>
						<input id="new-action" onChange={this.handleChange} value={this.state.inputText}/>
					</form>
				</div>
			</div>
		);
	}

	handleSubmit(e){
		e.preventDefault();
		this.handleTextSubmit(this.state.inputText)
	}

	handleTextSubmit(text){
		if (text.length){
			let message = this.props.processInput(text);
			this.publishMessage(message);
		}
	}

	handleChange(e) { this.setState({ inputText: e.target.value });
	}

	publishMessage(message){
		if(message.message !== null){
			const newMessage = {
				message: message.message,
				puzzleId: ( "puzzleId" in message ) ? message.puzzleId : '',
				id: Date.now()
			};

			this.setState(state => ({
				messages: state.messages.concat(newMessage),
				inputText: '',
			}));
		}else{
			this.setState(state => ({
				inputText: '',
			}));
		}
	}

	componentDidMount(){
		console.log('triggered')
		this.handleTextSubmit('look')
	}

}

export default EntryUI