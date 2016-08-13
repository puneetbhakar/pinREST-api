var express = require('express');
var path = require("path");
var bodyParser = require("body-parser");
var mongo = require('mongodb');
var mongojs = require('mongojs');
var ObjectID = mongo.ObjectID;
var app = express();



app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


var uri = 'mongodb://bhakar:punty@ds153765.mlab.com:53765/pincode';

var db = mongojs(uri,['newPincode','pincodes']);

app.listen(3000);
console.log('Listening on port 3000...');





app.get('/allData',function(req, res) {
   db.newPincode.find(function (err, docs) {
    // docs is an array of all the documents in mycollection
	res.send(docs);
})
});

app.get('/allData/:pin/:limit', function(req, res){
	var pine = req.params.pin.toString();
	var limi = req.params.limit.toString();
	db.newPincode.aggregate({$match:{"pincode":parseInt(pine),}},{$unwind : "$postal_service"},{$match: {"postal_service.limit":{$gt:parseInt(limi),} }}, {$match:{ "postal_service.avail":"Y"}}, function(err,docs){
	res.send(docs);
})
});

//http://stackoverflow.com/questions/3985214/retrieve-only-the-queried-element-in-an-object-array-in-mongodb-collection