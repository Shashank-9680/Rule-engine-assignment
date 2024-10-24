import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RuleEngineUI = () => {
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState("");
  const [combinedAST, setCombinedAST] = useState(null);
  const [testData, setTestData] = useState("");
  const [evaluationResult, setEvaluationResult] = useState(null);

  const addRule = () => {
    if (newRule) {
      setRules([...rules, newRule]);
      setNewRule("");
    }
  };

  const combineRules = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/rules/combine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ruleStrings: rules }),
      });
      const ast = await response.json();
      setCombinedAST(ast);
    } catch (error) {
      console.error("Error combining rules:", error);
    }
  };

  const evaluateRules = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/rules/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ast: combinedAST, data: JSON.parse(testData) }),
      });
      const result = await response.json();
      setEvaluationResult(result.result);
    } catch (error) {
      console.error("Error evaluating rules:", error);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rule Engine UI</h1>

      <Card className="mb-4">
        <CardHeader>
          <h2 className="text-xl font-semibold">Add Rules</h2>
        </CardHeader>
        <CardContent>
          <Input
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            placeholder="Enter a rule (e.g., age > 30 AND department = Sales)"
            className="mb-2"
          />
          <Button onClick={addRule}>Add Rule</Button>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <h2 className="text-xl font-semibold">Current Rules</h2>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button onClick={combineRules}>Combine Rules</Button>
        </CardFooter>
      </Card>

      {combinedAST && (
        <Card className="mb-4">
          <CardHeader>
            <h2 className="text-xl font-semibold">Combined AST</h2>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify(combinedAST, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

      <Card className="mb-4">
        <CardHeader>
          <h2 className="text-xl font-semibold">Evaluate Rules</h2>
        </CardHeader>
        <CardContent>
          <textarea
            value={testData}
            onChange={(e) => setTestData(e.target.value)}
            placeholder='Enter test data as JSON (e.g., {"age": 35, "department": "Sales", "salary": 60000})'
            className="w-full h-24 p-2 border rounded mb-2 text-white"
          />
          <Button onClick={evaluateRules}>Evaluate</Button>
        </CardContent>
      </Card>

      {evaluationResult !== null && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-white">
              Evaluation Result
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">
              Result: {evaluationResult ? "True" : "False"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RuleEngineUI;
