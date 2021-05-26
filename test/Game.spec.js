const chai = require('chai');
const Game = require('../src/model/Game');
const { CARD_COLORS, CARD_NUMBERS, CARD_SHADINGS, CARD_SHAPES } = require('../src/model/CardProperties');
const { assert, expect } = require('chai');
const GameDifficulty = require('../src/model/GameDifficulty');
const Card = require('../src/model/Card');

describe("Game.js", () => {
    describe("Constructor Tests", () => {
        describe("No difficulty given (hard)", () => {
            let testGame = new Game();
            
            it("difficulty should be 'hard'", () => {
                assert(testGame.difficulty === GameDifficulty.HARD)
            });

            it("deck should contain 69 cards", () => {
                 assert(testGame.cardsDeck.length == 69);
            });

            it("board should contain 12 cards", () => {
                assert(testGame.cardsBoard.length == 12);
            });

            it("matches should be empty", () => {
                assert(testGame.cardsMatches.length == 0);
            });
        });

        describe("Easy", () => {
            let testGame = new Game(GameDifficulty.EASY);
            
            it("difficulty should be 'easy'", () => {
                assert(testGame.difficulty === GameDifficulty.EASY)
            });

            it("deck should contain 15 cards", () => {
                 assert(testGame.cardsDeck.length == 15);
            });

            it("board should contain 12 cards", () => {
                assert(testGame.cardsBoard.length == 12);
            });

            it("matches should be empty", () => {
                assert(testGame.cardsMatches.length == 0);
            });
        });

        describe("Medium", () => {
            let testGame = new Game(GameDifficulty.MEDIUM);
            
            it("difficulty should be 'medium'", () => {
                assert(testGame.difficulty === GameDifficulty.MEDIUM)
            });

            it("deck should contain 69 cards", () => {
                 assert(testGame.cardsDeck.length == 69);
            });

            it("board should contain 12 cards", () => {
                assert(testGame.cardsBoard.length == 12);
            });

            it("matches should be empty", () => {
                assert(testGame.cardsMatches.length == 0);
            });
        });

        describe("Hard", () => {
            let testGame = new Game(GameDifficulty.HARD);
            
            it("difficulty should be 'hard'", () => {
                assert(testGame.difficulty === GameDifficulty.HARD)
            });

            it("deck should contain 69 cards", () => {
                 assert(testGame.cardsDeck.length == 69);
            });

            it("board should contain 12 cards", () => {
                assert(testGame.cardsBoard.length == 12);
            });

            it("matches should be empty", () => {
                assert(testGame.cardsMatches.length == 0);
            });
        });
    });

    describe("drawCards()", () => {
        let testGame;
        beforeEach(() => {
            testGame = new Game();
        });

        it("no given parameter should defualt to drawing 3 cards.", () => {
            assert(testGame.cardsDeck.length == 69);
            assert(testGame.cardsBoard.length == 12);
            testGame.drawCards();
            assert(testGame.cardsDeck.length == 66);
            assert(testGame.cardsBoard.length == 15);
        }); 

        it("should draw number of cards based on given parameter.", () => {
            assert(testGame.cardsDeck.length == 69);
            assert(testGame.cardsBoard.length == 12);
            testGame.drawCards(10);
            assert(testGame.cardsDeck.length == 59);
            assert(testGame.cardsBoard.length == 22);
        });

        it("should throw error if 0 is given as parameter.", () => {
            assert(testGame.cardsDeck.length == 69);
            assert(testGame.cardsBoard.length == 12);
            let funcCall = () => testGame.drawCards(0);
            expect(funcCall).to.throw("numCards must be > 0. Cannot draw a non-positive number of cards.");
        });

        it("should throw error if negative value is given as parameter.", () => {
            assert(testGame.cardsDeck.length == 69);
            assert(testGame.cardsBoard.length == 12);
            let funcCall = () => testGame.drawCards(-5);
            expect(funcCall).to.throw("numCards must be > 0. Cannot draw a non-positive number of cards.");
        });

        it("should not attempt to draw more cards than are in the deck.", () => {
            assert(testGame.cardsDeck.length == 69);
            assert(testGame.cardsBoard.length == 12);
            testGame.drawCards(70);
            assert(testGame.cardsDeck.length == 0);
            assert(testGame.cardsBoard.length == 81);
        });
    });

    describe("processMatch()", () => {
        it("should throw an error when card 1 is not on the board", () => {
            let card1 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card2 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card3 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let deck = [card1];
            let board = [card2, card3];
            let game = new Game();
            game.cardsDeck = deck;
            game.cardsBoard = board;

            let funCall = () => game.processMatch(card1, card2, card3);
            expect(funCall).to.throw("matched cards must be on the board");
        });

        it("should throw an error when card 2 is not on the board", () => {
            let card1 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card2 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card3 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let deck = [card2];
            let board = [card1, card3];
            let game = new Game();
            game.cardsDeck = deck;
            game.cardsBoard = board;

            let funCall = () => game.processMatch(card1, card2, card3);
            expect(funCall).to.throw("matched cards must be on the board");
        });

        it("should throw an error when card 3 is not on the board", () => {
            let card1 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card2 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card3 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let deck = [card3];
            let board = [card1, card2];
            let game = new Game();
            game.cardsDeck = deck;
            game.cardsBoard = board;

            let funCall = () => game.processMatch(card1, card2, card3);
            expect(funCall).to.throw("matched cards must be on the board");
        });

        it("should return true if all card properties are identical.", () => {
            let card1 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card2 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card3 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let board = [card1, card2, card3];
            let game = new Game();
            game.cardsBoard = board;

            expect(game.processMatch(card1, card2, card3)).to.be.true;
        });

        it("should return true if shape is unique among the 3 cards", () => {
            let card1 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card2 = new Card(CARD_SHAPES.SHAPE_2, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card3 = new Card(CARD_SHAPES.SHAPE_3, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let board = [card1, card2, card3];
            let game = new Game();
            game.cardsBoard = board;

            expect(game.processMatch(card1, card2, card3)).to.be.true;
        });

        it("should return true if color is unique among the 3 cards", () => {
            let card1 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card2 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.GREEN, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card3 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.RED, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let board = [card1, card2, card3];
            let game = new Game();
            game.cardsBoard = board;

            expect(game.processMatch(card1, card2, card3)).to.be.true;
        });

        it("should return true if number is unique among the 3 cards", () => {
            let card1 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card2 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.TWO, CARD_SHADINGS.SOLID);
            let card3 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.THREE, CARD_SHADINGS.SOLID);
            let board = [card1, card2, card3];
            let game = new Game();
            game.cardsBoard = board;

            expect(game.processMatch(card1, card2, card3)).to.be.true;
        });

        it("should return true if shading is unique among the 3 cards", () => {
            let card1 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card2 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.STRIPED);
            let card3 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.OUTLINE);
            let board = [card1, card2, card3];
            let game = new Game();
            game.cardsBoard = board;

            expect(game.processMatch(card1, card2, card3)).to.be.true;
        });

        it("should return false if two cards share shape value", () => {
            let card1 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card2 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card3 = new Card(CARD_SHAPES.SHAPE_3, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let board = [card1, card2, card3];
            let game = new Game();
            game.cardsBoard = board;

            expect(game.processMatch(card1, card2, card3)).to.be.false;
        });

        it("should return false if two cards share color value", () => {
            let card1 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card2 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card3 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.RED, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let board = [card1, card2, card3];
            let game = new Game();
            game.cardsBoard = board;

            expect(game.processMatch(card1, card2, card3)).to.be.false;
        });

        it("should return false if two cards share number value", () => {
            let card1 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card2 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card3 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.THREE, CARD_SHADINGS.SOLID);
            let board = [card1, card2, card3];
            let game = new Game();
            game.cardsBoard = board;

            expect(game.processMatch(card1, card2, card3)).to.be.false;
        });

        it("should return false if two cards share shading value", () => {
            let card1 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card2 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card3 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.OUTLINE);
            let board = [card1, card2, card3];
            let game = new Game();
            game.cardsBoard = board;

            expect(game.processMatch(card1, card2, card3)).to.be.false;
        });
    });

    describe("matchOnBoard()", () => {
       it("returns true if there is a potential match on the board", () => {
            let card1 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card2 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card3 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card4 = new Card(CARD_SHAPES.SHAPE_2, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let board = [card4, card1, card2, card3];
            let game = new Game();
            game.cardsBoard = board;

            expect(game.matchOnBoard()).to.be.true;
        });
        
        it("returns false if there is no potential match on the board", () => {
            let card1 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card2 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.BLUE, CARD_NUMBERS.ONE, CARD_SHADINGS.SOLID);
            let card3 = new Card(CARD_SHAPES.SHAPE_1, CARD_COLORS.RED, CARD_NUMBERS.TWO, CARD_SHADINGS.SOLID);
            let card4 = new Card(CARD_SHAPES.SHAPE_2, CARD_COLORS.RED, CARD_NUMBERS.TWO, CARD_SHADINGS.SOLID);
            let board = [card4, card1, card2, card3];
            let game = new Game();
            game.cardsBoard = board;

            expect(game.matchOnBoard()).to.be.false;
        });
    });
});