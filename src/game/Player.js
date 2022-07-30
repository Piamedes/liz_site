import React from 'react';
import {getSavedValue,setSavedValue} from "../lib/Utils.js";

class Player extends React.Component{
    constructor(props){
    	super(props);

    	this.roomId = getSavedValue('player','roomId','START');
    }

    currentRoomId(){
    	//return this.state.roomId;
    	return this.roomId
    }

    moveRooms(roomIdNew){
    	this.roomId = roomIdNew;
    	setSavedValue('player','roomId',roomIdNew)
    }

}

export default Player