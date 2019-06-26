const path = require('path');
const routes = require('express').Router();

routes.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/../../dist/lms/index.html'));
});

module.exports = routes;