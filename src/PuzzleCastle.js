import React from 'react';
import { Image } from 'react-bootstrap/dist/react-bootstrap.min.js';

class PuzzleCastle extends React.Component {
  constructor(props) {
    super(props);

  	this.boardKey = [
  	  'no room',      //0
  	  'dark',         //1
  	  'dimly lit',    //2
  	  'well-lit',     //3
  	  'brightly lit'  //4
  	];

  	this.board = [
  	  //One character + space P
  	  [ 3, 2, 4, 2, 3 ],
  	  [ 0, 0, 3, 0, 4 ],
  	  [ 0, 1, 2, 3, 2 ],
  	  [ 0, 1, 0, 0, 1 ],
      //One character + space A
      [ 4, 2, 3, 2, 4 ],
      [ 1, 0, 2, 0, 2 ],
      [ 4, 2, 3, 3, 4 ],
      [ 1, 0, 0, 0, 0 ],


      //One character + space N
      [ 4, 3, 2, 2, 2 ],
      [ 1, 0, 0, 3, 1 ],
      [ 1, 0, 2, 1, 0 ],
      [ 1, 4, 0, 0, 1 ],
      [ 3, 2, 4, 2, 3 ],   
      [ 0, 0, 0, 1, 0 ],

      //One character + space E
      [ 2, 4, 3, 2, 4 ],
      [ 4, 0, 2, 0, 2 ],
      [ 3, 0, 2, 1, 2 ],
      [ 1, 0, 0, 0, 0 ],

      //One character + space R
      [ 2, 4, 3, 2, 4 ],
      [ 0, 2, 2, 0, 2 ],
      [ 3, 0, 2, 4, 2 ],
      [ 1, 0, 1, 0, 0 ],

      //One character + space A
      [ 4, 3, 2, 3, 4 ],
      [ 0, 0, 2, 0, 4 ],
      [ 4, 4, 3, 2, 2 ],
      [ 1, 0, 1, 0, 0 ],

      //One character + space end
      [ 0, 0, 1, 0, 0 ],
      [ 0, 0, 1, 0, 0 ],
      [ 0, 0, 1, 0, 0 ],
  	]; 

    this.xfin = this.board.length - 1;
    this.yfin = 2;

    this.boardOverrides = [];

    for( var index = 0; index < this.board.length; index++){
      this.boardOverrides.push( Array(this.board[ 0 ].length ).fill( null ) );
    }

    this.boardOverrides[ 0         ][ 2         ] = 'You walk into a brightly lit room with exits to the north, south, and east.  A sign hanging on the wall reads "The light will show you the answer".'
    this.boardOverrides[ this.xfin ][ this.yfin ] = 'You walk into a dark room.  An odd looking man wearing a large spotted hat looks at you strangely.  He asks you what you seek.'
    
    this.state = { 
      actions:   [], 
      inputText: '', 

      xloc: 0,
      yloc: 0,
      xmin: 0,
      xmax: this.board.length - 1,
      ymin: 0,
      ymax: this.board[ 0 ].length - 1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  render() {
    return (
      <div> 
        <div className="container">
          <p> You wake up in a dimly lit room, unsure of how you arrived.  An exit is to the north.</p>
          <ActionList actions={this.state.actions} />
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="new-action">
              Where do you want to move (N/S/E/W)?
            </label>
            <input
              id="new-action"
              onChange={this.handleChange}
              value={this.state.inputText}
            />
          </form>
        </div>
      </div>
    );
  }

  parseInput(inputRaw){
    let input  = inputRaw.toLowerCase();
    var result = {
        valid:  true,
        action: '',
    };

    let matches = {
      n: 'north',
      s: 'south',
      e: 'east',
      w: 'west',
      north: 'north',
      south: 'south',
      east:  'east',
      west:  'west',
    };

    if( matches.hasOwnProperty( input ) )
      result.action = matches[ input ]
    else
      result.valid = false;

    return result
  }

  canGo(action, xloc, yloc ){

    if(      action === 'north' && yloc !== this.state.ymax && this.board[ xloc ][ yloc + 1 ] !== 0 )
      return( true )
    else if( action === 'south' && yloc !== this.state.ymin && this.board[ xloc ][ yloc - 1 ] !== 0 )
      return( true )
    else if( action === 'west'  && xloc !== this.state.xmin && this.board[ xloc - 1 ][ yloc ] !== 0 )
      return( true )
    else if( action === 'east'  && xloc !== this.state.xmax && this.board[ xloc + 1 ][ yloc ] !== 0 )
      return( true )
    else
      return( false );  
  }

  validateAction(action){

    if( action === 'north' && this.state.yloc === this.state.ymax )
      return( false )
    else if( action ==='south' && this.state.yloc === this.state.ymin )
      return( false )
    else if( action ==='west' && this.state.xloc === this.state.xmin )
      return( false )
    else if( action ==='east' && this.state.xloc === this.state.xmax )
      return( false )
    else
      return( true );  
  }

  describeAction( xloc, yloc ){   

    if( this.boardOverrides[ xloc ][ yloc ] !== null ){
      return( this.boardOverrides[ xloc ][ yloc ] );
    }else{
      var message = 'You walk into a ' + this.boardKey[ this.board[ xloc ][ yloc ] ] + ' room.  You see ';

      var availableRooms = []; 
      const directions   = ['north','south','east','west'];

      directions.forEach((direction)=>{
        if(this.canGo( direction, xloc, yloc ) )
          availableRooms.push( direction )
      }, this )

      if( availableRooms.length === 1 )
        message += ( 'an exit to the ' + availableRooms[ 0 ] )
      else if( availableRooms.length === 2 )
        message += ( 'exits to the ' + availableRooms[ 0 ] + ' and ' + availableRooms[ 1 ] )
      else if( availableRooms.length === 3 )
        message += ( 'exits to the ' + availableRooms[ 0 ] + ', ' + availableRooms[ 1 ] + ', and ' + availableRooms[ 2 ] )
      else if( availableRooms.length === 4 )
        message += ( 'exits in all directions' );

      message += ".";

      return( message );
    }
  }

  performAction(action){
    const xloc = this.state.xloc;
    const yloc = this.state.yloc;

    const xloc_new = xloc + ( action === 'west'  ? -1 : action === 'east'  ? 1 : 0 );
    const yloc_new = yloc + ( action === 'south' ? -1 : action === 'north' ? 1 : 0 );

    const newState = {
      xloc: xloc_new, 
      yloc: yloc_new
    }

    this.setState( newState )

    return this.describeAction( xloc_new, yloc_new )
  }

  publishResult(message){

    const newAction = {
      message: message,
      id: Date.now()
    };

    this.setState(state => ({
      actions: state.actions.concat(newAction),
      inputText: ''
    }));
  }

  puzzleComplete(){

    var completeInfo = {
        puzzleComplete: false,
        invalidAnswer:  false,
        message:        '', 
    }

    if(this.state.xloc === this.xfin && this.state.yloc === this.yfin){

      if(this.props.validatePassword( this.props.puzzle.id, this.state.inputText, true ) )
        completeInfo.puzzleComplete = true;
      else{
        completeInfo.invalidAnswer = true;
        completeInfo.message       = "The old sage looks at you with a confused expression."       
      }
    }

    return( completeInfo );
  }

  handleSubmit(e){
    e.preventDefault()

    if (!this.state.inputText.length)
      return

    var completeInfo = this.puzzleComplete();

    if(completeInfo.puzzleComplete){
      //this.props.unlockPuzzle(this.props.puzzle.id + 1, false);
      var callback = this.props.handleModalShowCallback('Puzzle Complete!',<Image src={require('./castle.png')} responsive/>,()=>{this.props.changeActivePuzzle(this.props.puzzle.id+1)});
      callback();
    }else if(completeInfo.invalidAnswer){
      this.publishResult(completeInfo.message);
    }else{
      let input   = this.parseInput( this.state.inputText );
      let message = ''

      if(!input.valid)
        message = 'Input invalid'
      else if(!this.canGo( input.action, this.state.xloc, this.state.yloc ) )
        message = 'Cannot go that way'
      else
        message = this.performAction(input.action)

      this.publishResult(message)      
    }
  }

  handleChange(e) {
    this.setState({ inputText: e.target.value });
  }
}

class ActionList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.actions.map((action) => (
          <li key={action.id}>{action.message}</li>
        ))}
      </ul>
    );
  }
}


export default PuzzleCastle;