let db = require('../db');
let roleModel = require('../model/role.model');

module.exports.getListRoles = async(req, res)=>
{
    let errors = [];
    let e = req.query.e;
    if(e)
    {
        errors.push(e);
    }

    let listRole;
    try {
        listRole = await roleModel.getListRoles(res.locals.config);
    } catch (error) {
        errors.push(error + '');
        res.render('roles/listroles', {errors: errors});
        return;
    }
    res.render('roles/listroles', {roles: listRole, errors: errors});
};

module.exports.roleDetail = async(req, res)=>
{
    let errors = [];
    let e = req.query.e;
    if(e)
    {
        errors.push(e);
    }
    let role_name = req.params.role;
    let sys_priv;
    let tab_priv;
    let r2r;
    let users;

    let role;
    try {
        role = await roleModel.roleDetail(res.locals.config, role_name);
        sys_priv = await roleModel.getROLE_SYS_PRIVS(res.locals.config, role_name);
        tab_priv = await roleModel.getROLE_TAB_PRIVS(res.locals.config, role_name);
        r2r = await roleModel.getROLE_ROLE_PRIVS(res.locals.config, role_name);
        users = await roleModel.getUserAssignedToRole(res.locals.config, role_name);

    } catch (error) {
        errors.push(error + '');
        res.render('roles/detail', {errors: errors});
        return;
    }
    res.render('roles/detail', {role: role, sys_priv: sys_priv, tab_priv: tab_priv, r2r: r2r, users: users, errors: errors});
};

module.exports.roleDetailPost = async(req, res)=>
{
    let result;
    let role = req.body;

    try {
        result = await roleModel.alterRole(res.locals.config, role);
    } catch (error) {
        res.redirect('/roles/detail/' + role.role +'?e=' + encodeURIComponent(error + ''));
        return;
    }

    res.redirect('/roles/detail/' + role.role +'?e=' + encodeURIComponent('Role changed.'));
};

module.exports.deleteRole = async(req, res)=>
{
    let result;
    let role_name = req.params.role;

    try {
        result = await roleModel.dropRole(res.locals.config, role_name);
    } catch (error) {
        res.redirect('/roles/list?e='+ encodeURIComponent(error + ''));
        return;
    }

    res.redirect('/roles/list?e='+ encodeURIComponent('Deleted'));
};

module.exports.grantRoleToRole = async(req, res)=>
{
    let roles;

    let errors = [];
    let e = req.query.e;
    if(e)
    {
        errors.push(e);
    }

    try {
        roles = await roleModel.getListRoles(res.locals.config);
    } catch (error) {
        errors.push(error +'');
        res.render('roles/r2r/grant', {roles:roles, errors:errors});
        return;
    }

    res.render('roles/r2r/grant', {roles: roles, errors: errors});
};

module.exports.grantRoleToRolePost = async (req, res) => {
    let grantee = req.body.grantee;
    let granted_role = req.body.granted_role;
    let admin_option = req.body.grantable;
    

    let result;

    try {
        result = await roleModel.grantRoleToRole(res.locals.config, grantee, granted_role, admin_option);
    } catch (error) {

        res.redirect('/roles/r2r/grant?e=' + encodeURIComponent(error + '') + '');
        return;
    }

    res.redirect('/roles/r2r/grant?e=' + encodeURIComponent('Grant succeeded.') + '');
};

module.exports.createRole = async(req, res)=>
{
    let errors = [];
    let e = req.query.e;
    if(e)
    {
        errors.push(e);
    }
    let result;
    res.render('roles/create', {errors: errors});
};

module.exports.createRolePost = async(req, res)=>
{
    let errors = [];
    let e = req.query.e;
    if(e)
    {
        errors.push(e);
    }
    let result;
    let role = req.body;
    try {
        result = await roleModel.createRole(res.locals.config, role);
    } catch (error) {
        errors.push(error + '');
        res.render('roles/create', {errors: errors});
        return;
    }
    
    errors.push("Role created");
    res.render('roles/create', {errors: errors});
};

module.exports.listSysRole = async(req, res)=>
{
    let e = req.query.e;
    let errors = [];
    if (e) {
        errors.push(e);
    }

    let list;

    try {
        list = await roleModel.getROLE_SYS_PRIVS(res.locals.config);
    } catch (error) {
        errors.push(error + '');
        res.render('roles/sys/list', { errors: errors });
        return;
    }

    res.render('roles/sys/list', { list: list, errors: errors });
};

module.exports.listTabRole = async(req, res)=>
{
    let e = req.query.e;
    let errors = [];
    if (e) {
        errors.push(e);
    }

    let list;

    try {
        list = await roleModel.getROLE_TAB_PRIVS(res.locals.config);
    } catch (error) {
        errors.push(error + '');
        res.render('roles/tab/list', { errors: errors });
        return;
    }

    res.render('roles/tab/list', { list: list, errors: errors });
};

module.exports.listRoleRole = async(req, res)=>
{
    let e = req.query.e;
    let errors = [];
    if (e) {
        errors.push(e);
    }

    let list;

    try {
        list = await roleModel.getROLE_ROLE_PRIVS(res.locals.config);
    } catch (error) {
        errors.push(error + '');
        res.render('roles/r2r/list', { errors: errors });
        return;
    }

    res.render('roles/r2r/list', { list: list, errors: errors });
};

module.exports.revokeRoleRole = async(req, res)=>
{
    let source = req.query.source;
    let grantee = req.query.grantee;
    let granted_role = req.query.granted_role;
    
    let result;
    try {
        result = await roleModel.revokeRoleToRole(res.locals.config, grantee, granted_role);
    } catch (error) {
        if(source)
            res.redirect(source + '?e=' + encodeURIComponent(error + ''));
        else
            res.redirect('/roles/r2r/list?e=' + encodeURIComponent(error + ''));
        return;
    }

    if(source)
        res.redirect(source + '?e=' + encodeURIComponent('Revoke succeeded.'))
    else
        res.redirect('/roles/r2r/list?e=' + encodeURIComponent('Revoke succeeded.'))
};

module.exports.grantRoleToUser = async(req, res)=>
{
    let source = req.query.source;
    let errors = [];
    let e = req.query.e;
    if(e)
    {
        errors.push(e);
    }

    let listRole;
    try {
        listRole = await roleModel.getListRoles(res.locals.config);
    } catch (error) {
        errors.push(error + '');
        res.render('roles/grant', {errors: errors});
        return;
    }
    res.render('roles/grant', {roles: listRole, errors: errors});
};

module.exports.grantRoleToUserPost = async (req, res) => {
    let source = req.query.source;

    let grantee = req.body.grantee;
    let granted_role = req.body.granted_role;
    let admin_option = req.body.grantable;
    
    let result;

    try {
        result = await roleModel.grantRoleToRole(res.locals.config, grantee, granted_role, admin_option);
    } catch (error) {
        
        res.redirect('/roles/grant?e=' + encodeURIComponent(error + '') + '');
        return;
    }

    res.redirect('/roles/grant?e=' + encodeURIComponent('Grant succeeded.') + '');
};