let privilegeModel = require('../model/privilege.model');


module.exports.getListSysPrivileges = async (req, res)=>
{
    let list;

    try {
        list = await privilegeModel.getList_SYS_PRIVS(res.locals.config);
    } catch (error) {
        res.render('sys/list', {errors: [error + '']});
        return;    
    }

    res.render('sys/list', {list: list});
};