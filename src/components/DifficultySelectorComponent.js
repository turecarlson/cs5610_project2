import React from 'react';
import { connect } from 'react-redux';
import SetDifficultyAction from '../actions/SetDifficultyAction';
import GameDifficulty from '../model/GameDifficulty';
import './css/DifficultySelectorComponent.css';

class DifficultySelectorComponent extends React.Component {

    render() {
        return (
            <div className="difficulty-selector">
                <button className="difficulty-button button-easy" onClick={() => this.props.onClick(GameDifficulty.EASY)}>
                    <h1>EASY</h1>
                    <span>27 Cards, 3 traits</span>
                </button>
                <button className="difficulty-button button-medium" onClick={() => this.props.onClick(GameDifficulty.MEDIUM)}>
                    <h1>MEDIUM</h1>
                    <span>81 Cards, 4 traits <br />auto-draw</span>
                </button>
                <button className="difficulty-button button-hard" onClick={() => this.props.onClick(GameDifficulty.HARD)}>
                    <h1>HARD</h1>
                    <span>81 Cards, 4 traits</span>
                </button>
            </div>
        );
    }
}

let mapStateToProps = (state, props) => {return {};}; //unused

let mapDispatchToProps = (dispatch, props) => {
    return {
        onClick: (difficulty) => {
            dispatch(SetDifficultyAction(difficulty));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DifficultySelectorComponent);
