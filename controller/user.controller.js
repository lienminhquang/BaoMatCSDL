let oracledb = require('../db');
let userModel = require('../model/user.model');
let profileModel = require('../model/profile.model');

module.exports.listUsers = async (req, res) => {

    let errors = [];
    let e = req.query.e;
    if (e) {
        errors.push(e);
    }
    let result;
    try {
        result = await userModel.getListUsers(res.locals.config);

    } catch (error) {
        errors.push(error + '');
        res.render('users/listusers', { errors: errors });
        return;
    }

    let users = [];
    for (let i = 0; i < result.rows.length; i++) {
        const element = result.rows[i];
        users.push({
            username: element[0],
            email: element[1],
            name: element[2],
            address: element[3]
        });
    }

    res.render('users/listusers', {
        users, errors: errors
    });
}

module.exports.userDetail = async (req, res) => {
    let username = req.params.username;
    let user;
    let profile;
    let profiles;
    let account_status;

    let errors = [];
    let e = req.query.e;
    if (e) {
        errors.push(e);
    }

    try {
        user = await userModel.getUserByUsername(
            res.locals.config,
            username
        );
        profile = await profileModel.getProfileOfUser(res.locals.config, username);
        profiles = await profileModel.getList_profiles(res.locals.config);
        account_status = await userModel.getAccoutStatus(res.locals.config, username);

    } catch (error) {
        console.log(error);
        errors.push(error + '');

    }


    //console.log(user);
    if (user) {
        user = user.rows[0];
        user = {
            username: user[0],
            email: user[1],
            name: user[2],
            address: user[3],
            account_status: account_status
        };
    }

    res.render('users/userdetail', {
        user: user, profile: profile[0], profiles: profiles, errors: errors
    });
};

module.exports.createUser = async function (req, res) {

    let listProfiles;
    let errors = [];
    try {
        listProfiles = await profileModel.getList_profiles(res.locals.config);
    } catch (error) {
        console.log(error);
        errors.push(error + '');
    }


    res.render('users/createuser', {
        profiles: listProfiles, errors: errors
    })
};

module.exports.createUserPost = async function (req, res) {

    let result;
    let errors = [];
    try {
        result = await userModel.createUser(res.locals.config, req.body);
    }
    catch (e) {
        console.log(e);

        errors.push(e + '');
        res.render('users/createuser', {
            errors: errors
        });
        return;
    }


    if (result.rowsAffected == 1) {
        errors.push("Created user " + req.body.name);
    }
    else {
        errors.push("Cannot create user");
    }

    res.render('users/createuser', {
        errors: errors
    });
};

module.exports.deleteUser = async function (req, res) {
    let username = req.params.username;

    let deleted = userModel.deleteUser(res.locals.config, username);

    let errors;
    if (deleted) {
        errors = "Deleted user " + username;
    }
    else {
        errors = "Cannot delete user " + username;
    }

    res.redirect('/users/listusers?e=' + encodeURIComponent(errors));
};

module.exports.alterUserPost = async function (req, res) {
    let result;
    let errors = [];
    try {
        result = await userModel.alterUser(res.locals.config, req.body);
    }
    catch (e) {
        console.log(e);

        errors.push(e + '');
        res.redirect('/users/userdetail/' + req.body.username + "?e=" + encodeURIComponent(e + ''));
        return;
    }


    res.redirect('/users/userdetail/' + req.body.username + '?e=' + encodeURIComponent('Alter successed.'));
};

