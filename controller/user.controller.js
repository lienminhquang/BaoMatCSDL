let oracledb = require('../db');
let userModel = require('../model/user.model');

module.exports.listUsers = async (req, res) =>
{
    let result = await userModel.getListUsers(
        {
            user: "USER_MANAGER",
            password: "123",
            connectString: "192.168.117.128:1521/orclpdb.localdomain"
        }
    );
    
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
    
    console.log(users);

    res.render('users/listusers',{
        users
    });
}

module.exports.userDetail = async (req, res) => 
{
    let username = req.params.username;
    console.log('View user detail: ' + username);

    let user = await userModel.getUserByUsername(
        {
            user: "USER_MANAGER",
            password: "123",
            connectString: "192.168.117.128:1521/orclpdb.localdomain"
        },
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