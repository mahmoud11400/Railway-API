const mongoose = require('mongoose');


const userSchema =mongoose.Schema({
    username : String,
    phoneNumber:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    dateOfRegister:{
        type:Date
    },
    registrationNumber:String
});

const userModule= mongoose.model('user',userSchema);
module.exports=userModule;
