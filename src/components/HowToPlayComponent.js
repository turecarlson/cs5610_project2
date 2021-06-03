import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
 

class HowToPlayComponent extends React.Component {
    render() {
        return (
            <div className='how-to-play'>
            <Popup trigger={<button> How to Play</button>} position="right center">
                <div>
                    <p>Welcome to Set!</p>
                    <p>To play: Select 3 cards to attempt to make a set, or draw 3 more cards from the deck.</p>
                    <p>3 cards make a set if each of their attributes EITHER:</p>
                    <ul>
                        <li>match</li>
                        (ex. all 3 cards are green)
                        <br/>
                        OR
                        <br/>
                        <li>are unique </li>
                        (ex. one card has 3 shapes, another has 2, and the last has 1)
                    </ul>
                    <p>Card Attributes</p>
                    <p>
                        On 'Easy' Difficulty:
                    </p>
                    <ul>
                        <li>Color</li>
                        <li>Shape</li>
                        <li># of Shapes</li>
                    </ul>
                    <p>
                        On Medium/Hard Difficulty:
                    </p>
                    <ul>
                        <li>The 3 attributes listed above</li>
                        <li>Fill Color (Colored/White/Grey)</li>
                    </ul>
                </div>
            </Popup>
            </div>
        );
    }
}

export default HowToPlayComponent;