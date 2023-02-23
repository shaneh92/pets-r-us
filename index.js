/*
==============================================================================
; Title: index.js Pets-R-Us
; Author: Shane Hingtgen
; Bellevue University
; Date: 01/28/23
; Description: This file allows website connection via express
; Work Cited: 
    Web 330 HTML, CSS, and JavaScript Requirements
    Web 340 Assign 4
    Web 340 Assign 6
    Web 340 Assign 7
    Web 340 Assign 8
    Web 340 Assign Pets-R-Us
    Web 340 Power points
    Web 340 GitHub https://github.com/buwebdev/web-340/tree/master/week-7/fms
    Node.js Setup with express https://www.youtube.com/watch?v=A01KtJTv1oc&embeds_euri=https%3A%2F%2Fcyberactive.bellevue.edu%2F&source_ve_path=MjM4NTE&feature=emb_title
=================================================================================================================
*/
"use-strict";
//imports
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");

const Customer = require("./models/customer.js"); //Our customer model we created
const Appointment = require("./models/appointments.js"); //Our appointment model we created

//set views and view engine as ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set static files, folder: public, has images and stylesheets
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/site", express.static(path.join(__dirname, "public/stylesheets")));

//Important in order to post information to db from our form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const CONN =
  "mongodb+srv://web340_admin:123@bellevueuniversity.ut5xprd.mongodb.net/web340DB"; //Our MongDB Server
const PORT = process.env.PORT || 4000; // set the port up

//Connection to MongoDB
mongoose
  .connect(CONN)
  .then(() => {
    console.log(
      "Connection to MongoDB database was successful\n  If you see this message it means you were able to connect to your MongoDB Atlas cluster"
    ); //This will verify we have connect to server
  })
  .catch((err) => {
    console.log("MongoDB Error: " + err.message); //Will tell us we did not connect to server
  });

// These are the web pages connected
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

app.get("/customerlist", (req, res) => {
  res.render("customerlist", {
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

// this will load our JSON file
app.get("/appointments", (req, res) => {
  let jsonFile = fs.readFileSync("./public/data/services.json");
  let services = JSON.parse(jsonFile);

  console.log(services);

  res.render("appointment", {
    title: "Pets-R-Us: My Appointments",
    pageTitle: "Pets-R-Us My Appointments",
    services: services,
  });
});

// this will post our information we submit on the form into mongoDB
app.post("/appointments", (req, res, next) => {
  // console.log(req.body);
  // console.log(req.body.firstName);
  // console.log(req.body.lastName);
  // console.log(req.body.email);
  // console.log(req.body.service);
  const newAppointment = new Appointment({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    service: req.body.service,
  });

  console.log(newAppointment); //Allows us to see what we just posted from our form

  //this creates the information and adds it then returns you to the index page
  Appointment.create(newAppointment, function (err, appointment) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.render("index", {
        title: "Pets-R-Us: Landing",
        pageTitle: "Where pets are happy and healthy",
      });
    }
  });
});

// this will post our information we submit on the form into mongoDB
app.post("/customers", (req, res, next) => {
  console.log(req.body);
  console.log(req.body.customerId);
  console.log(req.body.email);
  const newCustomer = new Customer({
    customerId: req.body.customerId,
    email: req.body.email,
  });

  console.log(newCustomer); //Allows us to see what we just posted from our form

  //this creates the information and adds it then returns you to the index page
  Customer.create(newCustomer, function (err, customer) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.render("index", {
        title: "Pets-R-Us: Landing",
        pageTitle: "Where pets are happy and healthy",
      });
    }
  });
});

//Notice: the name /customers is used in 4 places, once in the header, one in our form in register and the other two app.post and the app.get below for the .find function it seems like this takes us to the data thats on the web page
app.get("/customers", (req, res) => {
  Customer.find({}, function (err, customer) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.render("customerlist", {
        title: "Pets-R-Us: Customer List",
        pageTitle: "Pets-R-Us Customer List",
        customer: customer,
      });
    }
  });
});

app.listen(PORT, () => {
  console.log("Application started and listening on PORT " + PORT);
});
