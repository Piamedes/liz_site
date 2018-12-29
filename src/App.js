import React from 'react';
import PuzzleCastle from './PuzzleCastle.js';
import './App.css';
import { Nav, NavItem, NavDropdown, Navbar, MenuItem } from 'react-bootstrap/dist/react-bootstrap.min.js';

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

class NavbarRenderer extends React.Component {
  render(){

    const activePuzzle = this.props.puzzles[ this.props.activePuzzle ];
    return( 
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">{'The Trials:  ' + activePuzzle.display}</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavDropdown eventKey={0} title="Puzzles" id="basic-nav-dropdown">
              {this.props.puzzles.map((puzzle) => (
                <MenuItem key={puzzle.id} 
                          className={activePuzzle.name === puzzle.name ? "active" : ''} 
                          onClick={this.props.makeActiveCallback(puzzle.id)}>
                          {puzzle.display}
                </MenuItem>
              ))}
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              FAQ
            </NavItem>
            <NavItem eventKey={2} href="#">
              Help
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
        <NavbarRenderer activePuzzle={this.state.activePuzzle} makeActiveCallback={this.makeActiveCallback} puzzles={this.state.puzzles} />
        <ContentRenderer activePuzzle={this.state.activePuzzle} puzzles={this.state.puzzles}/>
      </div>
    );
  }
}

export default App;
