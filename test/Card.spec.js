const chai = require('chai');
const Card = require('../src/model/Card');
const { CARD_COLORS, CARD_NUMBERS, CARD_SHADINGS, CARD_SHAPES } = require('../src/model/CardProperties');

describe("Card.js", () => {
    describe("Constructor Tests", () => {
        let testCard;
        before(() => {
            testCard = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.STRIPED);
        })

        it("should properly set card shape", () => {
            chai.assert(testCard.shape === CARD_SHAPES.SHAPE_1);
        });

        it("should properly set card color", () => {
            chai.assert(testCard.color === CARD_COLORS.BLUE);
        });
        
        it("should properly set card number", () => {
            chai.assert(testCard.number === CARD_NUMBERS.ONE);
        });

        it("should properly set card shading", () => {
            chai.assert(testCard.shading === CARD_SHADINGS.STRIPED);
        });
    });
});
