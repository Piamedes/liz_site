import React from 'react';
import Container from 'react-bootstrap/Container';

class MessageList extends React.Component{
	render(){
		return (
			<Container fluid='md'>
				<ul>
				{this.props.messages.map((message) => (
					<li key={message.id}>
						<div className="content">{message.message}</div><br/>
					</li>
				))}
				</ul>
			</Container>
			);
	}
}

export default MessageList