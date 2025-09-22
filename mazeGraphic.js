/* globals LineSegment, maze, numColumns, numRows, squareSize */
/* exported MazeGraphic */
class MazeGraphic { //note: this representation is not actually proven to be faster, but is only assumed to be
  constructor() {
    this.wallSegments = [];
  }

  show() {
    for (const wallSegment of this.wallSegments) {
      line(wallSegment.x, wallSegment.y, wallSegment.horizontalLength, wallSegment.verticalLength);
    }
  }

  generate() {
    this.wallSegments.push(new LineSegment(0, 0, numColumns * squareSize, 0)); //top
    this.wallSegments.push(new LineSegment(0, 0, 0, numRows * squareSize)); //left
    this.wallSegments.push(new LineSegment(0, numRows * squareSize, numColumns * squareSize, numRows * squareSize)); //bottom
    this.wallSegments.push(new LineSegment(numColumns * squareSize, 0, numColumns * squareSize, numRows * squareSize)); //right

    for (let column = 1; column < numColumns; column++) { //vertical lines
      let lineStart = null;
      let lineEnd = null;
      for (let row = 0; row < numRows; row++) {
        if (maze[row][column].leftWall) {
          if (lineStart === null) {
            lineStart = row;
            lineEnd = lineStart + 1;
          } else {
            lineEnd = row + 1;
          }
        } else {
          if (lineStart !== null) {
            this.wallSegments.push(new LineSegment(column * squareSize, lineStart * squareSize, column * squareSize, lineEnd * squareSize));
            lineStart = null;
            lineEnd = null;
          }
        }
      }
      if (lineStart !== null) {
        this.wallSegments.push(new LineSegment(column * squareSize, lineStart * squareSize, column * squareSize, lineEnd * squareSize));
        lineStart = null;
        lineEnd = null;
      }
    }

    for (let row = 1; row < numRows; row++) { //horizontal lines
      let lineStart = null;
      let lineEnd = null;
      for (let column = 0; column < numColumns; column++) {
        if (maze[row][column].topWall) {
          if (lineStart === null) {
            lineStart = column;
            lineEnd = lineStart + 1;
          } else {
            lineEnd = column + 1;
          }
        } else {
          if (lineStart !== null) {
            this.wallSegments.push(new LineSegment(lineStart * squareSize, row * squareSize, lineEnd * squareSize, row * squareSize));
            lineStart = null;
            lineEnd = null;
          }
        }
      }
      if (lineStart !== null) {
        this.wallSegments.push(new LineSegment(lineStart * squareSize, row * squareSize, lineEnd * squareSize, row * squareSize));
        lineStart = null;
        lineEnd = null;
      }
    }
  }
}