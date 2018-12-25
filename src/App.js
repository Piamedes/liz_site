import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';




const board = [
  //One character + space
  [ 1, 1, 1, 1, 1 ],
  [ 0, 0, 1, 0, 0 ],
  [ 1, 1, 1, 1, 1 ],
  [ 1, 0, 0, 0, 1 ],
  //One character + space
  [ 1, 1, 1, 1, 1 ],
  [ 1, 0, 1, 0, 1 ],
  [ 1, 0, 1, 0, 1 ],
  [ 1, 0, 0, 0, 1 ],
  //One character + space
  [ 1, 1, 1, 1, 1 ],
  [ 1, 0, 0, 0, 0 ],
  [ 1, 0, 0, 0, 0 ],
  [ 1, 0, 0, 0, 0 ],
  //One character + space
  [ 1, 1, 1, 1, 1 ],
  [ 1, 0, 0, 0, 0 ],
  [ 1, 0, 0, 0, 0 ],
  [ 1, 0, 0, 0, 0 ],
  //One character + space
  [ 1, 1, 1, 1, 1 ],
  [ 1, 0, 0, 0, 1 ],
  [ 1, 1, 1, 1, 1 ],
];  

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      actions:   [], 
      inputText: '', 

      xloc: 0,
      yloc: 0,
      xmin: 0,
      xmax: board.length,
      ymin: 0,
      ymax: board[ 0 ].length,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>Escape the Castle</h3>
        <p> You wake up in a dimly lit room, unsure of how you arrived.</p>
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

  performAction(action){
    const xloc = this.state.xloc;
    const yloc = this.state.yloc;

    const newState = {
      xloc: xloc + ( action === 'west'  ? -1 : action === 'east'  ? 1 : 0 ), 
      yloc: yloc + ( action === 'south' ? -1 : action === 'north' ? 1 : 0 )
    }

    this.setState( newState )

    return 'You walked ' + action
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
    else if(!this.validateAction(input.action))
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

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

export default App;
