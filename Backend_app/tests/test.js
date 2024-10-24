const assert = require("assert");
const {
  createRule,
  combineRules,
  evaluateRule,
  Node,
} = require("../src/ruleEngine");

// Test createRule
const rule1 = createRule(
  "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
);
assert(rule1 instanceof Node);

// Test combineRules
const combinedRule = combineRules([
  "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)",
  "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)",
]);
assert(combinedRule instanceof Node);

// Test evaluateRule
const data = { age: 35, department: "Sales", salary: 60000, experience: 3 };
const result = evaluateRule(rule1, data);
assert(result === true);

console.log("All tests passed!");
