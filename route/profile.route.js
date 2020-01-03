let express = require('express');
let router = express.Router();

module.exports = router;

let controller = require('../controller/profile.controller');

router.get('/listprofiles', controller.listProfiles);
router.get('/create', controller.createProfile);
router.post('/create', controller.createProfilePost);
router.get('/detail/:profile', controller.detail);
router.post('/detail', controller.detailPost);
router.get('/delete/:profile', controller.deleteProfile);