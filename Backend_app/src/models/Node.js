class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type; // "operator" or "operand"
    this.left = left; // Reference to another Node
    this.right = right; // Reference to another Node
    this.value = value; // Optional value for operand nodes
  }
}   

module.exports = Node;
