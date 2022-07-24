import React from 'react';

class GameSetupBase extends React.Component{
	constructor(props){
		super(props);

		this.externalIds = {}
	}

	init(storedSettings={},GB){
		this.externalIds = this.initRoomsPathsPuzzles(storedSettings,GB);
	}

	initRoomsPathsPuzzles(GB,storedSettings={}){
		throw new Error('implement me!');
	}
}

export default GameSetupBase;