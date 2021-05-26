const { expect } = require('chai');
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
            expect(testCard.shape).to.equal(CARD_SHAPES.SHAPE_1);
        });

        it("should properly set card color", () => {
            expect(testCard.color).to.equal(CARD_COLORS.BLUE);
        });
        
        it("should properly set card number", () => {
            expect(testCard.number).to.equal(CARD_NUMBERS.ONE);
        });

        it("should properly set card shading", () => {
            expect(testCard.shading).to.equal(CARD_SHADINGS.STRIPED);
        });
    });
});
