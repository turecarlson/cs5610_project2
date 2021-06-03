import React from 'react';
import { connect } from 'react-redux';
import SelectCardAction from '../actions/SelectCardAction';
import { CARD_SHAPES, CARD_NUMBERS, CARD_SHADINGS } from '../model/CardProperties';
import './css/CardComponent.css';

class CardComponent extends React.Component {
    render() {
        let image = this.#renderImage();
        return (
            <div className={this.className()} onClick={() => this.handleClick()}>
                <svg width='100%' height='100%'>
                    {image}
                </svg>
            </div>
        );
    }

    handleClick = () => {
        this.props.onClick(this.props.id);
        this.props.reRenderParent();
        this.forceUpdate();
    }

    className = () => {
        if(this.props.isSelected) {
            return "card card-selected"
        }
        return "card card-normal"
    }

    /**
     * Generates the svg to be used as the card's image
     * @returns 
     */
    #renderImage = () => {
        let image = [];
        let key = 0;
        this.number = CARD_NUMBERS[this.props.number];
        this.color = this.props.color;
        switch (this.props.shading) {
            case CARD_SHADINGS.OUTLINE:
                this.fill = 'white'
                break;
            case CARD_SHADINGS.SOLID:
                this.fill = this.color;
                break;
            case CARD_SHADINGS.STRIPED:
                this.fill = "grey" //TODO: figure out pattern integration for stripe/polka dots
                break;
            default:
                break;
        }
        for(let i = 0; i < this.number; i++) {
            let xy = (100/(this.number+1) * (i+1));
            let r = 50/(this.number+1);
            let wh = 75/(this.number+1);
            switch (this.props.shape) {
                case CARD_SHAPES.SHAPE_1:
                    image.push(
                    <circle 
                        key={key++}
                        cx={xy + '%'} cy={xy + '%'} r={r + '%'} 
                        stroke={this.color} 
                        strokeWidth='4' 
                        fill={this.fill} />);
                    break;
                case CARD_SHAPES.SHAPE_2:
                    image.push(
                    <rect
                    key={key++}
                        x={xy + '%'} y={xy + '%'} width={wh + '%'} height={wh + '%'}
                        stroke={this.color} 
                        strokeWidth='4' 
                        fill={this.fill} />);
                    break;
                case CARD_SHAPES.SHAPE_3:
                    image.push(
                    <ellipse 
                        key={key++}
                        cx={xy + '%'} cy={xy + '%'} rx={r + '%'} ry={.5*r+'%'}
                        stroke={this.props.color} 
                        strokeWidth='4' 
                        fill={this.fill} />);
                    break;
                default:
                    break;
            }
        }
        return image;

    }
}

let mapStateToProps = (state, props) => {return {};};

let mapDispatchToProps = (dispatch, props) => {
    return {
        onClick: (id) => {
            dispatch(SelectCardAction(id));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardComponent);
