class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type; // "operator" or "operand"
    this.left = left; // Reference to another Node
    this.right = right; // Reference to another Node
    this.value = value; // Optional value for operand nodes
  }
}

function createRule(ruleString) {
  const tokens = tokenize(ruleString);
  return parse(tokens);
}

function tokenize(ruleString) {
  return ruleString.match(/(\(|\)|\w+|>|<|=|AND|OR)/g);
}

function parse(tokens) {
  const stack = [];

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "(") {
      continue;
    } else if (tokens[i] === ")") {
      const right = stack.pop();
      const operator = stack.pop();
      const left = stack.pop();
      stack.push(new Node("operator", left, right, operator));
    } else if (tokens[i] === "AND" || tokens[i] === "OR") {
      stack.push(tokens[i]);
    } else {
      if (i + 2 < tokens.length) {
        const node = new Node(
          "operand",
          null,
          null,
          `${tokens[i]} ${tokens[i + 1]} ${tokens[i + 2]}`
        );
        stack.push(node);
        i += 2;
      } else {
        throw new Error("Invalid rule format");
      }
    }
  }

  return stack[0];
}

function combineRules(rules) {
  if (rules.length === 0) {
    return null;
  }

  let combinedRoot = createRule(rules[0]);

  for (let i = 1; i < rules.length; i++) {
    combinedRoot = new Node(
      "operator",
      combinedRoot,
      createRule(rules[i]),
      "AND"
    );
  }

  return combinedRoot;
}

function evaluateRule(ast, data) {
  if (!ast) {
    throw new Error("Invalid AST");
  }

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

  throw new Error("Invalid AST node");
}

module.exports = { createRule, combineRules, evaluateRule, Node };
