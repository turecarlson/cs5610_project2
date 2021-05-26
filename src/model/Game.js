const Card = require("./Card");
const { CARD_SHAPES, CARD_COLORS, CARD_NUMBERS, CARD_SHADINGS } = require('./CardProperties');
const GameDifficulty = require("./GameDifficulty");

class Game {
    constructor(difficulty = GameDifficulty.HARD) {
        this.difficulty     = difficulty;
        this.cardsDeck      = this.#initializeDeck();
        this.cardsBoard     = [];
        this.cardsMatches   = [];
        this.drawCards(12);
    }

    drawCards = (numCards = 3) => { //Defaults to draw 3 cards
        if(numCards <= 0) {
            throw new Error("numCards must be > 0. Cannot draw a non-positive number of cards.");
        }
        for(let i = 0; i < numCards; i++) {
            if(this.cardsDeck.length != 0) {
                let randomIndex = this.#randomDeckIndex();
                this.cardsBoard.push(this.cardsDeck[randomIndex]);
                this.cardsDeck.splice(randomIndex, 1);
            }
        }
    }

    
    /**
     * Attempts to process a 'match' made from 3 cards. Returns true if successful, false if not a matched set.
     * @param {Card} card1 
     * @param {Card} card2 
     * @param {Card} card3 
     * @returns true if successful, false if not a matched set.
     */
    processMatch = (card1, card2, card3) => {
        //confirm match with checkMatch
        if(!this.#checkMatch(card1, card2, card3)) {
            return false;
        };
        //make sure all cards are on board
        if( !this.cardsBoard.includes(card1) || 
            !this.cardsBoard.includes(card2) || 
            !this.cardsBoard.includes(card3)) {
            throw new Error("matched cards must be on the board.");
        }
        //add sub-array of 3 cards to this.cardsMatches
        this.cardsMatches.push([card1, card2, card3]);
        //remove cards from board
        this.cardsBoard.splice(this.cardsBoard.indexOf(card1), 1);
        this.cardsBoard.splice(this.cardsBoard.indexOf(card2), 1);
        this.cardsBoard.splice(this.cardsBoard.indexOf(card3), 1);
        return true;
    }
    
    #checkMatch = (card1, card2, card3) => {
        return this.#checkShape(card1.shape, card2.shape, card3.shape) 
            && this.#checkColor(card1.color, card2.color, card3.color) 
            && this.#checkNumber(card1.number, card2.number, card3.number) 
            && this.#checkShading(card1.shading, card2.shading, card3.shading);
    }
    
    #checkShape = (shape1, shape2, shape3) => {
        return ((shape1 == shape2 && shape2 == shape3) 
            || (shape1 != shape2 && shape2 != shape3 && shape1 != shape3));
    }

    #checkColor = (color1, color2, color3) => {
        return ((color1 == color2 && color2 == color3) 
            || (color1 != color2 && color2 != color3 && color1 != color3));
    }

    #checkNumber = (number1, number2, number3) => {
        return ((number1 == number2 && number2 == number3) 
            || (number1 != number2 && number2 != number3 && number1 != number3));
    }

    #checkShading = (shading1, shading2, shading3) => {
        return ((shading1 == shading2 && shading2 == shading3) 
            || (shading1 != shading2 && shading2 != shading3 && shading1 != shading3));
    }

    #initializeDeck = () => {
        switch (this.difficulty) {
            case 'easy':
                return this.#initializeDeck_EASY();
            case 'medium':
                return this.#initializeDeck_MEDIUM();
            case 'hard':
                return this.#initializeDeck_HARD();
            default:
                throw new Error("Difficulty not properly set.");
            }
    }
                    
    #initializeDeck_EASY = () => {
        let deck = new Array();
        Object.keys(CARD_SHAPES).forEach(shape => {
            Object.keys(CARD_COLORS).forEach(color => {
                Object.keys(CARD_NUMBERS).forEach(number => {
                    deck.push(new Card(shape, color, number, CARD_SHADINGS.SOLID));
            });});
        });
        return deck;
    }
    
    #initializeDeck_MEDIUM = () => {
        let deck = new Array();
        Object.keys(CARD_SHAPES).forEach(shape => {
            Object.keys(CARD_COLORS).forEach(color => {
                Object.keys(CARD_NUMBERS).forEach(number => {
                    Object.keys(CARD_SHADINGS).forEach(shading => {
                        deck.push(new Card(shape, color, number, shading));
            });});});
        });
        return deck;
    }
    
    #initializeDeck_HARD = () => {
        return this.#initializeDeck_MEDIUM();
    }

    #randomDeckIndex = () => {
        return Math.floor(Math.random() * this.cardsDeck.length);
    }
}

module.exports = Game;