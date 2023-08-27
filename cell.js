function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.xpos = x * squareSize;
    this.ypos = y * squareSize;
    this.isWall = [true, true]; //cells only keep track of their top and left walls (respectively)
    this.isVisited = false;
  
    this.getRandomNeighbor = function(hasBeenVisited) {
      const neighbors = [];
      if (hasBeenVisited == undefined) { //get a random neighbor without care for whether they have been visited
        if (this.y != 0) { //top
          neighbors.push(maze[this.y - 1][this.x]);
        }
        if (this.y != numRows - 1) { //bottom
          neighbors.push(maze[this.y + 1][this.x]);
        }
        if (this.x != 0) { //left
          neighbors.push(maze[this.y][this.x - 1]);
        }
        if (this.x != numColumns - 1) { //right
          neighbors.push(maze[this.y][this.x + 1]);
        }
      } else if (hasBeenVisited) { //get a random neighbor that has been visited, returning undefined if one does not exist
        if (this.y != 0 && maze[this.y - 1][this.x].isVisited) { //top
          neighbors.push(maze[this.y - 1][this.x]);
        }
        if (this.y != numRows - 1 && maze[this.y + 1][this.x].isVisited) { //bottom
          neighbors.push(maze[this.y + 1][this.x]);
        }
        if (this.x != 0 && maze[this.y][this.x - 1].isVisited) { //left
          neighbors.push(maze[this.y][this.x - 1]);
        }
        if (this.x != numColumns - 1 && maze[this.y][this.x + 1].isVisited) { //right
          neighbors.push(maze[this.y][this.x + 1]);
        }
      } else { //get a random neighbor that has not been visited, returning undefined if one does not exist
        if (this.y != 0 && !maze[this.y - 1][this.x].isVisited) { //top
          neighbors.push(maze[this.y - 1][this.x]);
        }
        if (this.y != numRows - 1 && !maze[this.y + 1][this.x].isVisited) { //bottom
          neighbors.push(maze[this.y + 1][this.x]);
        }
        if (this.x != 0 && !maze[this.y][this.x - 1].isVisited) { //left
          neighbors.push(maze[this.y][this.x - 1]);
        }
        if (this.x != numColumns - 1 && !maze[this.y][this.x + 1].isVisited) { //right
          neighbors.push(maze[this.y][this.x + 1]);
        }
      }
      return neighbors[int(random(neighbors.length))];
    }
  
    this.show = function() {
      if (this.isWall[0]) {
        line(this.xpos, this.ypos, this.xpos + squareSize, this.ypos); //top
      }
      if (this.isWall[1]) {
        line(this.xpos, this.ypos, this.xpos, this.ypos + squareSize); //left
      }
      if (showProgress && this.isVisited) {
        noStroke();
        fill(63);
        rect(this.xpos, this.ypos, squareSize, squareSize);
        stroke(255);
        noFill();
      }
    }
  
  }