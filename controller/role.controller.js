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
    let role_name = req.params.role;
    let role;
    try {
        role = await roleModel.roleDetail(res.locals.config, role_name);
    } catch (error) {
        res.render('roles/detail', {errors: [error + '']});
        return;
    }
    res.render('roles/detail', {role: role});
};

module.exports.roleDetailPost = async(req, res)=>
{
    let result;
    let role = req.body;

    try {
        result = await roleModel.alterRole(res.locals.config, role);
    } catch (error) {
        res.render('roles/detail', {role: role, errors:[error + '']});
        return;
    }

    res.render('roles/detail', {role: role, errors:["Role changed"]});
};

module.exports.deleteRole = async(req, res)=>
{
    let result;
    let role_name = req.params.role;

    try {
        result = await roleModel.dropRole(res.locals.config, role_name);
    } catch (error) {
        res.redirect('/roles/listroles?e='+ encodeURIComponent(error + ''));
        return;
    }

    res.redirect('/roles/listroles?e='+ encodeURIComponent('Deleted'));
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