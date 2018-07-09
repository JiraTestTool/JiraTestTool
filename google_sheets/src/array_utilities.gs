/**
 * I just realized that this lets you insert undefined via the following:
 *   someArray.insert(1) // notice the second param is undefined
 * TODO: make sure this function is safer
 */
Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

/**
 * var array = [2, 5, 9];
 * var index = array.indexOf(5);
 * array.splice(index, 1);
 * // array = [2, 9]
 */
Array.prototype.remove = function ( index ) {
  if (index > -1) {
    this.splice(index, 1);
    return true;
  }
  else { return false; }
};
