import React, { Component } from 'react';
import PuzzleCastle from './PuzzleCastle.js';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
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
                <li class="active"><a href="#">The Castle</a></li>
                <li><a href="#about">#####</a></li>
                <li><a href="#contact">#####</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <PuzzleCastle/>
      </div>
    );
  }
}


export default App;
