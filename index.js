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
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/site", express.static(path.join(__dirname, "public/stylesheets")));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index", {
    title: "Pets-R-Us: Landing",
    pageTitle: "Where pets are happy and healthy",
  });
});

app.get("/grooming", (req, res) => {
  res.render("grooming", {
    title: "Pets-R-Us: Grooming",
    pageTitle: "Grooming Services",
  });
});

app.get("/boarding", (req, res) => {
  res.render("boarding", {
    title: "Pets-R-Us: Boarding",
    pageTitle: "Pets-R-Us Boarding",
  });
});

app.get("/training", (req, res) => {
  res.render("training", {
    title: "Pets-R-Us: Training",
    pageTitle: "Pets-R-Us Training",
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    title: "Pets-R-Us: Register",
    pageTitle: "Pets-R-Us Register",
  });
});

app.get("/customers", (req, res) => {
  res.render("customers", {
    title: "Pets-R-Us: Customer List",
    pageTitle: "Pets-R-Us Customer List",
  });
});

app.get("/appointment", (req, res) => {
  res.render("appointment", {
    title: "Pets-R-Us: My Appointments",
    pageTitle: "Pets-R-Us My Appointments",
  });
});

//Listen on port 3000
app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
