const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
// const mongoose =require('mongoose');
const passport=require('passport');
const User = require('../model/seq-model');




module.exports= function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email',  passwordField: 'password'},(email,password,done)=>{
            
            User.findAll({where:{email:email}}).then((user)=>{
                console.log(user.length)
                if(user.length==0){
                    console.log("IN NOT USER")
                return done(null,false,{message:"Email not reg.."});
                }
else{
    // console.log("IN HERE",password,user[0],user[0].dataValues,user[0].dataValues.password);
    bcrypt.compare(password,user[0].dataValues.password,(err,isMatch)=>{
        if(err)
        throw err;
console.log("isMatch",isMatch);
        if(isMatch){
            return done(null,user)
        }
        else{
            return done(null,false,{message:"Incorrect email or password"});
            }
    })
}

            })
            .catch((err)=>{console.log(err)});
        })
    );

    passport.serializeUser((user,done)=>{
        // console.log("ser... user",user)
        done(null,user[0].dataValues.id);
    })
    
    passport.deserializeUser((id,done)=>{
        User.findAll({where:{id}}).then((user)=>{
            console.log("Deser... user",user)
            done(null,user)
        })
    })


}