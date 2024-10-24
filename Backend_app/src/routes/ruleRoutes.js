const express = require("express");
const router = express.Router();
const Rule = require("../models/Rule"); // Ensure the correct path to Rule.js
const { createRule, combineRules, evaluateRule } = require("../ruleEngine"); // Adjust the path as necessary

router.post("/create", async (req, res) => {
  const { ruleString } = req.body;
  const ast = createRule(ruleString);
  const rule = new Rule({ ruleString, ast });
  await rule.save();
  res.send("Rule created successfully");
});

router.post("/combine", async (req, res) => {
  try {
    const { ruleStrings } = req.body;
    const combinedAst = combineRules(ruleStrings);
    res.json(combinedAst);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/getRules", async (req, res) => {
  // get all the rules here and send them to the frontend
  const rules = await Rule.find();
  res.json(rules);
});
router.post("/evaluate", async (req, res) => {
  try {
    const { ast, data } = req.body;
    const result = evaluateRule(ast, data);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/testing", async (req, res) => {
  res.send("Testing route");
});
module.exports = router;
