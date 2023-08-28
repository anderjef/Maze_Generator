/* exported Point */
class Point { //used to reduce the memory usage of the visited cells stack by only pushing the respective coordinates
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}