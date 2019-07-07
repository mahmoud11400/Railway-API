//modules files
const express = require('express');
// my files
const  complaintCotroller = require('../controller/complaint');
const route = express.Router();


route.post('/addComplaint',complaintCotroller.addComplaintPost);
route.post('/getComplaints',complaintCotroller.getComplaints);
module.exports=route;