var express = require('express');
var router = express.Router();

module.exports = router;
var controller = require('../controller/auth.controller');

router.get('/login', controller.login);
router.post('/login', controller.loginPost);
