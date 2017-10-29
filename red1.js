var redis = require('redis');
//creating redis client
var client = redis.createClient(); 
const parse = require('redis-url-parse');

var a = parse('http://localhost:3000/catfact/:num=3000')
console.log(a.database)
var num = a.database.split("=");
console.log(num[1])

