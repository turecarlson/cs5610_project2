import Card from './Card'
import { CARD_SHAPES, CARD_COLORS, CARD_NUMBERS, CARD_SHADINGS } from './CardProperties';
import GameDifficulty from './GameDifficulty';

export default class Game {
    constructor(difficulty = GameDifficulty.HARD) {
        this.difficulty     = difficulty;
        this.cardsDeck      = this.#initializeDeck();
        this.cardsBoard     = [];
        this.cardsMatches   = [];
        this.cardsSelected  = [];
    }

    /**
     * Returns all cards on the board that have been 'selected'.
     * @returns an array of Cards on the board that have been 'selected'
     */
    getSelectedCards = () => {
        return this.cardsBoard.filter(card => card.isSelected);
        // return this.cardsSelected;
    }

    /**
     * Returns a card from the game with a given id. Returns undefined if no such card is found.
     * @param {string} id a unique identifier representing a card
     */
    getCard = (id) => {
        let deckFiltered = this.cardsDeck.filter(card => card.id === id);
        if(deckFiltered.length === 1) {
            return deckFiltered[0];
        }

        let boardFiltered = this.cardsBoard.filter(card => card.id === id);
        if(boardFiltered.length === 1) {
            return boardFiltered[0];
        }

        for(let i = 0; i < this.cardsMatches.length; i++) {
            for(let j = 0; j < this.cardsMatches[i].length; j++) {
                if(this.cardsMatches[i][j].id === id) {
                    return this.cardsMatches[i][j];
                }
            }
        }           
    }

    /**
     * Draws n random cards from the deck, and moves them to the board.
     * @param {number} numCards number of cards to be drawn. Defaults to 3 if no value provided. 
     */
    drawCards = (numCards = 3) => { //Defaults to draw 3 cards
        if(numCards <= 0) {
            throw new Error("numCards must be > 0. Cannot draw a non-positive number of cards.");
        }
        for(let i = 0; i < numCards; i++) {
            if(this.cardsDeck.length !== 0) {
                let randomIndex = this.#randomDeckIndex();
                this.cardsBoard.push(this.cardsDeck[randomIndex]);
                this.cardsDeck.splice(randomIndex, 1);
            }
        }
        if(this.difficulty === GameDifficulty.MEDIUM) {
            if(!this.matchOnBoard()) {//TODO: test
                console.log("medium difficulty draw");
                this.drawCards(1);
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
            card1.isSelected = false;
            card2.isSelected = false;
            card3.isSelected = false;
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
        if(this.difficulty === GameDifficulty.MEDIUM) {
            if(!this.matchOnBoard()) {//TODO: test
                console.log("medium difficulty draw");
                this.drawCards(1);
            }
        }
        return true;
    }

    /**
     * Returns true if there is a 3-card matched set on the board. false otherwise.
     */
    matchOnBoard = () => {
        for(let i = 0; i < this.cardsBoard.length; i++) {
            for(let j = i+1; j < this.cardsBoard.length; j++) {
                for(let k = j+1; k < this.cardsBoard.length; k++) {
                    if(i !== j && j !== k && i !== k) {
                        if(this.#checkMatch(this.cardsBoard[i], this.cardsBoard[j], this.cardsBoard[k])) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    /**
     * 'Selects' the card of the given id in the Game. Throws an error if no card of that id exists in the game.
     * @param {string} id the uuid of the card being selected
     */
    selectCard(id) {
        let card = this.getCard(id);
        if(card === undefined) {
            throw new Error("No card exists with the given id");
        }
        card.isSelected = true;
        // this.cardsSelected.push(card);
    }

    /**
     * 'Un-Selects' the card of the given id in the Game. Throws an error if no card of that id exists in the game.
     * @param {string} id the uuid of the card being un-selected 
     */
    unselectCard(id) {
        let card = this.getCard(id);
        if(card === undefined) {
            throw new Error("No card exists with the given id");
        }
        card.isSelected = false;
        // this.cardsSelected = this.cardsSelected.filter(someCard => someCard !== card);
    }
    
    #checkMatch = (card1, card2, card3) => {
        return this.#checkShape(card1.shape, card2.shape, card3.shape) 
            && this.#checkColor(card1.color, card2.color, card3.color) 
            && this.#checkNumber(card1.number, card2.number, card3.number) 
            && this.#checkShading(card1.shading, card2.shading, card3.shading);
    }
    
    #checkShape = (shape1, shape2, shape3) => {
        return ((shape1 === shape2 && shape2 === shape3) 
            || (shape1 !== shape2 && shape2 !== shape3 && shape1 !== shape3));
    }

    #checkColor = (color1, color2, color3) => {
        return ((color1 === color2 && color2 === color3) 
            || (color1 !== color2 && color2 !== color3 && color1 !== color3));
    }

    #checkNumber = (number1, number2, number3) => {
        return ((number1 === number2 && number2 === number3) 
            || (number1 !== number2 && number2 !== number3 && number1 !== number3));
    }

    #checkShading = (shading1, shading2, shading3) => {
        return ((shading1 === shading2 && shading2 === shading3) 
            || (shading1 !== shading2 && shading2 !== shading3 && shading1 !== shading3));
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
        let deck = [];
        Object.keys(CARD_SHAPES).forEach(shape => {
            Object.keys(CARD_COLORS).forEach(color => {
                Object.keys(CARD_NUMBERS).forEach(number => {
                    deck.push(new Card(shape, color, number, CARD_SHADINGS.SOLID));
            });});
        });
        return deck;
    }
    
    #initializeDeck_MEDIUM = () => {
        let deck = [];
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