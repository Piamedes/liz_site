import React, { Component } from 'react';

class PuzzleCastle extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      actions:   [], 
      inputText: '', 

      xloc: 0,
      yloc: 0,
      xmin: 0,
      xmax: board.length - 1,
      ymin: 0,
      ymax: board[ 0 ].length - 1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div> 
        <div class="container">
          <h3>spacing</h3>
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

    if(      action === 'north' && yloc !== this.state.ymax && board[ xloc ][ yloc + 1 ] !== 0 )
      return( true )
    else if( action === 'south' && yloc !== this.state.ymin && board[ xloc ][ yloc - 1 ] !== 0 )
      return( true )
    else if( action === 'west'  && xloc !== this.state.xmin && board[ xloc - 1 ][ yloc ] !== 0 )
      return( true )
    else if( action === 'east'  && xloc !== this.state.xmax && board[ xloc + 1 ][ yloc ] !== 0 )
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
    var message = 'You walk into a ' + boardKey[ board[ xloc ][ yloc ] ] + ' room.  You see ';

    //TO-DO: implement overrides
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

  handleSubmit(e) {
    e.preventDefault()

    if (!this.state.inputText.length)
      return
    
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