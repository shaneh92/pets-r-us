/*
==============================================================================
; Title: customer.js Pets-R-Us model
; Author: Shane Hingtgen
; Bellevue University
; Date: 02/20/23
; Description: This is the model for our database
; Work Cited: 
    Web 330 HTML, CSS, and JavaScript Requirements
    Web 340 Assign 7
    Web 340 Assign Pets-R-Us
    Web 340 Power points
    Web 340 GitHub https://github.com/buwebdev/web-340/tree/master/week-7/fms
    Node.js Setup with express https://www.youtube.com/watch?v=A01KtJTv1oc&embeds_euri=https%3A%2F%2Fcyberactive.bellevue.edu%2F&source_ve_path=MjM4NTE&feature=emb_title
    Youtube https://www.youtube.com/watch?v=h4A0-53Olm4
    Youtube https://www.youtube.com/watch?v=Sb8xyCa2p7A&embeds_euri=https%3A%2F%2Fcyberactive.bellevue.edu%2F&source_ve_path=MjM4NTE&feature=emb_title
=================================================================================================================
*/

// these connect us to mongoose and lets it know its a schema for our DB
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// defines our schema object
const customerSchema = new Schema({
  // our object names, what type they are, unique and required for the DB
  customerId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

// exporting our schema
module.exports = mongoose.model("Customer", customerSchema);
