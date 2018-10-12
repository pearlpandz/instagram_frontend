//node dependencies - express
const express = require('express');
var multer  =   require('multer');
const app = express();
var cors = require('cors');



const server = require('http').createServer(app);




// const fs = require('fs');

//node dependencies - mangoose
const mongoose = require('mongoose');

// define mongo port
const port = process.env.PORT || 3000;

//mangoose.connect
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/instagram_clone', { useNewUrlParser: true });
mongoose.connect('mongodb://127.0.0.1:27017/instagram_clone', { useNewUrlParser: true });

// Router - Express functions
const router = require('express').Router();


// node dependencies - bodyparser, path
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
// app.use(express.static(path.join(__dirname, './uploads')));
    // app.use(express.static(__dirname + '/uploads'));
// console.log(path.join(__dirname, 'uploads'));

// Access-Control- Allow-Origin | Allow-Methods | Allow-Headers | Allow-Credentials
app.use(function(req, res, next) {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});


// calling routes folder
const Posts = require('./models/index'); //create new post schema
// api hiting place

var upload = multer({ storage : multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads');
    },
    filename: function (req, file, callback) {
      callback(null, 'post-' + Date.now() + '.' + file.mimetype.split('/').pop() );
    }
  })
}).single('sampleFile');

app.post('/post', upload, function(req,res){

  let post = new Posts ({
    description: req.body.description,
    location: req.body.location,
    sampleFile: req.body.sampleFile,
    createdat: new Date().toLocaleString()
  });

  post.save(function(err,result){
      if(err){
          console.log(err);
      }
      else {
          res.json({id: result['_id'] });
      }
  });  
});


app.post('/upload', upload, function(req,res){
  const uploadedFilePath = req.protocol + "://" + req.get('host') + '/' + req.file.path;
  var regularpath = uploadedFilePath.replace(/\\/g, "/");
  let posts = new Posts ({
    sampleFile: regularpath,
    createdat: new Date().toLocaleString()
  });
  let mangooseid = req.body._id;

  var query = {"_id": mangooseid};
  var update = {sampleFile: regularpath};
  var options = {new: true};
  Posts.findOneAndUpdate(query, update, options, function(err, post) {
    if (err) {
      console.log('got an error');
    }
    else {
      console.log(post);
      res.send(post);
    }
  
  }); 
});

app.post('/getpost', function(req,res){
  Posts.find({}).sort('-createdat').exec(function(err, docs) { 
    if(err) {
      res.json(err);
    }
    else {
      res.send(docs);
    }
   });
});


// run server
server.listen(port, () => console.info(`App running on port ${port}`));