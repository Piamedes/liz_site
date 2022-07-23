import React from 'react';

class Player extends React.Component{
    constructor(props){
    	super(props);

    	this.roomId = props.roomId;
    }

    currentRoomId(){
    	//return this.state.roomId;
    	return this.roomId
    }

    moveRooms(roomIdNew){
    	this.roomId = roomIdNew;
    }

}

export default Player