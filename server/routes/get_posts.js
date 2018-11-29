const router = require('express').Router();
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const Posts = require('../models/index'); //create new post schema

exports.getpost = function(req,res){
    Posts.find({}).sort('-createdat').exec(function(err, post) { 
      if(err) {
        res.json(err);
      }
      else {
        res.json(post);
      }  
    });
};
exports.singlepostafter =  function(req,res, next)
{
  // console.log(req.body.id);
  Posts.findOne({_id: {$gt:(req.body.id) }}).sort({_id: 0 }).limit(1).exec(function(err1,post1){
    // console.log(post1);
if(err1){
  res.json({
    data: err1,
    msg : false
  });
}else{
  if(req.body.userid == post1.userid){
    // res.send(post1);
    Posts.findOne({_id: {$gt:(req.body.id) }}).sort({_id: 0 }).limit(1).exec(function(err2,post2){
if(err2){
  res.json({data:err2,
  message: false})
}else{
  res.json({data: post2})
}  })
 }else{
   res.json({message:'not a current user'});
  
}
}
  })
}
exports.singlepostsprevious =  function(req,res, next)
{
  // console.log(req.body.id);
  Posts.findOne({_id: {$lt:(req.body.id) }}).sort({_id: -1 }).limit(1).exec(function(err1,post1){
    // console.log(post1);
if(err1){
  res.json({
    data: err1,
    msg : false
  });
}else{
  if(req.body.userid == post1.userid){
    // res.send(post1);
    Posts.findOne({_id: {$lt:(req.body.id) }}).sort({_id: -1 }).limit(1).exec(function(err2,post2){
if(err2){
  res.json({data:err2,
  message: false})
}else{
  res.json({data: post2})
}  })
 }else{
   res.json({message:'not a current user'});
  
}
}
  })
}