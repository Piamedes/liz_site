import React from 'react';
import PuzzleCastle from './PuzzleCastle.js';
import PuzzleGPS from './PuzzleGPS.js';
import './App.css';
import { Button, ControlLabel, FormControl, FormGroup, Image, Nav, NavItem, NavDropdown, Navbar, MenuItem, Modal } from 'react-bootstrap/dist/react-bootstrap.min.js';

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
                          onClick={this.props.handleSwitchPuzzleCallback(puzzle.id)}>
                          {puzzle.unlocked ? puzzle.display : 'XXXXX'}
                </MenuItem>
              ))}
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} onClick={this.props.handleModalShowCallback('FAQ',<Image src={require('./castle.png')} responsive/>)}>
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

class PasswordForm extends React.Component{
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      value:   '',
      valid:   null,
      message: 'Please enter the password.'
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();

    if (!this.state.value.length)
      return

    if( this.props.validatePassword(this.props.inputPuzzle, this.state.value)){
      this.props.unlockPuzzle(this.props.inputPuzzle);
    } else {
      this.setState({
          value:   '', 
          valid:   'error',
          message: 'Invalid password.  Please try again.'
        });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="formBasicText" validationState={this.state.valid}>
          <ControlLabel>{this.state.message}</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter password"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
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
            <Button onClick={this.props.handleModalClose}>Close</Button>
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

      puzzles: [
        {
          id:        0,
          name:      'castle',
          display:   'The Castle',
          className: PuzzleCastle,
          unlocked:  true,
          answer:    'peach',
        },
        {
          id:        1,
          name:      'GPS',
          display:   'The GPS', 
          className: PuzzleGPS,
          unlocked:  false,
          answer:    'temp',
        },
        {
          id:        2,
          name:      'temp2',
          display:   'The Temp2', 
          className: Temp,
          unlocked:  false,
          answer:    '2',
        },
      ],
    }

    this.handleSwitchPuzzleCallback = this.handleSwitchPuzzleCallback.bind(this);
    this.unlockPuzzle               = this.unlockPuzzle.bind(this);
    this.validatePassword           = this.validatePassword.bind(this);

    this.handleModalClose           = this.handleModalClose.bind(this);
    this.handleModalShowCallback    = this.handleModalShowCallback.bind( this);
  }

  validatePassword(inputPuzzle, password){
    return password.toLowerCase() === this.state.puzzles[inputPuzzle - 1].answer;
  }

  unlockPuzzle(inputPuzzle){
      var puzzles = this.state.puzzles;
      puzzles[inputPuzzle].unlocked = true;

      this.setState({ puzzles: puzzles });
      this.handleModalClose();
      this.setState( { activePuzzle: inputPuzzle} );
  }

  handleModalClose(){ 
      this.setState({ 
        modalShow:  false,
        modalTitle: '',
        modalBody:  '',
      })
  };

  handleModalShow( title, body ){ 
    this.setState({ 
      modalShow: true,
      modalTitle: title,
      modalBody:  body,
    })
  };  

  handleModalShowCallback( title, body ){ 
    return( ()=>{ this.handleModalShow(title, body) })
  };

  handleSwitchPuzzle(inputPuzzle){
    const puzzle = this.state.puzzles[inputPuzzle];

    if(puzzle.unlocked){
      this.setState( { activePuzzle: inputPuzzle} );
    } else {
      this.handleModalShow('Unlock Puzzle ' + inputPuzzle, <PasswordForm inputPuzzle={inputPuzzle} validatePassword={this.validatePassword} unlockPuzzle={this.unlockPuzzle} responsive/>);
    }
  }

  handleSwitchPuzzleCallback(inputPuzzle){
    return( ()=>{ this.handleSwitchPuzzle(inputPuzzle)});
  }

  render() {
    return( 
      <div>
        <NavbarRenderer 
          activePuzzle={this.state.activePuzzle} 
          handleSwitchPuzzleCallback={this.handleSwitchPuzzleCallback} 
          handleModalShowCallback={this.handleModalShowCallback} 
          puzzles={this.state.puzzles} 
        />
        <ContentRenderer 
          activePuzzle={this.state.activePuzzle} 
          puzzles={this.state.puzzles}
          handleModalShowCallback={this.handleModalShowCallback} 
        />
        <ModalManager modalShow={this.state.modalShow} modalBody={this.state.modalBody} modalTitle={this.state.modalTitle} handleModalClose={this.handleModalClose}/>
      </div>
    );
  }
}

export default App;
