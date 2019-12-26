let oracledb = require('../db');
let userModel = require('../model/user.model');

module.exports.listUsers = async (req, res) => {
    let result = await userModel.getListUsers(
        res.locals.config
    );

    if (!result) {
        let errors = ["You do not have permition !"];
        res.render('users/listusers', {
            errors: errors
        });

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
        users
    });
}

module.exports.userDetail = async (req, res) => {
    let username = req.params.username;
    console.log('View user detail: ' + username);

    let user = await userModel.getUserByUsername(
        res.locals.config,
        username
    );

    user = user.rows[0];
    user = {
        username: user[0],
        email: user[1],
        name: user[2],
        address: user[3]
    };

    res.render('users/userdetail', {
        user
    });
};

module.exports.createUser = function (req, res) {

    res.render('users/createuser', {

    })
};

module.exports.createUserPost = async function (req, res) {

    let result;
    let errors = [];
    try{
        result = await userModel.createUser(res.locals.config, req.body);
    }
    catch(e)
    {
        console.log(e);

        errors.push(e + '');
        res.render('users/createuser', {
            errors: errors
        });
        return;
    }
    
    
    if(result.rowsAffected == 1)
    {
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

    let errors = [];
    if(deleted)
    {
        errors.push("Deleted user " + username);
    }
    else 
    {
        errors.push("Cannot delete user " + username);
    }

    res.redirect('/users/listusers');
};

