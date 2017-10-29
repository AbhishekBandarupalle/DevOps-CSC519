var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs      = require('fs')
var app = express()
// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})

///////////// WEB ROUTES

app.get('/get', function(req, res) {
  {
    client.get("key", function(err,value)
      { 
        res.send(value, time);
      });
  }
})

app.get('/set', function(req, res) {
  {
  client.setex("key", 10, "this message will self-destruct in 10 seconds")
    {
      res.send("The TTL for the key is set")
    };
  }
  
})

// Add hook to make it easier to get all visited URLS.
app.use(function(req, res, next) 
{
  console.log(req.method, req.url);

  client.lpush("recentlist",req.url); 
  client.ltrim("recentlist", 0, 4); // ... INSERT HERE.

  next(); // Passing the request to the next handler in the stack.
});

app.get('/recent', function(req, res) {
  
  client.lrange("recentlist",0,4,function(err, value){
      
    res.send(value);
      
  });
  
});

app.get('/catfact/:num', function(req, res) {
  console.log(req.params);
  var num = req.params.num.split(":")[1];
  console.log(num);
  var newkey = "catfact"+":"+num

  client.exists(newkey, function(err, reply) {
    if (reply === 1) {
      console.log("Fetching from Redis Key Store")
        client.get(newkey, function(err,value)
      { 
        res.send(value);
      });
       }

    else 
    {
        get_line('catfacts.txt',num, function(err, value){
        console.log("Fetching value from text file");
        client.setex(newkey, 10, value);
        res.send(value);
  })
    }
});




});


app.get('/test', function(req, res) {
	{
		res.writeHead(200, {'content-type':'text/html'});
		res.write("<h3>test</h3>");
   		res.end();
	}
})

function get_line(filename, line_no, callback) {
    var data = fs.readFileSync(filename, 'utf8');
    var lines = data.split("\n");

    if(+line_no > lines.length){
      throw new Error('File end reached without finding line');
    }

    callback(null, lines[+line_no]);
}


 app.post('/upload',[ multer({ dest: './uploads/'}), function(req, res){
   // console.log(req.body) // form fields
   // console.log(req.files) // form files

    if( req.files.image )
    {
 	   fs.readFile( req.files.image.path, function (err, data) {
 	  		if (err) throw err;
 	  		var img = new Buffer(data).toString('base64');
 			//console.log(img);
			  
 			client.rpush('cats', img, function(err)
 			{
 				res.status(204).end()
 			});
 		});
 	}
 }]);

 app.get('/meow', function(req, res) {
 	
    client.rpop("cats", function(err,imagedata){
      res.writeHead(200, {'content-type':'text/html'});
      //console.log(err || imagedata)
      res.write("<h1>\n<img src='data:my_pic.jpg;base64,"+imagedata+"'/>");
      res.end();
    
    });
 		//items.forEach(function (imagedata) 
 		//{
		//});
 	
 });

// HTTP SERVER
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})