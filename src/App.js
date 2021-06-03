import React from 'react';
import { connect } from 'react-redux';
import DifficultySelectorComponent from './components/DifficultySelectorComponent';
import BoardComponent from './components/BoardComponent';
import HowToPlayComponent from './components/HowToPlayComponent'
import './App.css';
import RestartGameAction from './actions/RestartGameAction';
import SwitchViewAction from './actions/SwitchViewAction';
import GameViews from './model/GameViews';
class App extends React.Component{

  render() {
    if(this.props.difficulty === undefined) {
      return(
        <div className="app">
          <h1 className="title">Set!</h1>
          <h2 className="subtitle">by Ture Carlson</h2>
          <div className='component-container'>
          <HowToPlayComponent />
        </div>
          <DifficultySelectorComponent />
        </div>
      );
    }

    switch (this.props.currentView) {
      case GameViews.BOARD:
        return(
          <div className="app">
            <h1 className="title">Set!</h1>
            <h2 className="subtitle">by Ture Carlson</h2>
            <button className='views-button' onClick={() => this.#switchView()}>How To Play</button>
            <button className='restart-button' onClick={() => this.#restartGame()}>Restart</button>
            <BoardComponent />
          </div>
        );
      case GameViews.HOWTO:
        return(
          <div className="app">
              <h1 className="title">Set!</h1>
              <h2 className="subtitle">by Ture Carlson</h2>
              <button className='views-button' onClick={() => this.#switchView()}>Back to Game</button>
              <button className='restart-button' onClick={() => this.#restartGame()}>Restart</button>
              <HowToPlayComponent />
          </div>
        );
      default:
        break;
    }

  }

  #restartGame = () => {
    this.props.restartGame();
    this.forceUpdate();
  }

  #switchView = () => {
    this.props.switchView();
    this.forceUpdate();
  }

}

let mapStateToProps = (state, props) => {
  return {
    difficulty: state.difficulty,
    currentView: state.currentView
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {
    restartGame: () => {
      dispatch(RestartGameAction());
    },
    switchView: () => {
      dispatch(SwitchViewAction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);