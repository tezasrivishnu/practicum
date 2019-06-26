module.express = function(app) {
	app.post("/api/invite/sendotp", (req, res) => {
		// var phone = req.body.phoneNo;
		// console.log(phone);
		// var digits = '0123456789';
		// OTP = '';
		// for (let i = 0; i < 4; i++) {
		// 	OTP += digits[Math.floor(Math.random() * 10)];
		// }
		// console.log(OTP)
		OTP = "1234";
		res.send(OTP);
	});

	app.post("/api/invite/verifyotp", (req, res) => {
		tOTP = req.body.otp;
		if (OTP == tOTP) res.send('true');
		else res.send('false');
	});

	app.post("/api/invite/register", jsonParser, (req, res) => {
		console.log(req.body);
		fs.writeFile(path1 + req.body.firstName + req.body.lastName + '.txt', req.body.image, function (err, data) {
			if (err) console.log(err);

			console.log("Successfully Written to File.");
		});
		req.body['image'] = path1 + req.body.firstName + "_" + req.body.lastName + '.txt';
		req.body['password'] = sah.saltHashPassword(req.body['password'])
		TUser = new Users(req.body);
		TUser.save().then(() => console.log('saved'));

	});
}