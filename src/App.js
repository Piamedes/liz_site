import React 		  from 'react';
import Game 		  from './game/Game.js';
import NavbarRenderer from './components/NavbarRenderer';
import EntryUI 		  from './components/EntryUI.js';
import ModalManager   from './components/ModalManager.js';
import './resources/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.Game = new Game();

    this.state = {
      modalCloseCallback: null,
      modalShow:  false,
      modalTitle: '',
      modalBody:  '',
    }

    this.handleModalClose           = this.handleModalClose.bind(this);
    this.handleModalShowCallback    = this.handleModalShowCallback.bind( this);
  }

  handleModalClose(){ 
      if(this.state.modalCloseCallback !== null)
        this.state.modalCloseCallback();

      this.setState({ 
        modalShow:  false,
        modalTitle: '',
        modalBody:  '',
        modalCloseCallback: null,
      })
  };

  handleModalShow( title, body, closeCallback = null ){ 
    this.setState({ 
      modalShow: true,
      modalTitle: title,
      modalBody:  body,
      modalCloseCallback: closeCallback,
    })
  };  

  handleModalShowCallback( title, body, closeCallback = null){ 
    return( ()=>{ this.handleModalShow(title, body, closeCallback ) })
  };

  render() {
    return( 
      <div>
        <NavbarRenderer handleModalShowCallback={this.handleModalShowCallback}/>
        <EntryUI processInput={this.Game.processInput}/>
        <ModalManager modalShow={this.state.modalShow} modalBody={this.state.modalBody} modalTitle={this.state.modalTitle} handleModalClose={this.handleModalClose}/>
      </div>
    );
  }
}

export default App;
