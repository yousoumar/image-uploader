const express = require("express");
const morgan = require("morgan");
const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

// set public folder
app.use(express.static("public"));
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log(`Server listening at http://localhost:3000`);
});
