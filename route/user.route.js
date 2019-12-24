let express = require('express')
let router = express.Router();

module.exports = router;

let controller = require('../controller/user.controller');

router.get('/listusers', controller.listUsers);
router.get('/userdetail/:username', controller.userDetail);
router.get('/createuser', controller.createUser);
router.post('/createuser', controller.createUserPost);