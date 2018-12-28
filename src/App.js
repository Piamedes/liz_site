import React, { Component } from 'react';
import PuzzleCastle from './PuzzleCastle.js';
import logo from './logo.svg';
import './App.css';

class Temp extends React.Component{
   constructor(props) {
    super(props);

  }

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
  constructor(props) {
    super(props);

    this.puzzles = {
        castle: PuzzleCastle,
        temp:   Temp
    }
  }

  render() {
    const TagName = this.puzzles[this.props.activePuzzle];
    return( <TagName />);
  }  
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePuzzle: 'temp',
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
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">The Trials:</a>
            </div>
            <div id="navbar" class="collapse navbar-collapse">
              <ul class="nav navbar-nav">
                <li class={this.state.activePuzzle === 'castle' ? "active" : ''}><a href="#" onClick={this.makeActiveCallback('castle')}>The Castle</a></li>
                <li class={this.state.activePuzzle === 'temp' ?   "active" : ''}><a href="#" onClick={this.makeActiveCallback('temp')}>Temp</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <ContentRenderer activePuzzle={this.state.activePuzzle}/>
      </div>
    );
  }
}

export default App;
