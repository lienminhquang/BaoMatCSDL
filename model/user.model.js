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
            connectString: "192.168.117.129:1521/orclpdb.localdomain"
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

module.exports.deleteUser = async (config, username_delete) => 
{
    let result;
    try{
        result = await db.executeCommand(config, `delete from user_manager.users where username=:username`, {username: username_delete});
    }
    catch(e)
    {
        console.log(e);
        return false;
    }

    if(result)
    {
        console.log(result);
        return true;
    }

    return false;
};

module.exports.createUser = async (config, user) => {
    let result;
    try{
        result = await db.executeCommand(
            config, 
            `insert into user_manager.users values(:username, :email, :name, :address)`,
            {username: user.username, email: user.email, name: user.name, address: user.address}
        );
        
        await db.executeCommand(
            config,
            `create user :username identifed by :password`,
            {username: user.username, password: user.password}
        );
        await db.executeCommand(
            config,
            `grant connect to :username`,
            {username: user.username}
        );
    }
    catch(e)
    {
        console.log(e);
        throw new Error("Cannot create user!");
    }

    return result;
};
