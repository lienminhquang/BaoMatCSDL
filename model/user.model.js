let db = require('../db');
let oracledb = db.oracledb;

module.exports.getListUsers = async (config)=>{
    let users;
    try {
        users = await db.executeCommand(config, 'select * from user_manager.users', {});
    }
    catch(err)
    {
        console.log(err + '');
    }

    return users;
};

module.exports.getUserByUsername = async (config, username) => 
{
    let user;
    try{
        user = await db.executeCommand(config, `select * from user_manager.users where username=:username`, {username: username});
    }
    catch(err)
    {
        console.log(err + '');
    }
    return user;
};

module.exports.isValidUser = async (username, password) =>
{
    let conn;
    try{
        conn = await db.oracledb.getConnection({
            user: username,
            password: password,
            connectString: "192.168.117.128:1521/orclpdb.localdomain"
        });
    }
    catch(e)
    {
        console.log(e + '');
        return false;
    }

    if(conn) return true;
    return false;
};
