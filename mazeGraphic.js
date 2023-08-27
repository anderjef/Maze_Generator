function MazeGraphic() { //note: this representation is not actually proven to be faster, but is only assumed to be
    this.wallSegments = [];
  
    this.show = function() {
      for (let i = 0; i < this.wallSegments.length; ++i) {
        line(this.wallSegments[i].x, this.wallSegments[i].y, this.wallSegments[i].horizontalLength, this.wallSegments[i].verticalLength);
      }
    }
  
    this.generate = function() {
      this.wallSegments.push(new LineSegment(0, 0, numColumns * squareSize, 0)); //top border
      this.wallSegments.push(new LineSegment(0, 0, 0, numRows * squareSize)); //left border
      this.wallSegments.push(new LineSegment(0, numRows * squareSize, numColumns * squareSize, numRows * squareSize)); //bottom border
      this.wallSegments.push(new LineSegment(numColumns * squareSize, 0, numColumns * squareSize, numRows * squareSize)); //right border
      for (let column = 1; column < numColumns; ++column) { //vertical lines
        let lineStart = undefined;
        let lineEnd = undefined;
        for (let row = 0; row < numRows; ++row) {
          if (maze[row][column].isWall[1]) {
            if (lineStart == undefined) {
              lineStart = row;
              lineEnd = lineStart + 1;
            } else {
              lineEnd = row + 1;
            }
          } else {
            if (lineStart != undefined) {
              this.wallSegments.push(new LineSegment(column * squareSize, lineStart * squareSize, column * squareSize, lineEnd * squareSize));
              lineStart = undefined;
              lineEnd = undefined;
            }
          }
        }
        if (lineStart != undefined) {
          this.wallSegments.push(new LineSegment(column * squareSize, lineStart * squareSize, column * squareSize, lineEnd * squareSize));
          lineStart = undefined;
          lineEnd = undefined;
        }
      }
  
      for (let row = 1; row < numRows; ++row) { //horizontal lines
        let lineStart = undefined;
        let lineEnd = undefined;
        for (let column = 0; column < numColumns; ++column) {
          if (maze[row][column].isWall[0]) {
            if (lineStart == undefined) {
              lineStart = column;
              lineEnd = lineStart + 1;
            } else {
              lineEnd = column + 1;
            }
          } else {
            if (lineStart != undefined) {
              this.wallSegments.push(new LineSegment(lineStart * squareSize, row * squareSize, lineEnd * squareSize, row * squareSize));
              lineStart = undefined;
              lineEnd = undefined;
            }
          }
        }
        if (lineStart != undefined) {
          this.wallSegments.push(new LineSegment(lineStart * squareSize, row * squareSize, lineEnd * squareSize, row * squareSize));
          lineStart = undefined;
          lineEnd = undefined;
        }
      }
    }
  }