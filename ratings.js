var express = require('express')
var app = express()


app.get('/', function( req, res ){
  setTimeout( function(){ 
    res.send( 'all done!' ); 
  }, 10000 );
});
// when shutdown signal is received, do graceful shutdown
process.on( 'SIGINT', function(){
  server.close( function(){
    console.log( 'gracefully shutting down :)' );
    process.exit();
  });
});


app.get('/ratings', function(req, res) 
  {
  	console.log(req.url)
    res.writeHead(200, {'content-type':'text/html'});
    res.write("Ratings service");
    res.end();
  });

// HTTP SERVER
var server = app.listen(5000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})