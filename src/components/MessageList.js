import React from 'react';

class MessageList extends React.Component {

	render(){
		return (
			<ul>
			{this.props.messages.map((message) => (
				<li key={message.id}>
					<div className="content">{message.message}</div>
				</li>
			))}
			</ul>
			);
	}

}

export default MessageList