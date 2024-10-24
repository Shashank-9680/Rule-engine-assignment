class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type; // "operator" or "operand"
    this.left = left; // Reference to another Node
    this.right = right; // Reference to another Node
    this.value = value; // Optional value for operand nodes
  }
}

function createRule(ruleString) {
  const tokens = ruleString.match(/\(|\)|\w+|>|<|=|AND|OR/g);
  const stack = [];

  tokens.forEach((token) => {
    if (token === "(" || token === "AND" || token === "OR") {
      stack.push(token);
    } else if (token === ")") {
      const right = stack.pop();
      const operator = stack.pop();
      const left = stack.pop();
      stack.pop(); // Remove '('
      stack.push(new Node("operator", left, right, operator));
    } else {
      stack.push(new Node("operand", null, null, token));
    }
  });

  return stack[0];
}

module.exports = { createRule, Node };
