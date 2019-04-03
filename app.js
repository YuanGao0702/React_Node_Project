const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express();
const cp=require('child_process')
const bodyParser = require('body-parser');
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'Client/build')));

//mongoose
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://gaoyuan0702:Gw295459784!@ds213229.mlab.com:13229/react_node_express';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;

// Put all API endpoints under '/api'
app.get('/allusers', function(req, res, next) {
  res.json([{
  	id: 1,
  	username: "gary"
  }, {
  	id: 2,
  	username: "summer"
  }]);
});

app.get('/weather',(req,res)=>{
  db.collection("weather").findOne({"City":"San Jose"},function(err,docs){
    if(err){
      console.log(err)
    }else{
      res.send(docs);
    }
  })
})

//send pic
app.get('/pic', function(req, res,next) {
  res.sendFile(__dirname+'/img/Google.jpg')
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/Client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);
