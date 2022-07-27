import React 		  from 'react';
import GameEngine     from './game/GameEngine.js';
import NavbarRenderer from './components/NavbarRenderer';
import EntryUI 		  from './components/EntryUI.js';
import ModalManager   from './components/ModalManager.js';
import './resources/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleModalClose           = this.handleModalClose.bind(this);
    this.handleModalShowCallback    = this.handleModalShowCallback.bind( this);
    this.puzzleSpotCallback	 		= this.puzzleSpotCallback.bind(this);

    this.gameEngine = new GameEngine({puzzleSpotCallback:this.puzzleSpotCallback});

    this.state = {
      modalCloseCallback: null,
      modalShow:  false,
      modalTitle: '',
      modalBody:  '',
    }
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

  puzzleSpotCallback(puzzleId){
  	alert(this.gameEngine.mapEngine.getPuzzle(puzzleId).name);
  }

  render() {
    return( 
      <div>
        <NavbarRenderer handleModalShowCallback={this.handleModalShowCallback}/>
        <EntryUI processInput={this.gameEngine.processInput}/>
        <ModalManager modalShow={this.state.modalShow} modalBody={this.state.modalBody} modalTitle={this.state.modalTitle} handleModalClose={this.handleModalClose}/>
      </div>
    );
  }
}

export default App;
