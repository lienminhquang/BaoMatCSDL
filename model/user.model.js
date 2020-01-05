let db = require('../db');
let oracledb = db.oracledb;

module.exports.getListUsers = async (config) => {
    let users;
    try {
        users = await db.executeCommand(config, 'select * from user_manager.users', {});
    }
    catch (err) {
        console.log(err + '');
    }

    return users;
};

module.exports.getUserByUsername = async (config, username) => {
    let user;
    try {
        user = await db.executeCommand(config, `select * from user_manager.users where username=:username`, { username: username });
    }
    catch (err) {
        console.log(err + '');
    }
    return user;
};

module.exports.isValidUser = async (username, password) => {
    let conn;
    try {
        conn = await db.oracledb.getConnection({
            user: username,
            password: password,
            connectString: "192.168.117.129:1521/orclpdb.localdomain"
        });
    }
    catch (e) {
        console.log(e + '');
        return false;
    }

    if (conn) return true;
    return false;
};

module.exports.deleteUser = async (config, username_delete) => {
    let result;
    try {
        result = await db.executeCommand(config, `delete from user_manager.users where username=:username`, { username: username_delete });
        let query_delete_user = `drop user ` + username_delete + ` `;
        await db.executeCommand(config, query_delete_user, {});
    }
    catch (e) {
        console.log(e);
        return false;
    }

    if (result) {
        console.log(result);
        return true;
    }

    return false;
};

module.exports.createUser = async (config, user) => {
    let result;
    let connection;

    try {
        connection = await oracledb.getConnection(config);
    } catch (error) {
        console.log(error);
        throw new Error("Cannot create connection");
    }


    try {
        result = await connection.execute(`insert into user_manager.users values(:username, :email, :name, :address)`,
            { username: user.username, email: user.email, name: user.name, address: user.address },
            { autoCommit: false }
        );

        let query_create =
            `
        create user ` + user.username + ` identified by ` + user.password + `  
        DEFAULT TABLESPACE `+ user.defaultablespace + ` 
        QUOTA `+ user.quota + ` ON ` + user.defaultablespace + ` 
        TEMPORARY TABLESPACE `+ user.temptablespace + ` 
        PROFILE `+ user.profile + ` 
        ACCOUNT `+ user.account + ` 
        `;

        await connection.execute(query_create, {}, { autoCommit: false });

        // if (user.privileges) {
        //     if (typeof (user.privileges) == 'string') {
        //         let query_grant_priv = `GRANT ` + user.privileges + ` TO ` + user.username + ` `;
        //         console.log(query_grant_priv);
        //         await connection.execute(query_grant_priv, {}, {autoCommit: false});
        //     }
        //     else {
        //         for (let i = 0; i < user.privileges.length; i++) {
        //             let query_grant_priv = `GRANT ` + user.privileges[i] + ` TO ` + user.username + ` `;
        //             console.log(query_grant_priv);
        //             await connection.execute(query_grant_priv, {}, {autoCommit: false});
        //         }
        //     }
        // }
    }
    catch (e) {
        console.log(e);
        let error = await connection.rollback();
        console.log("RollBack error:" + error);
        await connection.close();
        throw new Error("Cannot create user!");
    }

    await connection.commit();
    await connection.close();

    return result;
};

module.exports.alterUser = async (config, user) => {
    let result;

    try {
        result = await db.executeCommand(config, `
        update user_manager.users 
        set 
        email=:email, 
        name=:name, 
        address=:address
        where username=:username `,
            { username: user.username, email: user.email, name: user.name, address: user.address }
        );

        let query =
            `
        alter user ` + user.username + ` identified by ` + user.password + `  
        DEFAULT TABLESPACE `+ user.defaultablespace + ` 
        QUOTA `+ user.quota + ` ON ` + user.defaultablespace + ` 
        TEMPORARY TABLESPACE `+ user.temptablespace + ` 
        PROFILE `+ user.profile + ` 
        ACCOUNT `+ user.account + `  
        `;
        console.log(query);
        await db.executeCommand(config, query, {});

    } catch (error) {
        throw error;
    }

    return result;
};

