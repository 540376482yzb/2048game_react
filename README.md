### 2048 recreated in React
 2048 is a single-player sliding block puzzle game by Italian web developer Gabriele Cirulli. Every turn, a new tile will randomly appear in an empty spot on the board with a value of either 2 or 4.[5] Tiles slide as far as possible in the chosen direction until they are stopped by either another tile or the edge of the grid. If two tiles of the same number collide while moving, they will merge into a tile with the total value of the two tiles that collided
 
 [Live Demo](https://objective-fermat-0343a3.netlify.com/)
 
 ### Why did I create this project?
  2048 was my favorite game at a time, I enjoyed it so much that I have dreamed about writing my own version of the game implementation one day.
  After learning React.js for a while I am totally bought in to the idea of components based web development and making apps that is totally state driven. I know react is the right tool for making 2048, because the game itself is heavily state driven.
  
 ### What did I learn from this project?
  The process of making 2048 game involes many problem solvings and creative thinking.
  Conceptualize omni directions matrix is difficult when I only have access to 2-d arrays. I was able to solve the problem by flipping and transpose my array before I applied the changes. By doing this I only need to develope one set operation for sliding in all direction to work.
  I have struggle with a bug causes the state mutation before the changes was updated to the state, I went out my way to find out that using `ES6` Spread Operator`[...]` on nested array is still performing shallow-copy instead of deep-copy (which I totally assumed without a doubt)
 ### Screen Shots
 ![Imgur](https://i.imgur.com/NC96pqQ.png)
