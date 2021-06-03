import React from 'react';
import DrawCardsAction from '../actions/DrawCardsAction'
import { connect } from 'react-redux';
import './css/DrawCardComponent.css'

class DrawCardComponent extends React.Component {

    render() {
        return (
            <div className="draw-card" onClick={() => this.handleClick()}>
                <h1 className="deck-count">
                    {this.props.cardsDeck.length}
                    <br/>
                    {"Draw!"}    
                </h1>
            </div>
        );
    }

    handleClick = () => {
        this.props.onClick();
        this.props.reRenderParent();
        this.forceUpdate();
    }
}

let mapStateToProps = (state, props) => {
    return {
        cardsDeck: state.cardsDeck
    }
}

let mapDispatchToProps = (dispatch, props) => {
    return {
        onClick: () => {
            dispatch(DrawCardsAction());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawCardComponent);
