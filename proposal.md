## Tetris

### Background

"Tetriminos" are game pieces shaped like tetrominoes, geometric shapes composed of four square blocks each. A random sequence of Tetriminos fall down the playing field (a rectangular vertical shaft, called the "well" or "matrix"). The objective of the game is to manipulate these Tetriminos, by moving each one sideways (if the player feels the need) and rotating it by 90 degree units, with the aim of creating a horizontal line of ten units without gaps. When such a line is created, it disappears, and any block above the deleted line will fall. When a certain number of lines are cleared, the game enters a new level. As the game progresses, each level causes the Tetriminos to fall faster, and the game ends when the stack of Tetriminos reaches the top of the playing field and no new Tetriminos are able to enter. Some games also end after a finite number of levels or lines.

### Functionality & MVP  

When playing Tetris, users will be able to:

- [ ] Start and reset the game board
- [ ] players can use arrow keys and space bar to flip pieces 90 degrees
- [ ] score will be kept.
- [ ] leveling up will increase the speed of the pieces falling.

In addition, this project will include:

- [ ] A production Readme

### Wireframes

This app will consist of a single screen with game grid, game controls, and nav links to the Github and my LinkedIn.  Game controls will include Start, Stop, and Reset buttons as well as a picture of what keys to use for game play. On the left will be an array of the pieces that are coming up next. On the right there will be the picture of what keys to use along with the buttons to start, pause, and reset.

![wireframes](https://github.com/forestturner/tetris/blob/master/tetris_wireframe.png)

### Architecture and Technologies

**NB**: one of the main things you should be researching and deciding upon while you write this proposal is what technologies you plan to use.  Identify and create a plan of attack for the major technical challenges in your project.  It's okay if you don't have all the details of implementation fleshed out, but you should have a solid roadmap by Monday morning.

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`grid.js`: this script will handle the logic for creating and updating the necessary `pieces.js` elements and rendering them to the DOM.

`logic.js`: this script will handle the logic of losing the game, leveling up and generating the next pieces. As the levels increase so will the speed of the falling pieces. Scoring will be calculated from line clears, combos, tetris, and t-spins.  

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `grid` object to connect to the `tetris` pieces.  Then, use `grid.js` to create and render at least the rectangle  grid, ideally with small boxes for the upcoming pieces.  Build :

- Complete the `grid.js` module (constructor)
- Render a rectangle grid to the `Canvas` using `Easel.js`
- Make squares to hold upcoming pieces.
- create the pieces visually.

**Day 3**: Setup game logic. How fast the pieces will fall depending on the level. When will the levels increase. Scoring with combos, tetrises, and t-spins.   Incorporate the game logic into the `grid.js` rendering.  Goals for the day:

- Create logic.js file.
- Have a functional grid on the `Canvas` frontend that correctly handles iterations of pieces dropping.


**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for  start and reset and game controls.
- Have a styled `Canvas`, nice looking controls and title
- Bonus - leveling up animations.


### Bonus features

There are many directions this tetris could eventually go.  Some anticipated updates are:

- [ ] Add another game type where the game is circular.
- [ ] Add multiple skins for pieces.
- [ ] Add cool leveling up and combo animations.
