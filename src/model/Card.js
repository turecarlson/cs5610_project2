class Card {
    constructor(shape, color, number, shading) {
        this.shape      = shape;
        this.color      = color;
        this.number     = number;
        this.shading    = shading;
        this.isSelected = false;
    }
}

module.exports = Card;