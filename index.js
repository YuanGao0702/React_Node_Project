const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
//app.use(express.static(path.join(__dirname, 'Client/build')));

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

  const spawn = require("child_process").spawn;
  const pythonProcess = spawn('python',["utl/weather.py","San Jose"]);
  pythonProcess.stdout.on('data', (data) => {
    res.json({
      value:data.toString()
    })
  });
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
