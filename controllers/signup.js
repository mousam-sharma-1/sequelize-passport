var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
// const db =require('../config/sequelizeConn');
var model= require('../model/seq-model');

/* GET home page. */
router.post('/', (req, res) => {
    console.log("data :" + JSON.stringify(req.body));

    model.findAll({ where: { email: req.body.email } })
        .then(data => {

            if (data.length > 0) {
                res.send("USER ALREADY EXIST!!");
            }
            else {
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                model.create({
                    id: 1,
                    name: req.body.name,
                    mobile: req.body.mobile,
                    email: req.body.email,
                    password:hash
                    // confpassword:req.body.cpassword
                }).then(data => {
                    console.log("Data stored successfully");
                    // res.send({ status: 200, message: "Data stored successfully", data: data });
                    res.redirect('/home');
                }).catch(err => {
                       console.log(err);
                    res.send({status: 400, message: "Data not stored successfully" })
                 
                })
            })
            }
        })
        .catch(err => {
            res.send(err);
            console.log(err);
        })

})
module.exports = router;
