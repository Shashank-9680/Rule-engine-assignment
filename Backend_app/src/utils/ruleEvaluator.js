class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type; // "operator" or "operand"
    this.left = left; // Reference to another Node
    this.right = right; // Reference to another Node
    this.value = value; // Optional value for operand nodes
  }
}
function evaluateRule(ast, data) {
  if (ast.type === "operand") {
    const [key, operator, value] = ast.value.split(" ");
    switch (operator) {
      case ">":
        return data[key] > parseFloat(value);
      case "<":
        return data[key] < parseFloat(value);
      case "=":
        return data[key] === value;
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  } else if (ast.type === "operator") {
    const leftResult = evaluateRule(ast.left, data);
    const rightResult = evaluateRule(ast.right, data);
    switch (ast.value) {
      case "AND":
        return leftResult && rightResult;
      case "OR":
        return leftResult || rightResult;
      default:
        throw new Error(`Unknown operator: ${ast.value}`);
    }
  }
}
module.exports = { Node, evaluateRule };
