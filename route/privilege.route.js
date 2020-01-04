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

router.get('/col/list', controller.getListColPrivileges);
router.get('/col/revoke', controller.revokeColPrivilege);
router.get('/col/grant', controller.grantColPrivilege);
router.post('/col/grant', controller.grantColPrivilegePost);
