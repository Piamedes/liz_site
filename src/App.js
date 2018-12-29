import React from 'react';
import PuzzleCastle from './PuzzleCastle.js';
import './App.css';

class Temp extends React.Component{
  render() {
    return (
      <div> 
        <h3>test</h3>
        <h3>test</h3>
        <h3>test</h3>
        <h3>test</h3>
      </div>
    );
  } 
}

class ContentRenderer extends React.Component {
  render() {
    const TagName = this.props.puzzles[this.props.activePuzzle].className;
    return( <TagName />);
  }  
}

class DropdownMenu extends React.Component {
  render() {
    const activePuzzle = this.props.puzzles[ this.props.activePuzzle ];

    return( 
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{activePuzzle.display}<span class="caret"></span></a>
        <ul class="dropdown-menu">
          {this.props.puzzles.map((puzzle) => (
            <li key={puzzle.id} class={activePuzzle.name === puzzle.name ? "active" : ''}><a href="#" onClick={this.props.makeActiveCallback(puzzle.id)}>{puzzle.display}</a></li>
          ))}
        </ul>
      </li>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePuzzle:    0,
      unlockedPuzzles: ['castle','temp'],

      puzzles: [
        {
          id:        0,
          name:      'castle',
          display:   'The Castle',
          className: PuzzleCastle,
        },
        {
          id:        1,
          name:      'temp',
          display:   'The Temp', 
          className: Temp,
        },
      ],
    }

    this.makeActiveCallback = this.makeActiveCallback.bind(this);
  }

  makeActiveCallback(inputPuzzle){
    return( ()=>{ this.setState( { activePuzzle: inputPuzzle} ) } );
  }

  render() {
    return( 
      <div>
        <nav class="navbar navbar-inverse navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <a class="navbar-brand" href="">The Trials:</a>
            </div>
            <div id="navbar" class="collapse navbar-collapse">
              <ul class="nav navbar-nav">
                <DropdownMenu activePuzzle={this.state.activePuzzle} makeActiveCallback={this.makeActiveCallback} puzzles={this.state.puzzles} />
              </ul>
            </div>
          </div>
        </nav>
        <ContentRenderer activePuzzle={this.state.activePuzzle} puzzles={this.state.puzzles}/>
      </div>
    );
  }
}

export default App;
