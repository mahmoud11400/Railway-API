const userModel = require('../model/user');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodeMailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const jwt = require('jsonwebtoken');
const transport = nodeMailer.createTransport( sendGridTransport({auth:
    {api_key:'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'}})) 
      //    signup controller
    exports.postSignUp = (req,res,next)=>{
    
    const email = req.body.email;
    const password= req.body.password;
    const phoneNumber = req.body.phoneNumber;
    console.log("hello");
    console.log(email);
    console.log(password);
    console.log(phoneNumber);

    userModel.find({email:email}).then(loadedUser=>{
        loadedUser=loadedUser[0];
        if(loadedUser!=null)
        {
            res.status(200).json({message:'email is already registered'});
        }
        else{
            bcrypt.hash(password,12).then(hashedPassword=>{
                crypto.randomBytes(32,(err,buffer)=>{
               var registationNumber= buffer.toString('hex');
               console.log(registationNumber); 
               const newUser = new userModel({email:email,password:hashedPassword,phoneNumber:phoneNumber, dateOfRegistration: new Date(),registrationNumber:registationNumber});
                newUser.save()
                .then(()=>{
        
                    return  transport.sendMail({to:newUser.email,
                         from:'railwayAPP@railway.com',
                         subject:'Email verfication',
                         html:`<h1>hello${newUser.mame}</h1>
                              <hr>
                            <a href ='http://localhost:9000/registation/registerVerification/${registationNumber}'> register</a>`});
             
             
                 })
                .then(()=>{
                    res.status(200).json({message:'register done'});
                })
        })
        
        })
        }
    })
   

}
 // verfication controller 
exports.verificationController=(req,res,next )=>{
    const registerNo =req.params.registerNO ;
    console.log(registerNo);
    userModel.find({registrationNumber:registerNo}).then(user=>{
          user=user[0];
        if(user!=null)
        {
           if(user.registrationNumber!='')
             {
                 user.registrationNumber='';           
                 user.save();
             }
        } 
    });
};

exports.loginController= (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);
    userModel.find({email:email}).then(user=>{

        user=user[0];
        if(user!=null)
        {
          bcrypt.compare(password,user.password)
          .then(isEqual=>{
              if(isEqual)
              {const token = jwt.sign({email:user.email,
                userId:user._id.toString()},'secret jwt',
                {expiresIn:'365d'});
                res.json({message:"login successfully",token:token});
              }
              else{
                 
                res.status(200).json({message:'email or password is invalid '});

              }
          })
        }
        else
        {
            res.status(200).json({message:'email or password is invalid '});
        }
    });
};