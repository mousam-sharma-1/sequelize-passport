var express=require("express");
var router=express.Router();
const db =require('../config/sequelizeConn');
var model= require('../model/seq-model');
var passport = require('passport');
require('../config/passport-setup')(passport);

// console.log("sequelize...")
// router.post('/', (req,res)=>{
//     console.log(req.body.email)
//     model.findAll({where:{email:req.body.email,password:req.body.password}}
//     //     {
//     //     attributes: ['id', 'title', 'description', 'budget', 'value', 'email']
//     // }
//     )
//     .then(data=>{
//         // console.log(data.length)
//         if(data.length>0){
//         console.log("OK !");
//         // console.log('instance type is, ', data[0]);
//        // res.sendStatus(200);
//         // res.send({status: 200, message:"DATA ",data:data});
//         res.redirect('/home');
//         }
//         else{
//             res.send("INCORRECT USERNAME OR PASSWORD!!");
//         }
//     })
//     .catch(err => {
//         res.send(err);
//         console.log(err);
//     })
//  });
router.get('/',(req,res)=>{
    res.send("Wrong Username Or Password !");
})

router.post('/', (req, res, next)=> {
    console.log(req.body);
    passport.authenticate('local',{
      successRedirect:'/home',
      failureRedirect: '/login'
    })(req,res,next);
  });


module.exports=router;