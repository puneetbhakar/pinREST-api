var mongo = require('mongodb');
var mongojs = require('mongojs');
var ObjectID = mongo.ObjectID;

var uri = 'mongodb://bhakar:punty@ds153765.mlab.com:53765/pincode';

var db = mongojs(uri,['newPincode','pincodes']);





exports.findAll = function(req, res) {
   db.newPincode.find(function (err, docs) {
    // docs is an array of all the documents in mycollection
	res.send(docs);
})
};

exports.findByPin = function(req, res){
	var pine = new ObjectID(req.params.pin);
	db.collection('newPincode').find({'pincode': pine}, function(err,docs){
		res.send(pine);
	})
};



/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
