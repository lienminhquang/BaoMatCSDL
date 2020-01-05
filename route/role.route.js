let express = require('express');
let router = express.Router();

module.exports = router;

let controller = require('../controller/role.controller');

router.get('/list', controller.getListRoles);
router.get('/detail/:role', controller.roleDetail);
router.post('/detail', controller.roleDetailPost);
router.get('/delete/:role', controller.deleteRole);
router.get('/create', controller.createRole);
router.post('/create', controller.createRolePost);

router.get('/r2r/grant', controller.grantRoleToRole);
router.post('/r2r/grant', controller.grantRoleToRolePost);

router.get('/sys/list', controller.listSysRole);
router.get('/tab/list', controller.listTabRole);

router.get('/r2r/list', controller.listRoleRole);
router.get('/r2r/revoke', controller.revokeRoleRole);

router.get('/grant', controller.grantRoleToUser);
router.post('/grant', controller.grantRoleToUserPost);
