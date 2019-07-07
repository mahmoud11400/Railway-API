const mongoose = require('mongoose');
const complaintSchema = mongoose.Schema({
    ticketId :String ,
    message :String,
    trainNumber :String,
    email:String
});
const complaintModule = mongoose.model("complaint",complaintSchema);

module.exports= complaintModule; 