const mongo = require('mongoose');

mongo.connect('mongodb://sukesh:batman1@ds155045.mlab.com:55045/userdb');

var ActivityResponseSchema = new mongo.Schema({
	user_id: String,
	program_id: Number,
	course_id: Number,
	module_id: Number,
	activity_id: Number,
	question_id: Number,
	response: Object
});

var Activity = mongo.model("Activity", ActivityResponseSchema);

module.exports = {
	Activity: Activity
};