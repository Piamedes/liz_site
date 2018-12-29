import React from 'react';
import PuzzleCastle from './PuzzleCastle.js';
import './App.css';
import { Button, Nav, NavItem, NavDropdown, Navbar, MenuItem, Modal } from 'react-bootstrap/dist/react-bootstrap.min.js';

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
            <NavItem eventKey={1} onClick={this.props.handleModalShow('FAQ','FAQ')}>
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

class ModalManager extends React.Component {
  render(){
    return(
      <div>
        <Modal show={this.props.modalShow} onHide={this.props.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.modalBody}</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      modalShow:  false,
      modalTitle: '',
      modalBody:  '',

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

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalShow  = this.handleModalShow.bind( this);
  }

  handleModalClose(){ 
    this.setState({ 
      modalShow:  false,
      modalTitle: '',
      modalBody:  '',
    })
  };

  handleModalShow( title, body ){ 
    return( ()=>{
      this.setState({ 
        modalShow: true,
        modalTitle: title,
        modalBody:  body,
      })
    });
  };

  makeActiveCallback(inputPuzzle){
    return( ()=>{ this.setState( { activePuzzle: inputPuzzle} ) } );
  }

  render() {
    return( 
      <div>
        <NavbarRenderer activePuzzle={this.state.activePuzzle} makeActiveCallback={this.makeActiveCallback} puzzles={this.state.puzzles} handleModalShow={this.handleModalShow} />
        <ContentRenderer activePuzzle={this.state.activePuzzle} puzzles={this.state.puzzles}/>
        <ModalManager modalShow={this.state.modalShow} modalBody={this.state.modalBody} modalTitle={this.state.modalTitle} handleModalClose={this.handleModalClose}/>
      </div>
    );
  }
}

export default App;
