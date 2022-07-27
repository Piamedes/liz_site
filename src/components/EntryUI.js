import React from 'react';
import MessageList from "./MessageList.js";

class EntryUI extends React.Component {
	constructor(props) {
		super(props);

		//top level game state, let's say used for messages & layout for now
		this.state = {
			inputText: '',   	 //user input text
			messages: [], //messages to render - each is an object with props to give correct input state
			priorInputs: [],
			priorInputsIdx: null,
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
			this.publishMessage(message,text);
		}
	}

	handleChange(e) { this.setState({ inputText: e.target.value });
	}

	updateFn(state,message,text){

		let updates = {
			inputText: '',
		};

		if(message.message !== null){
			const newMessage = {
				message: message.message,
				id: Date.now()
			};

			updates.messages = state.messages.concat(newMessage)
		}

		if(state.priorInputs.at(-1)!==text)
			updates.priorInputs = state.priorInputs.concat(text);

		// if(state.priorInputs.at(state.priorInputsIdx))

		return updates
	}

	handleKeyDown(e) {
		const { cursor, result } = this.state
		// arrow up/down button should select next/previous list element
		if (e.keyCode === 38 && cursor > 0) {
			this.setState( prevState => ({
				cursor: prevState.cursor - 1
			}))
		} else if (e.keyCode === 40 && cursor < result.length - 1) {
			this.setState( prevState => ({
				cursor: prevState.cursor + 1
			}))
		}
	}

	publishMessage(message,text=''){
		this.setState(state=>(this.updateFn(state,message,text)))
	}

	componentDidMount(){
		console.log('triggered')
		this.handleTextSubmit('look')
	}

}

export default EntryUI