const mongo = require('mongoose');

var userSchema = new mongo.Schema({
	firstName: String,
	lastName: String,
	userID: String,
	email: String,
	password: {
		salt: String,
		hash: String
	},
	phoneNo: String,
	dateOfBirth: Date,
	gender: String,
	image: String,
	resetToken: String,
	role: String,
	additionalInfo:{},
	friendRequest:[],
	friends:[],
	isPrivate:Boolean

});

var Users = mongo.model('Users', userSchema);

module.exports =Users 