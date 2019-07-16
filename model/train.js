const mongoose = require('mongoose');
const mongodb = require('mongodb');
const trainSchema = mongoose.Schema({
    trainId:String , 
    longitude:mongoose.Types.Decimal128 , 
    latitude:mongoose.Types.Decimal128
});
const trainModule = mongoose.model("train",trainSchema);
module.exports=trainModule;