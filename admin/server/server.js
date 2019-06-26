const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mongo = require('mongoose');
const path = require('path');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

const upload = multer({ dest: '/uploads/' });
const jwt = require('jsonwebtoken');

var privateKEY = fs.readFileSync('./private.key', 'utf8');
var publicKEY = fs.readFileSync('./public.key', 'utf8');

const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxd08e333394eb48cc83ca0979a9c21660.mailgun.org';
const mg = mailgun({ apiKey: '60de8469912d17f137c706506a193bd6-acb0b40c-35529a48', domain: DOMAIN });



const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '/../dist/admin')));
var signOptions = {
    'algorithm': 'RS256'
}

var verifyOptions = {
    'algorithm': ['RS256']
}
mongo.connect('mongodb://sukesh:batman1@ds155045.mlab.com:55045/userdb');



var inviteSchema = new mongo.Schema({
    userID: String,
    email: String,
    type: String,
    status: String,
});

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

var CreateCourseInstance = new mongo.Schema({
    courseInstanceLabel: String,
    courseIncharge: [],
    courseInstructor: [],
    isLive: Boolean,
    enrollment: [],
    batches: [{
        mentorID: String,
        studentsID: []
    }]
})

var CreateCourseCatalog = new mongo.Schema({
    courseID: String,
    courseName: String,
    courseDescription: String,
    isAlive: Boolean
});

var CreateProgramSchema = new mongo.Schema({
    programName: String,
    curriculum: [{
        courseID: String,
        courseInstances: []
    }],
    calendar: String
})

var Invites = mongo.model('Invites', inviteSchema);
var Users = mongo.model('Users', userSchema);
var Courses = mongo.model("CourseCatalog", CreateCourseCatalog, "coursecatalog");
var CourseInstances = mongo.model("CourseInstances", CreateCourseInstance);
var Programs = mongo.model('Programs', CreateProgramSchema);

app.get('/api/invites/get-data', (req, res) => {
    Invites.find({}, function (err, data) {
        if (err) console.log('DB retreiving failed');
        else res.json(data);
    });
});

app.post('/api/invites/bulk-invite', jsonParser, async (req, res) => {
    var cnt = 0;
    await req.body.forEach(async (element) => {
        result = await Invites.findOne({ 'email': element.email });
        if (!result) {
            element.status = "";
            await Invites(element).save();
        }
        result = await Invites.findOne({ 'email': element.email });
        uniqueID = result._id;
        data = {
            from: 'Innosential <noreply@innosential.com>',
            to: 'akhil.dh2@gmail.com',
            subject: 'Invitation to Innosential LMS',
            text: 'Hello\nWe welcome you to the Innosential LMS. Please click on the link below to continue with the registration process.\n\nhttps://calm-dawn-53560.herokuapp.com/signup/' + uniqueID
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

// TODO change this to 'invites'
app.get("/api/invite/lookup/:code", async (req, res) => {
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

// TODO change this to 'invites'
app.get("/api/invite/complete/:code", async (req, res) => {
    var code = req.params.code;
    try {
        var data = await Invites.findOne({ '_id': code });
        res.json(data);
        await Invites.update({ 'email': data.email }, { $set: { "status": 'Complete' } });
    } catch (error) {
        res.sendStatus(404);
    }
});

app.post("/api/course/create", jsonParser, (req, res) => {
    try {
        console.log(req.body);
        data = req.body;
        data.isAlive = true;
        Courses(data).save();
        res.send(true);

    } catch (error) {
        res.sendStatus(500);
    }
});

app.get("/api/program/courses/get", async (req, res) => {
    try {
        var data = await Courses.find({}, { courseName: 1 });
        console.log(data);
        res.send(data);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.post("/api/program/create", jsonParser, (req, res) => {
    console.log(req.body);
    var data = req.body;
    Programs(data).save();
    res.send(true);
});
app.post("/api/program/update/:program_id", jsonParser, async (req, res) => {
    var code = req.params.program_id;
    var data = req.body;
    var program1 = await Programs.find({ _id: code });
    let curriculum = [];
    var flag = true;
    var flag2 = false;
    for (let x = 0; x < program1[0].curriculum.length; x++) {
        curriculum.push(program1[0].curriculum[x])
    }
    for (let index = 0; index < data.length; index++) {
        flag = true;
        for (let j = 0; j < program1[0].curriculum.length; j++) {
            if (data[index]._id == program1[0].curriculum[j]._id) {
                flag = false;
            }


        }
        flag2 = true;
        if (flag) {
            temp = {
                CourseInstances: [],
                _id: data[index]._id
            }
            curriculum.push(temp)
        }

    }
    console.log(curriculum)
    console.log(program1);
    await Programs.update({ "_id": code }, { $set: { "curriculum": curriculum } });

    res.send(true);
});


app.get("/api/program/get/all-programs", async (req, res) => {
    try {
        var data = await Programs.find({});
        
        res.send(data);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.get("/api/course-instance/courses/get/:programID", async (req, res) => {
    try {
        let programID = req.params.programID;
        var data = await Programs.find({ _id: programID }, { curriculum: 1 });
        console.log(data);
        res.send(data);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.get("/api/create-course-instance/get-course-name/:courseID", async (req, res) => {
    try {
        let courseID = req.params.courseID;
        var data = await Courses.find({ _id: courseID }, { courseName: 1 });
        console.log(data);
        res.send(data)
    } catch (error) {
        res.sendStatus(500);
    }
});

app.post("/api/course/get/course-names", jsonParser, async (req, res) => {
    try {
        
        var coursesIDArray = req.body;
        var coursesNames = [];
        for (let index = 0; index < coursesIDArray.length; index++) {
            const courseID = coursesIDArray[index];
            
            var data = await Courses.find({ _id: courseID._id }, { courseName: 1 });
            coursesNames.push(data[0]);
         
            if (coursesIDArray.length - 1 == index) {
                res.send(coursesNames);
            }
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

app.post("/api/course-instance/get/courseInstance-names", jsonParser, async (req, res) => {
    try {
       
        console.log(req.body);
        var coursesIDArray = req.body;
        var coursesNames = [];
        for (let index = 0; index < coursesIDArray.length; index++) {
            const courseID = coursesIDArray[index];
            let instanceNames=[];
            for(let index2=0;index2<courseID.courseInstances.length;index2++){
                var data2=await CourseInstances.find({_id:courseID.courseInstances[index2]});
                instanceNames.push(data2[0]);
            }
            coursesNames.push(instanceNames)
           
            console.log(coursesNames)
            
            if (coursesIDArray.length - 1 == index) {
                res.send(coursesNames);
            }
        }
    } catch (error) {
        res.sendStatus(500);
    }
});
app.post("/api/course-instance/status/update", jsonParser, async (req, res) => {
    try {
        
       var modifiedInstances=req.body;
       let dictsize=0;
       let modifiedsize=0;
       for(var id in modifiedInstances){
           dictsize=dictsize+1;
       }
        for(var id in modifiedInstances){
            var data = await CourseInstances.update({ _id: id }, { isLive: modifiedInstances[id] });
            modifiedsize=modifiedsize+1;
            if(modifiedsize==dictsize){res.send(true)}
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

app.get("/api/user/get/mentors", async (req, res) => {
    try {
        var data = await Users.find({ 'role': 'mentor' }, { email: 1, firstName: 1, lastName: 1 });
        console.log(data);
        res.send(data);
    } catch (error) {
        res.sendStatus(500);
    }
});
app.get("/api/course/get/catalog", async (req, res) => {
    try {
        var data = await Courses.find({});
        console.log(data);
        res.send(data);
    } catch (error) {
        res.sendStatus(500);
    }
});
app.get("/api/user/get/student-list", async (req, res) => {
    try {
        var data = await Users.find({ role: "student" });
        console.log(data);
        res.send(data);
    } catch (error) {
        res.sendStatus(500);
    }
});
app.get("/api/program/get/curriculum/:program_id", async (req, res) => {
    try {
        var data = await Programs.find({ _id: req.params.program_id });
        // console.log(data)
        // console.log(data[0].curriculum.length)
        let coursesNames = [];
        for (let index = 0; index < data[0].curriculum.length; index++) {
            const courseID = data[0].curriculum[index]._id
            console.log(index)
            console.log(courseID)
            var data1 = await Courses.find({ _id: courseID }, { courseName: 1 });
            coursesNames.push(data1[0]);

            if (data[0].curriculum.length - 1 == index) {
                console.log(coursesNames);
                res.send(coursesNames);
            }
        }

    } catch (error) {
        res.sendStatus(500);
    }
});

app.post("/api/user/post/student-list/:instanceID", jsonParser, async (req, res) => {
    try {
        var data = await CourseInstances.update({ _id: req.params.instanceID }, { enrollment: req.body });
        console.log(data);
        res.send(true);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.post("/api/course/update/catalog", jsonParser, async (req, res) => {
    try {

        console.log(req.body);

        data = req.body;
        data.forEach(async (element) => {
            let temp = await Courses.findOne({ '_id': element._id })
            if (temp && element._id) {
                console.log(element)
                await Courses.update({ '_id': element._id }, { $set: { "courseID": element.courseID, "courseName": element.courseName, "courseDescription": element.courseDescription, "isAlive": element.isAlive } });
            }
            else {
                await delete element._id
                console.log(element)
                await Courses(element).save()
            }

        });

        res.send(true);

    } catch (error) {
        res.sendStatus(500);
    }
});


app.post("/api/course-instance/create", jsonParser, async (req, res) => {
    try {
        var data = req.body;
        data.isLive = true;
        data.batch = [];
        var courseInstanceObject = await CourseInstances(data).save();
        let programObject = await Programs.find({ _id: data.programID });
        console.log(programObject);
        programObject[0].curriculum.find(courseObject => courseObject._id == data.courseID).courseInstances.push(courseInstanceObject._id);
        console.log(programObject[0]);
        console.log(programObject[0].curriculum.find(courseObject => courseObject._id == data.courseID));

        await Programs.update({ '_id': data.programID }, { $set: programObject[0] });
        res.send({"_id":courseInstanceObject._id,"courseInstanceLabel":courseInstanceObject.courseInstanceLabel});
    } catch (error) {
        console.log(error);
    }
});

app.post("/api/course-instance/update/batch/:courseInstanceID", upload.array("csv[]", 2), async (req, res) => {
    let courseInstanceID = req.params.courseInstanceID;
    let data = {
        invalidData: [],
        validData: [],
    };
    let tasks = [];
    let mentors = {};
    let students = {};
    let errorFlag = false;
    let batch = [];
    let mentorsArray = await Users.find({ 'role': 'mentor' }, { 'email': 1 });
    mentorsArray.forEach(mentor => {
        mentors[mentor.email] = mentor._id;
    });
    // console.log(mentors);
    let studentsArray = await Users.find({ 'role': 'student' }, { 'email': 1 });
    studentsArray.forEach(student => {
        students[student.email] = student._id;
    });
    // console.log(students);
    fs.createReadStream(req.files[0].path)
        .pipe(csv())
        .on('data', (row) => {
            tasks.push(row);
        })
        .on('end', async () => {
            console.log('CSV file successfully processed');
            for (let index = 0; index < tasks.length; index++) {
                const row = tasks[index];
                // console.log(row.Name);
                let user = await Users.findOne({ 'email': row.studentEmail });

                // console.log(user);
                if (user) {
                    if (row.mentorEmail in mentors) {
                        row.Status = "success";
                        data.validData.push(row);
                        let index = batch.findIndex(mentor => mentor.mentorID == mentors[row.mentorEmail]);
                        if (index === -1) batch.push({ "mentorID": mentors[row.mentorEmail], "studentsID": [students[row.studentEmail]] });
                        else batch[index].studentsID.push(students[row.studentEmail]);
                    }
                    else {
                        row.Status = "Mentor not found"
                        data.invalidData.push(row);
                        errorFlag = true;
                    }
                }
                else {
                    row.Status = "Student not found";
                    data.invalidData.push(row);
                    errorFlag = true;
                }
                if (index == tasks.length - 1) {
                    if (errorFlag) data.result = false;
                    else data.result = true;
                    console.log(batch);
                    console.log(courseInstanceID);

                    await CourseInstances.update({ '_id': courseInstanceID }, { 'batches': batch });
                    res.send(data);
                }
            }
        });
})

app.get("/api/user/read/verify-admin/?token", jsonParser, async (req, res) => {

    try {
        let tok=req.query.token;
       
        var decoded = jwt.verify(tok, publicKEY, verifyOptions);
        console.log(decoded)
        var userId = await Users.findOne({ "email": decoded.email });

        if (userId.role != "admin") {
            res.send(403)
        }
        console.log(req.params.token);
        res.send(true);
    } catch (error) {
        res.sendStatus(500);
    }
});



app.listen(3000, (req, res) => {
    console.log('Server running on port: ' + 3000);
});

// module.exports = inviteSchema;
