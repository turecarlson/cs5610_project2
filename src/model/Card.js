const { v4: uuid } = require('uuid');

export default class Card {
    constructor(shape, color, number, shading) {
        this.shape      = shape;
        this.color      = color;
        this.number     = number;
        this.shading    = shading;
        this.isSelected = false;
        let id = uuid();
        this.id         = id;
    }
}