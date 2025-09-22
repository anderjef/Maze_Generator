/* globals maze, numColumns, numRows, showProgress, squareSize, Point */
/* exported Cell */
class Cell {
  constructor(x, y) {
    this.point = new Point(x, y);
    this.xpos = x * squareSize;
    this.ypos = y * squareSize;
    this.topWall = true; //cells only keep track of their top and left walls
    this.leftWall = true; //cells only keep track of their top and left walls
    this.visited = false;
  }

  getRandomNeighbor(visited) {
    const neighbors = [];
    switch (visited) {
      case null: //get a random neighbor without care for whether they have been visited
        if (this.point.y !== 0) { //top
          neighbors.push(maze[this.point.y - 1][this.point.x]);
        }
        if (this.point.y !== numRows - 1) { //bottom
          neighbors.push(maze[this.point.y + 1][this.point.x]);
        }
        if (this.point.x !== 0) { //left
          neighbors.push(maze[this.point.y][this.point.x - 1]);
        }
        if (this.point.x !== numColumns - 1) { //right
          neighbors.push(maze[this.point.y][this.point.x + 1]);
        }
        break;
      case false: //get a random neighbor that has not been visited, returning undefined if one does not exist
        if (this.point.y !== 0 && !maze[this.point.y - 1][this.point.x].visited) { //top
          neighbors.push(maze[this.point.y - 1][this.point.x]);
        }
        if (this.point.y !== numRows - 1 && !maze[this.point.y + 1][this.point.x].visited) { //bottom
          neighbors.push(maze[this.point.y + 1][this.point.x]);
        }
        if (this.point.x !== 0 && !maze[this.point.y][this.point.x - 1].visited) { //left
          neighbors.push(maze[this.point.y][this.point.x - 1]);
        }
        if (this.point.x !== numColumns - 1 && !maze[this.point.y][this.point.x + 1].visited) { //right
          neighbors.push(maze[this.point.y][this.point.x + 1]);
        }
        break;
      case true: //get a random neighbor that has been visited, returning undefined if one does not exist
        if (this.point.y !== 0 && maze[this.point.y - 1][this.point.x].visited) { //top
          neighbors.push(maze[this.point.y - 1][this.point.x]);
        }
        if (this.point.y !== numRows - 1 && maze[this.point.y + 1][this.point.x].visited) { //bottom
          neighbors.push(maze[this.point.y + 1][this.point.x]);
        }
        if (this.point.x !== 0 && maze[this.point.y][this.point.x - 1].visited) { //left
          neighbors.push(maze[this.point.y][this.point.x - 1]);
        }
        if (this.point.x !== numColumns - 1 && maze[this.point.y][this.point.x + 1].visited) { //right
          neighbors.push(maze[this.point.y][this.point.x + 1]);
        }
        break;
    }
    return neighbors[int(random(neighbors.length))];
  }

  show() {
    if (this.topWall) {
      line(this.xpos, this.ypos, this.xpos + squareSize, this.ypos); //top
    }
    if (this.leftWall) {
      line(this.xpos, this.ypos, this.xpos, this.ypos + squareSize); //left
    }
    if (showProgress && this.visited) {
      noStroke();
      fill(63);
      rect(this.xpos, this.ypos, squareSize, squareSize);
      stroke(255);
      noFill();
    }
  }
}