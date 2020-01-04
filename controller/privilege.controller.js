let privilegeModel = require('../model/privilege.model');


module.exports.getListSysPrivileges = async (req, res) => {

    let e = req.query.e;
    let errors = [];
    if (e) {
        errors.push(e);
    }

    let list;

    try {
        list = await privilegeModel.getList_SYS_PRIVS(res.locals.config);
    } catch (error) {
        errors.push(error + '');
        res.render('privileges/sys/list', { errors: errors });
        return;
    }

    res.render('privileges/sys/list', { list: list, errors: errors });
};

module.exports.getListTabPrivileges = async (req, res) => {
    let e = req.query.e;
    let errors = [];
    if (e) {
        errors.push(e);
    }

    let list;

    try {
        list = await privilegeModel.getList_TAB_PRIVS(res.locals.config);
    } catch (error) {
        errors.push(error + '');
        res.render('privileges/tab/list', { errors: errors });
        return;
    }

    res.render('privileges/tab/list', { list: list, errors: errors });
};

module.exports.grantSysPrivilege = async (req, res) => {
    
    let e = req.query.e;
    let errors = [];
    if (e) {
        errors.push(e);
    }

    let privs = [];
    try {
        privs = await privilegeModel.sys_privileges_to_grant(res.locals.config);
    } catch (error) {
        errors.push(error + '');
    }
    

    res.render('privileges/sys/grant', {errors: errors , privileges: privs});
};

module.exports.grantSysPrivilegePost = async (req, res) => {
    let privilege = req.body.privilege;
    let object = req.body.object;
    let grantable = req.body.grantable;



    let result;

    try {
        result = await privilegeModel.grantSysPrivilege(res.locals.config, privilege, object, grantable);
    } catch (error) {

        res.redirect('/privileges/sys/grant?e=' + encodeURIComponent(error + '') + '');
        return;
    }

    res.redirect('/privileges/sys/grant?e=' + encodeURIComponent('Grant succeeded.') + '');
};

module.exports.grantTabPrivilegePost = async (req, res) => {
    let privilege = req.body;
    
    let object = req.body.object;

    let result;

    try {
        result = await privilegeModel.grantTabPrivilege(res.locals.config, privilege, object);
    } catch (error) {

        res.redirect('/privileges/tab/grant?e=' + encodeURIComponent(error + '') + '');
        return;
    }

    res.redirect('/privileges/tab/grant?e=' + encodeURIComponent('Grant succeeded.') + '');
};

module.exports.revokeTabPrivilege = async(req, res)=>
{
    let priv = req.query.priv;
    let table_name = req.query.table_name;
    let grantee = req.query.grantee;

    let result;
    try {
        result = await privilegeModel.revokeTabPrivilege(res.locals.config, priv, table_name, grantee);
    } catch (error) {
        
        res.redirect('/privileges/tab/list?e=' + encodeURIComponent(error + ''));
        return;
    }

    
    res.redirect('/privileges/tab/list?e=' + encodeURIComponent('Revoke succeeded.'))
};


module.exports.grantTabPrivilege = async (req, res)=>
{
    let priv = req.params.privilege;
    let e = req.query.e;
    let errors = [];
    if (e) {
        errors.push(e);
    }

    let privs = [];
    try {
        privs = await privilegeModel.tab_privileges_to_grant(res.locals.config);
    } catch (error) {
        errors.push(error + '');
    }
    

    res.render('privileges/tab/grant', { privilege: priv, errors: errors , privileges: privs});
};

module.exports.revokeSysPrivilege = async (req, res)=>
{
    let priv = req.query.priv;
    let username = req.query.username;
    console.log(req.query);

    let result;
    try {
        result = await privilegeModel.revokeSysPrivilege(res.locals.config, priv, username);
    } catch (error) {
        
        res.redirect('/privileges/sys/list?e=' + encodeURIComponent(error + ''));
        return;
    }

    
    res.redirect('/privileges/sys/list?e=' + encodeURIComponent('Revoke succeeded.'))

};



module.exports.getListColPrivileges = async (req, res) => {

    let e = req.query.e;
    let errors = [];
    if (e) {
        errors.push(e);
    }

    let list;

    try {
        list = await privilegeModel.getList_COL_PRIVS(res.locals.config);
    } catch (error) {
        errors.push(error + '');
        res.render('privileges/col/list', { errors: errors });
        return;
    }

    res.render('privileges/col/list', { list: list, errors: errors });
};



module.exports.revokeColPrivilege = async (req, res)=>
{
    let priv = req.query;

    let result;
    try {
        result = await privilegeModel.revokeColPrivilege(res.locals.config, priv);
    } catch (error) {
        
        res.redirect('/privileges/col/list?e=' + encodeURIComponent(error + ''));
        return;
    }

    
    res.redirect('/privileges/col/list?e=' + encodeURIComponent('Revoke succeeded.'));

};


module.exports.grantColPrivilege = async (req, res)=>
{
    let e = req.query.e;
    let errors = [];
    if (e) {
        errors.push(e);
    }
    let columns;
    try {
        columns = await privilegeModel.listcolumnNameOfUsers(res.locals.config);
    } catch (error) {
        errors.push(errors + '');
        res.render('privileges/col/grant', { errors: errors, columns: columns });
        return;
    }


    res.render('privileges/col/grant', { errors: errors, columns: columns });
};

module.exports.grantColPrivilegePost = async (req, res) => {
    let privilege = req.body;
    //console.log(privilege);
    let result;

    try {
        result = await privilegeModel.grantColPrivilege(res.locals.config, privilege);
    } catch (error) {

        res.redirect('/privileges/col/grant?e=' + encodeURIComponent(error + '') + '');
        return;
    }

    res.redirect('/privileges/col/grant?e=' + encodeURIComponent('Grant succeeded.') + '');
};