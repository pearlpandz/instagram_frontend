const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const users = require('../models/user'); //create new post schema
const jwt = require('jsonwebtoken');
const config = require('./../common/config');
var bcrypt = require('bcrypt');
let salt= bcrypt.genSaltSync(8);
exports.login = function(req,res){

    if(!req.body){
        res.send(
            {
                success: false,
                message: 'User data empty'
            }
        )
    }
    else if(!req.body.email){
        res.send(
            {
                success: false,
                message: 'User Email is empty'
            }
        )
    }
    else {
        users.findOne({email: req.body.email}, function(err, data){
            if (err) { 
                res.send(
                    {
                        success: false,
                        message: err
                    }
                )
            }
            else if(!data){
                res.send(
                    {
                        success: false,
                        message: 'user not found!'
                    }
                )
            }
            else {
                bcrypt.compare(req.body.password, data.password, function (err, result) {
                    if(result == true){
                    //   console.log(result);
                    var token = jwt.sign({name:req.body.name}, config.secret, {
                        expiresIn: 60*60*24 // expires in 24 hours
                    });
                    
                    res.send(
                        {
                            success: true,
                            token: token,
                            message: 'Successfully Signed In',
                            email: data.email,
                            name: data.name,
                            id: data._id,
                            profilepic: data.profilepic
                          

                        })
                    }else{
                       
                        res.send(
                            {
                                success: false,
                                message: 'user password wrong'
                            }
                        )
                    }
                })
             
             
            }
        });
    }
}
