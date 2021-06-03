import React from 'react';
import { connect } from 'react-redux';
import DifficultySelectorComponent from './components/DifficultySelectorComponent';
import BoardComponent from './components/BoardComponent';
import HowToPlayComponent from './components/HowToPlayComponent'
import './App.css';
class App extends React.Component{

  render() {
    if(this.props.difficulty === undefined) {
      return(
        <div className="app">
          <h1 className="title">Set!</h1>
          <h2 className="subtitle">by Ture Carlson</h2>
          <HowToPlayComponent />
          <DifficultySelectorComponent />
        </div>
      );
    }

    return(
      <div className="app">
        <h1 className="title">Set!</h1>
        <h2 className="subtitle">by Ture Carlson</h2>
        <HowToPlayComponent />
        <BoardComponent />
      </div>
    )}
}

let mapStateToProps = (state, props) => {
  return {
    difficulty: state.difficulty
  }
}

let mapDispatchToProps = (dispatch, props) => {return{};};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);