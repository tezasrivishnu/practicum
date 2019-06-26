const mongo = require('mongoose');

var CreateCourseCatalog = new mongo.Schema({
    courseID: String,
    courseName: String,
    courseDescription: String,
    courseInstructor: [],
    isAlive: Boolean
});

Courses = mongo.model("CourseCatalog", CreateCourseCatalog, "coursecatalog");

module.exports = Courses;