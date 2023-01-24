"use-strict";
//imports
const express = require("express");
const path = require("path");
const app = express();

//set views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set static files
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index", {
    title: "Pets-R-Us: Landing",
    pageTitle: "Pets-R-Us Landing",
  });
});

app.get("/grooming", (req, res) => {
  res.render("grooming", {
    title: "Pets-R-Us: Grooming",
    pageTitle: "Pets-R-Us Grooming",
  });
});

//Listen on port 3000
app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
