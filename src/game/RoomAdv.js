import Room from "./Room.js";

class RoomAdv extends Room{
	constructor(props){
		super(props);
		this.type  = 'custom room';
		this.FLAGS = {}
	}

	render(direction,path){
		throw new Error('implement me!');
	}
}

export default RoomAdv;