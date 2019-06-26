const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: '100mb' });
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mongo = require('mongoose');
var privateKEY = fs.readFileSync('./private.key', 'utf8');
var publicKEY = fs.readFileSync('./public.key', 'utf8');
var prog_home = fs.readFileSync('./data/prog_home.json');
const routes = require('./routes');
const path = require('path');
const mailgunConfig = require('./mailgunConfig.js');
const Mailgun = require('mailgun-js');
var sah = require('./sah.js')
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

// const options = {
// 	useMongoClient: true,
// 	autoIndex: false, // Don't build indexes
// 	reconnectTries: 100, // Never stop trying to reconnect
// 	reconnectInterval: 500, // Reconnect every 500ms
// 	poolSize: 10, // Maintain up to 10 socket connections
// 	// If not connected, return errors immediately rather than waiting for reconnect
// 	bufferMaxEntries: 0
// };

// mongo.connect('mongodb://sukesh:batman1@ds155045.mlab.com:55045/userdb', options);
mongo.connect('mongodb+srv://sukesh:batman1@ng-cluster-0uosh.mongodb.net/userdb?retryWrites=true', { useNewUrlParser: true });

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
 	role: String
});

var Users = mongo.model('Users', userSchema);

// Activity Response Schema
var ActivityResponseSchema = new mongo.Schema({
	userId: {type: mongo.Schema.Types.ObjectId, required: true, ref: 'User'},
	activityType: String, //Quiz or Assignment
	programId: String,
	courseId: String,
	moduleId: String,
	activityId: String,
	questionId: String,
	response: Object,
	result: Boolean,
	timestamp: Date,
	evaluationStatus: Boolean,
	maxMarks: Number,
	awardedMarks: Number,
	feedback: String
});

var Activity = mongo.model("Activity", ActivityResponseSchema);

// CREATE COURSE SCHEMA
var CreateCourseSchema = new mongo.Schema({
    courseID: String,
    courseName: String,
    courseDescription: String,
    courseRepoLink: String,
    courseIncharge: String,
    courseInstructor: String,
    courseInstances: []
});

var Courses = mongo.model("Courses", CreateCourseSchema);

var payload;
var token;

var OTP;

var signOptions = {
	'algorithm': 'RS256'
}

var verifyOptions = {
	'algorithm': ['RS256']
}

const app = express();

app.use(cors());
app.use(jsonParser);
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/../dist/lms')));


app.get('/api/user/students', async (req, res)=>{
	
});
//api
app.post('/api/auth/login', jsonParser, async (req, res) => {
	// console.log(req.body);
	try {
		data = await Users.findOne({ email: req.body.email });
		console.log("awit after data -->",data);
		assert(data.password.hash == sah.sha256(req.body.password, data.password.salt).hash);
		payload = {
			'email': req.body.email,
		};
		token = jwt.sign(payload, privateKEY, signOptions);
		data = {
			'token': token,
			'valid': data.role
		};
		// console.log(data);
		// console.log("yup")
		res.send(data);
	}
	catch (e) {
		console.error(e);
		res.status(401).end();
	}
});

//api
app.get('/api/activityresponse/:token/:program_id?/:course_id?/:module_id?/:activity_id?/:question_id?', async (req,res) => {

  	try{
		var accessToken = req.params.token;
		// console.log("accesstoken = ", accessToken);
		var decoded = jwt.verify(accessToken, publicKEY, verifyOptions);
		var userId = await Users.findOne({"email":decoded.email});
    // console.log("Inside GET actres ")
    // console.log("Here are params --> ",req.params);
	    query =  {"userId":userId._id  };
	    req.params.program_id ? query["programId"] = req.params.program_id:"";
	    req.params.course_id ? query["courseId"] = req.params.course_id:"";
	    req.params.module_id ? query["moduleId"] = req.params.module_id:"";
	    req.params.activity_id ? query["activityId"] = req.params.activity_id:"";
		req.params.question_id ? query["questionId"]=req.params.question_id:"";

	    // console.log("Query is  --> ",query)
	    data =await Activity.find(query);
	    // console.log("Data-->",data);
	    console.log("User details are found");
	    res.json(data);

	}
	catch(err){
	    console.log("User details are incorrect or not found",err);
	    res.json({user_id: "not found"});
	}

});

//api
app.get('/api/latestresponse/:user_id?/:program_id?/:course_id?/:module_id?/:activity_id?/:question_id?', async (req,res) => {

  	try{
		console.log("Inside Latest Reponse");
		query =  {};
		req.params.user_id ? query["userId"] = new ObjectId(req.params.user_id):"";
	    req.params.program_id ? query["programId"] = req.params.program_id:"";
	    req.params.course_id ? query["courseId"] = req.params.course_id:"";
	    req.params.module_id? query["moduleId"] = req.params.module_id:"";
	    req.params.activity_id?query["activityId"] = req.params.activity_id:"";
		req.params.question_id ?query["questionId"]=req.params.question_id:"";
		// console.log("Query is  --> ",query)
		// data =await Activity.findOne(query).sort({timestamp:-1});
		data = await Activity.aggregate([
			{"$match": query},
			{"$sort": {"timestamp": -1}},
			{"$group": {
				"_id":{
					"userId": "$userId",
					"courseId": "$courseId",
					"moduleId": '$moduleId',
					"activityId": "$activityId",
					"questionId": "$questionId"
				},
				"item": {"$first": "$$ROOT" }
			}},
			{"$sort": {
				"item.userId": 1,
				"item.courseId": -1,
				"item.moduleId": -1,
				"item.activityId": -1,
				"item.questionId": 1
			}}
		]);
		// console.log(data);
		// console.log(data.map(x => x.item));
		data = await Users.populate(data.map(x => x.item), {path: "userId"});
		// console.log(data);
		if(data.length > 0){
			// console.log(" Inside Lastest Response User details are found");
			if (req.params.question_id) res.send(data[0]);
			else res.json(data);
		}
		else res.status(404).json({ error: 'not found' });

  	}
  	catch(err){
    	console.log("User details are incorrect or not found",err);
  	}

});

//api
app.post('/api/activityresponse', jsonParser,async (req,res) =>{
	try{
		// console.log("Inside Activity Response Post");
		var accessToken = req.body.userId;
		// console.log(accessToken);
		var decoded = jwt.verify(accessToken, publicKEY, verifyOptions);
		// console.log(JSON.stringify(req.body));
			// Getting Response date and setting time zone to IST
		var userId = await Users.findOne({"email":decoded.email});
		// console.log(userId)
		 date = new Date();
		 date.setHours(date.getHours());
		 date.setMinutes(date.getMinutes());
		 req.body.userId = userId._id;
		 req.body["timestamp"] = date;
		 if(req.body.activityType == "quiz"){
			req.body.result ? req.body["awardedMarks"] = req.body.maxMarks : req.body["awardedMarks"] = 0 ;
		 }
		 if(req.body.activityType == "assignment"){
			req.body["evaluationStatus"] = false;
			req.body["awardedMarks"] = 0;
			req.body["feedback"] = "";
		}

		await new Activity(req.body).save();
		res.json({"db_result":"true"});

	}
	catch(err){
		// console.log("Error Activity Response POST Method", err);
		res.sendStatus(401).end();
	}
});

//api
app.get("/api/getrole", async (req,res)=>{
	try{
		console.log("Insise Get Role");
		var accessToken = req.query.token;
		console.log(accessToken);
		var decoded = jwt.verify(accessToken, publicKEY, verifyOptions);
		// console.log("token verify--->", decoded);
		user  = await Users.findOne({"email":decoded.email});
		console.log(user);
		console.log(user.role);
		res.json(user.role);
		res.end();

	}
	catch(err){
		console.log("Error Get Role -->",err );
	}
});

//api
app.get("/api/getid", async (req,res)=>{
	try{
		// console.log("Insise Get Role");
		var accessToken = req.query.token;
		console.log(accessToken);
		var decoded = jwt.verify(accessToken, publicKEY, verifyOptions);
		console.log("token verify--->", decoded);
		// console.log(await Users.find({"email":decoded.email}))
		user = await Users.findOne({"email":decoded.email})
		console.log(user);
		res.json(user._id);

	}
	catch(err){
		console.log("Error Get Id -->",err );
	}
});

//api
app.get("/api/mycourses",async (req,res)=>{

	try{
		var accessToken = req.query.token;
		var decoded = jwt.verify(accessToken, publicKEY, verifyOptions);
		// console.log("token verify--->", decoded);

		res.json(await Courses.find({"courseIncharge":decoded.email}));

	}
	catch(err){
		console.log("My Courses Error Message --> ", err);
	}
});

//api
app.post("/api/create-instance",jsonParser, async (req,res)=>{

	try{
		co = await Courses.findOne({_id: req.body.course_id});
		query = {
			"commitId" : req.body.commitId,
			"startDate" : req.body.startDate,
			"endDate" : req.body.endDate,
			"isLive" : req.body.isLive,
			"isAlive" : req.body.isAlive,
			"batch" : req.body.batch
		}
		await Courses.findByIdAndUpdate(req.body.course_id,{$push: {courseInstances:query}});
	}
	catch(err){
		console.log("Course Instance Error Message --> ",err);
	}
});

//api
app.get('/home', (req, res) => {
	var accessToken = req.query.token;
	// console.log(accessToken);
	try {
		var legit = jwt.verify(accessToken, publicKEY, verifyOptions);
		res.status(200).send(prog_home_data);
	}
	catch (err) {
		res.status(401).send()
	}
});

//api
app.post("/api/updateactivitymarks",async (req, res) => {
	var accessToken = req.query.token;
	// console.log(req.body);
	var decoded = jwt.verify(accessToken, publicKEY, verifyOptions);
	user = await Users.findOne({"email":decoded.email});
	// console.log(user.role);
	if (user.role == 'mentor') {
		await Activity.updateOne({_id: new ObjectId(req.body._id)}, {$set: {"awardedMarks": req.body.awardedMarks, "feedback": req.body.feedback, "evaluationStatus":true}}, { upsert: false, multi: true });
		res.json(await Activity.findOne({_id: new ObjectId(req.body._id)}));
	}
});
/*registration server part starts here*/
//api
app.get("/api/lessons/:course_id", (req, res) => {
	var course_id = req.params.course_id;
	// console.log("course id ", course_id);
	// Check if the file exists in the current directory, and if it is writable.
	var file = './data/' + course_id + '.json';
	fs.access(file, fs.constants.F_OK | fs.constants.R_OK, (err) => {
		if (err) {
			console.error(
				`${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is not readable'}`);
			res.send([])
		} else {
			// console.log(`${file} exists, and it is readable`);
			fs.readFile(file, 'utf8', (err, data) => {
				if (err) console.log("error while reading file", err);
				// console.log(data);
				res.send(JSON.parse(data));
			});
		}
	});

})

//api
app.get("/api/activities/:lesson_id", (req, res) => {
	var lesson_id = req.params.lesson_id;
	// console.log("course id ", lesson_id);
	// Check if the file exists in the current directory, and if it is writable.
	var file = './data/lessons/' + lesson_id + '.json';
	fs.access(file, fs.constants.F_OK | fs.constants.R_OK, (err) => {
		if (err) {
			console.error(
				`${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is not readable'}`);
			res.send([])
		} else {
			// console.log(`${file} exists, and it is readable`);
			fs.readFile(file, 'utf8', (err, data) => {
				if (err) console.log("error while reading file", err);
				// console.log(data);
				res.send(JSON.parse(data));
			});
		}
	});

})

// Send a message to the specified email address when you navigate to /submit/someaddr@email.com
// The index redirects here
//api
app.post('/api/issue/report', function (req, res) {
	//We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
	var mailgun = new Mailgun({ apiKey: mailgunConfig.api_key, domain: mailgunConfig.domain });
	var issue = req.body.issue;
	var email = req.body.email;
	var data = {
		//Specify email data
		// from: req.params.mail,
		from: email,
		//The email to contact
		to: mailgunConfig.to_who,
		//Subject and text data
		subject: 'LMS Issue Tracker',
		html: `
			Hi LMS,
			${issue}
		`
	}

	//Invokes the method to send emails given the above data with the helper library
	mailgun.messages().send(data, function (err, body) {
		//If there is an error, render the error page
		if (err) {
			res.send({ "message": "error while reporting the issue" });
			console.log("got an error: ", err);
		}
		//Else we can greet    and leave
		else {
			//Here "submitted.jade" is the view file for this landing page
			//We pass the variable "email" from the url parameter in an object rendered by Jade
			res.send({ "message": "Issue reported successfully" });
			console.log(body);
		}
	});

});


/*registration server part starts here*/
var path1 = "./uploads/"
//api
app.post("/api/invite/sendotp", (req, res) => {
	console.log(req.body)
	var phone = req.body.phoneNo;
	console.log(phone);
	var digits = '0123456789';
	OTP = '';
	for (let i = 0; i < 4; i++) {
		OTP += digits[Math.floor(Math.random() * 10)];
	}
	console.log(OTP)
	OTP = "1234";
	res.send(OTP);
});

//api
app.post("/api/invite/verifyotp", (req, res) => {
	tOTP = req.body.otp;
	if (OTP == tOTP) res.send('true');
	else res.send('false');
});

//api
app.post("/api/invite/register", jsonParser, (req, res) => {
	console.log(req.body);
	fs.writeFile(path1 + req.body.firstName + req.body.lastName + '.txt', req.body.image, function (err, data) {
		if (err) console.log(err);

		console.log("Successfully Written to File.");
	});
	req.body['image'] = path1 + req.body.firstName + "_" + req.body.lastName + '.txt';
	req.body['password'] = sah.saltHashPassword(req.body['password'])
	console.log(req.body)
	TUser = new Users(req.body);
	TUser.save().then(() => console.log('saved'));
	res.send("user created")

});

var prog_home_data = JSON.parse(prog_home);
//api
app.post('/api/auth/forgot-password', jsonParser, async (req, res) => {
	console.log(req.body);
	try {
		token = sah.genRandomString(16);
		let user = await Users.findOne({ email: req.body.email });
		await Users.update({ email: user.email }, { $set: { "resetToken": token } }, { upsert: false, multi: true });
		var mailgun = new Mailgun({ apiKey: mailgunConfig.api_key, domain: mailgunConfig.domain });
		// let url = 'http://localhost:4200/auth/reset-password/' + token
		var data = {
			from: mailgunConfig.to_who,
			// to: 'akhil.dh2@gmail.com',
			to: user.email,
			subject: 'LMS Password Reset',
			text: 'Hey,\nPlease click on the following link to reset your password.\n\nhttps://calm-dawn-53560.herokuapp.com/auth/reset-password/'+token
			// html: "<a href=" + url + "> Reset</a>"
		}
		mailgun.messages().send(data, (err, body) => {
			if (err) console.log(err);
			else console.log('Reset password mail sent successfully.');
			res.send(true)
		});

	}
	catch (e) {
		res.status(401).end();
	}
});

//api
app.post('/api/auth/reset-password', jsonParser, async (req, res) => {
	console.log(req.body);
	// if (req.body.validate == "") res.status(401).end()
	try {
		let pass = sah.saltHashPassword(req.body.password);
		await Users.findOne({ resetToken: req.body.validate });
		await Users.update({ resetToken: req.body.validate }, { $set: { resetToken: "", password: pass } }, { upsert: false, multi: true });
		res.send(true);
	}
	catch (e) {
		res.status(401).end();
	}
});

//api
app.get('/api/user', async(req, res) => {
try{
		user = await Users.findOne({"_id": new ObjectId(req.query.id)});
		res.json(user);
	}
	catch(err){
		// console.log("Error Get User -->",err );
		res.status(404).end();
	}
});


/*registration server part ends here*/
app.use('/', routes);
app.listen(4600, (req, res) => {
	console.log('The server is running on 4600');
})

module.exports = app;