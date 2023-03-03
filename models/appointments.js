/*
==============================================================================
; Title: appointments.js Pets-R-Us model
; Author: Shane Hingtgen
; Bellevue University
; Date: 02/22/23
; Description: This is the appointments model for our database
; Work Cited: 
    Web 330 HTML, CSS, and JavaScript Requirements
    Web 340 Assign 8
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
const appointmentSchema = new Schema({
  // our object names, what type they are, unique and required for the DB
  // changed some of the name attributes unique to false to better add the data otherwise it comes up with an error, such as the original error was because of service, then i had to edit the mongoDB to reflect the changes otherwise it still held the boolean value as true and not false
  userName: { type: String, required: true, unique: false },
  firstName: { type: String, required: true, unique: false },
  lastName: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: false },
  service: { type: String, required: true, unique: false },
});

// exporting our schema
module.exports = mongoose.model("Appointment", appointmentSchema);
