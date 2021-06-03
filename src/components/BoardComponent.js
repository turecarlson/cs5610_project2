import React from "react";
import { connect } from 'react-redux';
import CardComponent from "./CardComponent";
import DrawCardComponent from './DrawCardComponent';
import './css/BoardComponent.css'

class BoardComponent extends React.Component {

    constructor(props) {
        super(props);
        this.reRender = this.reRender.bind(this);
    }

    reRender() {
        this.forceUpdate();
    }

    render() {
        let renderedCards = this.#renderCards();
        return(
            <div className="board">
                <DrawCardComponent reRenderParent={this.reRender}/>
                {renderedCards}
            </div>
        )
    }

    #renderCards = () => {
        let key = 0;
        let renderedCards = this.props.cardsBoard.map((card) => 
            <CardComponent id={card.id} 
                            shape={card.shape} 
                            color={card.color} 
                            number={card.number} 
                            shading={card.shading}
                            isSelected={card.isSelected}
                            reRenderParent={this.reRender}
                            key={key++} />);
        return renderedCards;
    }
}

let mapStateToProps = (state, props) => {
    return {
        cardsBoard: state.cardsBoard
    }
}

let mapDispatchToProps = (dispatch, props) => {return {};}; //unused

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardComponent);