class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type; // "operator" or "operand"
    this.left = left; // Reference to another Node
    this.right = right; // Reference to another Node
    this.value = value; // Optional value for operand nodes
  }
}

function combineRules(rules) {
  const combinedRoot = new Node("operator", null, null, "AND");
  combinedRoot.left = createRule(rules[0]);
  combinedRoot.right = createRule(rules[1]);

  for (let i = 2; i < rules.length; i++) {
    const newRoot = new Node(
      "operator",
      combinedRoot,
      createRule(rules[i]),
      "AND"
    );
    combinedRoot = newRoot;
  }

  return combinedRoot;
}

module.exports = { combineRules, Node };
