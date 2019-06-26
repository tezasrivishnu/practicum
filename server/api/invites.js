const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: '100mb' });
const Invites = require('../models/invitesModel');

const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox7df6d2e94e50417a9a3e7f79457e1ce0.mailgun.org';
const mg = mailgun({ apiKey: '7ce5dbe5f620ae921828b75239c50e9e-87cdd773-65263291', domain: DOMAIN });

router.post('/bulk-invite', jsonParser, async (req, res) => {
    var cnt = 0;
    var uniqueID;
    await req.body.forEach(async (element) => {
        element.status = "";
        result = await Invites.findOne({ 'email': element.email });
        if (result) {
            uniqueID = result._id;
        }
        else{
            await Invites(element).save();
            result = await Invites.findOne({ 'email': element.email });
            uniqueID = result._id;            
        }
        data = {
            from: 'Innosential <noreply@innosential.com>',
            to: 'itsvittu@gmail.com',
            subject: 'Invitation to Innosential LMS',
            text: 'Hello\nWe welcome you to the Innosential LMS. Please click on the link below to continue with the registration process.\n\nhttp:localhost:4200/signup/' + uniqueID
        };

        try {
            await mg.messages().send(data);
            element.status = 'Mail sent';
        } catch (error) {
            element.status = 'Mail failed';
        }

        await Invites.update({ 'email': element.email }, { $set: { "status": element.status } });
        cnt++;
        if (cnt == req.body.length) {
            var data = await Invites.find({});
            res.json(data);
        }
    });
});

router.get('/get-data', (req, res) => {
    Invites.find({}, function (err, data) {
        if (err) console.log('DB retreiving failed');
        else res.json(data);
    });
});

router.get("/lookup/:code", async (req, res) => {
    var code = req.params.code;
    try {
        var data = await Invites.findOne({ '_id': code });
        if (data.status == "Complete") {
            res.sendStatus(403);
            return;
        }
        res.json(data);
        await Invites.update({ 'email': data.email }, { $set: { "status": 'Registration pending' } });
    } catch (error) {
        res.sendStatus(404);
    }
});

router.get("/complete/:code", async (req, res) => {
    var code = req.params.code;
    try {
        var data = await Invites.findOne({ '_id': code });
        res.json(data);
        await Invites.update({ 'email': data.email }, { $set: { "status": 'Complete' } });
    } catch (error) {
        res.sendStatus(404);
    }
});

module.exports = router;