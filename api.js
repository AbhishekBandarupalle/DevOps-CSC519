var express = require('express')
var app = express()

app.get('/gateway', function(req, res) {
console.log(req.url)
var threshold1 = 99;
var threshold2 = 99.5;
var threshold3 = 100; 
var randomNumber = Math.random() * 100;

if (randomNumber <= threshold1)
 {
    {
    console.log(randomNumber,"number less than 99, so redirecting to /api")
    res.redirect('/api')
    }
  }
else if (randomNumber > threshold1 && randomNumber <= threshold2) 
{
  {
    console.log(randomNumber,"number between 99-99.5, so redirecting to /apicontrol")
    res.redirect('/apicontrol')
  }
}
else 
{
   {
    console.log(randomNumber,"number more than 99.5, so redirecting to /apiexp")
    res.redirect('/apiexp')
   }
}
});

app.get('/api', function(req, res) {
  res.redirect('http://localhost:5000/ratings')
})

app.get('/apicontrol', function(req, res) 
  {
    res.redirect('http://localhost:5000/ratings')
  })

app.get('/apiexp', function(req, res) 
  {
    res.sendStatus(500);
  })


// HTTP SERVER
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})