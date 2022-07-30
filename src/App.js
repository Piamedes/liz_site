import React 		  from 'react';
import GameEngine     from './game/GameEngine.js';
import NavbarRenderer from './components/NavbarRenderer';
import EntryUI 		  from './components/EntryUI.js';
import ModalManager   from './components/ModalManager.js';
import './resources/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PuzzleHintUI from './components/PuzzleHintUI.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleModalClose           = this.handleModalClose.bind(this);
    this.handleModalShowCallback    = this.handleModalShowCallback.bind( this);
    this.puzzleSpotCallback	 		= this.puzzleSpotCallback.bind(this);
    this.showHintsCallback			= this.showHintsCallback.bind(this);
    this.showHelpCallback 			= this.showHelpCallback.bind(this);

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

  puzzleSpotCallback(puzzleId,modalMessage){
  	if(modalMessage !== null )
  		this.handleModalShow(this.gameEngine.mapEngine.getPuzzle(puzzleId).name,modalMessage) 
  }

  showHelpCallback(){
  	let render = <div>
  					<ol>
  						<li>The standard directions (north,south,east,west,up,down) as well as their lazy versions (n,s,e,w,u,d) all work</li>
  						<li>Some rooms will have more complicated movement options and you'll have to just do your best</li>
  						<li>Read everything and explore everywhere you can</li>
  						<li>Many puzzles are taken from puzzled pint or other puzzle hunts.  Looking them up is cheating!</li>
  						<li>Here's some helpful <a target="_blank" rel="noopener noreferrer" href={'faq_basic.pdf'}><u>{'guidance'}</u></a> and <a target="_blank" rel="noopener noreferrer" href={"faq_codes.pdf"}><u>{'code pages'}</u></a></li>
  						<li>Don't be afraid to move onto another puzzle and explore any other paths (there are hidden paths and puzzles)</li>
  						<li>The game is AUTOSAVES every action - if you think you're completely stuck and want to reset, simply type <b>reset</b></li>
  						<li>Call Ben if you need more help :).  Entirely possible the game is broken, so don't hesitate to ask</li>
					</ol>
  				</div>;

  	this.handleModalShow('Help',render);
  }

  showHintsCallback(){
	let puzzles = this.gameEngine.getVisiblePuzzles();
  	this.handleModalShow('Hints',<PuzzleHintUI puzzles={puzzles}/>);
  }

  render() {
    return( 
      <div>
        <NavbarRenderer showHelpCallback={this.showHelpCallback} showHintsCallback={this.showHintsCallback}/>
        <EntryUI processInput={this.gameEngine.processInput}/>
        <ModalManager modalShow={this.state.modalShow} modalBody={this.state.modalBody} modalTitle={this.state.modalTitle} handleModalClose={this.handleModalClose}/>
      </div>
    );
  }
}

export default App;
