const mongo = require('mongoose');

mongo.connect('mongodb://sukesh:batman1@ds155045.mlab.com:55045/userdb');

var UserSchema = new mongo.Schema({
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
	resetToken: String
});

var Users = mongo.model('Users', userSchema);

module.exports = {
	Users: Users
};