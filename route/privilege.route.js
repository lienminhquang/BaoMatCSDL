let express = require('express');
let router = express.Router();

module.exports = router;

let controller = require('../controller/privilege.controller');

router.get('sys/list', controller.getListSysPrivileges);