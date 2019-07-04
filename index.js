// libraraies
const express =require('express');
const bodyPaser=require('body-parser');
const monoogse=require('mongoose');
const port = process.env.port || 9000;
// my files
const authRoute = require('./route/auth');
//
const myApp = express();
myApp.get('/',(req,res,next)=>{
    res.write('<p>hello</p>');
});
myApp.use(bodyPaser.json({}));
myApp.use('/auth',authRoute);

monoogse.connect('mongodb+srv://railway:w1hCRTct5qThqIdR@cluster0-c7qjr.mongodb.net/retryWrites=true',{ useNewUrlParser: true }).then(()=>{
    myApp.listen(port,()=>{
        console.log('connected');
    });
}).catch(err=>{
console.log(err);
});

 