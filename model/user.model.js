let db = require('../db');
let oracledb = db.oracledb;

module.exports.getListUsers = async (config)=>{
    let users;
    try {
        users = await db.executeCommand(config, 'select * from users', {});
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
        user = await db.executeCommand(config, `select * from users where username=:username`, {username: username});
    }
    catch(err)
    {
        console.log(err + '');
    }
    return user;
};
