const jwt = require('jsonwebtoken');
const complaintModule = require('../model/complaint');

exports.addComplaintPost = (req,res,next)=>{
        const token = req.body.jwt;
        jwt.verify(token,'secret jwt',(err,decode)=>{
            if(err)
            {  
                res.json('error in authentication');
            
            }
            else{
             const complaintMessage = req.body.complaintMessage;
             const ticketId = req.body.ticketNumber ; 
             const trainNo = req.body.trainId ; 
             const email =decode.email;
            
             const newComplaint = new complaintModule({ticketId:ticketId, 
                                            message :complaintMessage,
                                            trainNumber:trainNo,
                                            email:email});
            newComplaint.save();
            res.json("done");


            }
        }) ;  
};
exports.getComplaints=(req,res,next)=>{
  const token = req.body.jwt;
  console.log(req.body); 
  jwt.verify(token,"secret jwt",(err,decode)=>{
    if(err|| decode.email!='admin@admin.com' )
    {
        res.json({message:"there is an authentication error"});
        console.log("okkkk");
    }
    else{
       complaintModule.find().then(data=>{
           res.json(data);
           console.log("ok2");
       });
    }
  });
};
