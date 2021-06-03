Project 2  // CS5610 Spring 2021

Northeastern University // Seattle Campus

Ture Carlson

## Writeup:

* What were some challenges you faced while making this app?

  * The biggest challenge I faced was familiarizing myself with how and when React/redux re-renders components, and how to force a component to re-render in a scenario that it will not automatically do so. I believe my singular-object approach to the store is likely a factor in some of my frustrations here, as not all of the changes to objects referenced within the 'Game' object, such as changes to a card's properties, force a re-render.
* Given more time, what additional features, functional or design changes would you make?

  * I would have liked to implement a few more views and components, such as a game-timer, a score-counter of sime kind, and the ability to pull up a visual list of all past matches. I also would have fixed the 'back to game' button on the how-to view, since it doesn't seem to be re-rendering the app properly.
  * I believe if I had developed/implemented an effective way to force a re-render of the application every time the reducer performed 'return state', this would streamline many of the issues I was facing. I did not have the chance to test and implement fully, but I believe if I had used 'return {...state}', this likely would have resolved many issues with re-render, since state would be a new object entirely, and should then force a re-render. However, I need to look a bit more into if that new object would still be recognized as the same 'Game' object type.
* What assumptions did you make while working on this assignment?

  * I had initially assumed that I could manage all of my logic and data through redux, however this proved to be an unmanageable approach. Once I moved over to having a custom model object of sorts to interface with, with public methods available for use, this became much more manageable.
* How long did this assignment take to complete?

  * I didn't keep track of time specifically on this attempt, but a few hours a day for about a weeks worth of time, and then a few longer sessions on top of that for some serious digging in, mainly on styling.
