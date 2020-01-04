let express = require('express');
let router = express.Router();

module.exports = router;

let controller = require('../controller/role.controller');

router.get('/listroles', controller.getListRoles);
router.get('/detail/:role', controller.roleDetail);
router.post('/detail', controller.roleDetailPost);
router.get('/delete/:role', controller.deleteRole);
router.get('/create', controller.createRole);
router.post('/create', controller.createRolePost);