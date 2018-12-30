import React from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap/dist/react-bootstrap.min.js';

class PuzzleSpy extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      valid:  null, 
      value:  '', 
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 

    this.message = <div>
      <p>agent m,</p>
      <p> Finally you found my message </p>
    </div>;
  }

  render() {
    return(
      <div className="container">
        {this.message}
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

  handleChange(e) {
    const RegEx = /^[0-9\b]+$/;
    if (e.target.value === '' || RegEx.test(e.target.value)) {
       this.setState({value: e.target.value})
    }
  }

  handleSubmit(e){
    e.preventDefault();

    if(!this.state.value.length ) 
      return;

    if(!this.props.validatePassword(this.props.puzzle.id, this.state.value, true )){
      this.setState({
        value: '',
        valid: 'error',
      })
    }else{
      //puzzle complete
    }
  }
}

export default PuzzleSpy;