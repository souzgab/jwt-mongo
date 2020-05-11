const express = require('express');
const sessionController = require('../controllers/Session.controller')
const routes = express.Router();

routes.post('/register', sessionController.createLogin);
routes.post('/logon', sessionController.logon);

module.exports = routes;