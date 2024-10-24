const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const ruleRoutes = require("./src/routes/ruleRoutes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/rules", ruleRoutes);

app.get("/", (req, res) => {
  console.log("Server is running on port 8080");
  res.send("Server is running on port 8080");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
