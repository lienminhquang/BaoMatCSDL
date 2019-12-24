let express = require('express');
let router = express.Router();

module.exports = router;

let controller = require('../controller/profile.controller');

router.get('/listprofiles', controller.listProfiles);
router.get('/createprofile', controller.createProfile);