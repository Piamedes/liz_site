import React from 'react';
import MessageList from "./MessageList.js";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

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
				<Container fluid='md'>
					<Row style={{color:'white'}}>Nothing to see here, I'm just bad at CSS layout and this was the laziest solution</Row>
					<Row>
						<Form>
						    <Stack direction="horizontal" gap={1}>
					     		<Form.Control className="me-auto" placeholder="So..." onChange={this.handleChange} value={this.state.inputText} onSubmit={this.handleSubmit}/>
					    		<Button type="submit" variant="secondary" onClick={this.handleSubmit}>Submit</Button>
						    </Stack>
					    </Form>
					</Row>
					<Row style={{color:'white'}}>Also nothing to see here. It worked once so I'll do it again.</Row>
					<Row>
						<MessageList messages={this.state.messages}/>
					</Row>
				</Container>
			</div>
		);
	}

					// <form onSubmit={this.handleSubmit}>
					// 	<label htmlFor="new-action">So?</label>
					// 	<input id="new-action" onChange={this.handleChange} value={this.state.inputText}/>
					// </form>

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

			const msgs = [newMessage];

			updates.messages = msgs.concat( state.messages )
		}

		if(state.priorInputs.at(-1)!==text)
			updates.priorInputs = state.priorInputs.concat(text);

		// if(state.priorInputs.at(state.priorInputsIdx))

		return updates
	}

	// handleKeyDown(e) {
	// 	const { cursor, result } = this.state
	// 	// arrow up/down button should select next/previous list element
	// 	if (e.keyCode === 38 && cursor > 0) {
	// 		this.setState( prevState => ({
	// 			cursor: prevState.cursor - 1
	// 		}))
	// 	} else if (e.keyCode === 40 && cursor < result.length - 1) {
	// 		this.setState( prevState => ({
	// 			cursor: prevState.cursor + 1
	// 		}))
	// 	}
	// }

	publishMessage(message,text=''){
		this.setState(state=>(this.updateFn(state,message,text)))
	}

	componentDidMount(){
		console.log('triggered')
		this.handleTextSubmit('look')
	}

}

export default EntryUI