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
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{activePuzzle.display}<span className="caret"></span></a>
        <ul className="dropdown-menu">
          {this.props.puzzles.map((puzzle) => (
            <li key={puzzle.id} className={activePuzzle.name === puzzle.name ? "active" : ''}><a href="#" onClick={this.props.makeActiveCallback(puzzle.id)}>{puzzle.display}</a></li>
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
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="">The Trials:</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
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
