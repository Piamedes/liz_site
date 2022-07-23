import React from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap/dist/react-bootstrap.min.js';

class PuzzleSimon extends React.Component {
  constructor(props) {
    super(props);

    this.simonPuzzles = [
      {
        message: <div><h>Simon Says:</h><p>Watch what Simon says.  Symbols never wasted.</p></div>,
        answer:  'wwsssnw',
      },
      {
        message: <div><h>19 9 13 15 14   19 1 25 19:</h><p/><p>11+12=?</p><p>17-12=?</p><p>9+10=?</p><p>15-1=?</p></div>,
        answer:  'wesn'
      },
    ];

    this.validInputs = ['n','s','e','w'];

    this.state = { 
      directions:  '', 
      value:       '', 
      valid:       null, 
      message:     <div><p>To pass you must obey Simon's direction to the letter.</p>{this.simonPuzzles[0].message}</div>, 
      simonPuzzle: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  render() {
    return (
      <div className="container">
        <p>{this.state.message}</p>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="formBasicText" validationState={this.state.valid}>
            <ControlLabel>Enter a direction (N/S/E/W)</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder=''
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
      </div>
    );
  }

  isValidInput(input){
    return this.validInputs.includes( input );
  }

  handleChange(e) {
    this.setState({ 
      value: e.target.value,
      valid: this.isValidInput(e.target.value) ? null : 'error',
    });
  }

  handleSubmit(e){
    e.preventDefault();

    if(!this.state.value.length)
      return;

    if(!this.isValidInput(this.state.value)){
      this.setState({ value: ''});
      return;
    }

    var message     = '';
    var simonPuzzle = this.simonPuzzles[ this.state.simonPuzzle ];
    var directions  = this.state.directions;
    directions     += this.state.value;

    if(directions.length === simonPuzzle.answer.length){
      if(directions === simonPuzzle.answer ){
        message = <div><p>Simon provides more directions.</p>{this.simonPuzzles[ this.state.simonPuzzle + 1 ].message}</div>;
        this.setState({simonPuzzle: this.state.simonPuzzle + 1});
      }
      else
        message = <div><h>You somehow end up back where you started</h>{simonPuzzle.message}</div>;
      
      directions = '';
    }
    else
      message = <div><br/>{simonPuzzle.message}</div>;

    this.setState({
        directions: directions,
        message:    message,
        value:      '',
    })
  }
}

export default PuzzleSimon;