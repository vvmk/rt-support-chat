import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection.jsx';
import UserSection from './users/UserSection.jsx';
import MessageSection from './messages/MessageSection.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			channels: [],
			users: [],
			messages: [],
		};
	}
	addChannel(name) {
		let {channels} = this.state;

		// TODO: validate unique channelName
		const newChannel = {id: channels.length, name};
		
		if (channels.length == 0)
			this.setChannel(newChannel);

		channels.push(newChannel);
		this.setState({channels});
		// TODO: send this to server
	}
	setChannel(activeChannel) {
		if (this.state.activeChannel !== activeChannel) {
			this.setState({messages: []});
			this.setState({activeChannel});
		}
		// TODO: send message to server "{user} Joined channel {channel} @ Date.now()"
		// TODO: Get Channel's Messages from server 
	}

	addUser(name) {
		let {users} = this.state;
		//TODO: validate unique username
		const newUser = {id: users.length, name};
		users.push(newUser);
		this.setState({users});
		this.setState({activeUser: newUser});
		// TODO: send to server
	}
	setUser(activeUser) {
		this.setState({activeUser});
	}

	/* 
	 * removeUser takes a name(string) and removes the corresponding 
	 * user from the list, updating state
	 * 
	 * TODO: would love to write a better data structure but in the 
	 *			context of this simple app that may be overkill.
	 */
	removeUser(name) {
		let {users} = this.state;
		users.find((usr, index) => {
			if (usr.name === name) {
				users.slice(index);
				return true;
			}
			return false;
		});
		this.setState({users});
	}

	/*
	 * addMessage 
	 */
	addMessage(message) {
		let {messages} = this.state;
		let timestamp = Date.now();
		messages.push({id: messages.length, author: this.state.activeUser, message, timestamp});
		this.setState({messages});
		// TODO: send message to server
	}
	render() {
		return (
			<div className='app'>
				<div className='nav'>
					<ChannelSection
						{...this.state}
						addChannel={this.addChannel.bind(this)}
						setChannel={this.setChannel.bind(this)}
					/>
					<UserSection
						{...this.state}
						addUser={this.addUser.bind(this)}
						setUser={this.setUser.bind(this)}
					/>
					<MessageSection
						{...this.state}
						addMessage={this.addMessage.bind(this)}
					/>
				</div>
			</div>
		)
	}
}

export default App