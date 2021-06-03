import Game from "../model/Game";

export default function Reducer(state, action) {
    switch(action.type) {
        /**
         * For Drawing cards from the deck at the start of, and during, a game
         */
        case 'DRAW':
            state.drawCards(action.value)
            return state;
        /**
         * When a CardComponent is clicked
         */
        case 'SELECT':
            if(state.getCard(action.value).isSelected) {
                state.unselectCard(action.value);
                return state;
            }
            state.selectCard(action.value);

            if(state.getSelectedCards().length === 3) {
                let selected = state.getSelectedCards();
                state.processMatch(selected[0], selected[1], selected[2]);//TODO: add a timeout here for 500ms so third card highlights briefly
            }
            return state;
        /**
         * For setting the difficulty at the start of a game. Initializes the model for our game
         */
        case 'SET-DIFFICULTY':
            state = new Game(action.value);
            state.drawCards(12)
            return state;
        /**
         * For Restarting the game
         */
        case 'RESTART':
            state = {};
            return state;
            /**
             * For switching between board and how-to-play views
             */
        case 'SWITCH-VIEW':
            state.switchView();
            return {...state};
        default:
            return state;
    }
}