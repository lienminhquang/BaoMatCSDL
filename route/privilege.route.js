let express = require('express');
let router = express.Router();

module.exports = router;

let controller = require('../controller/privilege.controller');

router.get('/sys/list', controller.getListSysPrivileges);
router.get('/sys/grant', controller.grantSysPrivilege);
router.post('/sys/grant', controller.grantSysPrivilegePost);
router.get('/sys/revoke', controller.revokeSysPrivilege);

router.get('/tab/list', controller.getListTabPrivileges);
router.get('/tab/grant', controller.grantTabPrivilege);
router.post('/tab/grant', controller.grantTabPrivilegePost);
router.get('/tab/revoke', controller.revokeTabPrivilege);