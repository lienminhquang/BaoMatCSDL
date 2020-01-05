let db = require('../db');

module.exports.getListPrivileges = async(config)=>
{
    let result;
    try {
        result = await db.executeCommand(config, `SELECT DISTINCT PROFILE FROM DBA_PROFILES`, {});
        result = result.rows;
    } catch (error) {
        throw error;
    }



    return result;
};

module.exports.getList_SYS_PRIVS = async (config, username) =>
{
    let result;
    try {
        if(username)
        {
            result = await db.executeCommand(
                config, 
                `SELECT DBA_SYS_PRIVS.grantee, privilege, admin_option, common, inherited 
                FROM DBA_SYS_PRIVS, user_manager.users 
                where DBA_SYS_PRIVS.grantee = UPPER(:username)
                and DBA_SYS_PRIVS.grantee = UPPER(user_manager.users.username)`,
                {username: username});
        }
        else
        {
            result = await db.executeCommand(
                config, 
                `SELECT DBA_SYS_PRIVS.grantee, privilege, admin_option, common, inherited 
                FROM DBA_SYS_PRIVS, user_manager.users 
                where DBA_SYS_PRIVS.grantee = UPPER(user_manager.users.username)`,
                {});
        }
    } catch (error) {
        throw error;
    }
    
   
    result = result.rows;

    let list = [];

    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        list.push({
            USERNAME: element[0],
            PRIVILEGE: element[1],
            ADMIN_OPTION: element[2],
            COMMON: element[3],
            INHERITED: element[4]
        });
    }


    return list;
};


module.exports.getList_COL_PRIVS = async (config, username) =>
{
    let result;
    try {
        if(username)
            result = await db.executeCommand(config, `SELECT * FROM USER_COL_PRIVS WHERE TABLE_NAME='USERS' AND OWNER='USER_MANAGER' AND GRANTEE=UPPER(:grantee) `,{grantee: username});
        else
            result = await db.executeCommand(config, `SELECT * FROM USER_COL_PRIVS WHERE TABLE_NAME='USERS' AND OWNER='USER_MANAGER'`,{});

        
    } catch (error) {
        console.log(username);
        throw error;
    }
    
   
    result = result.rows;
    

    let list = [];

    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        list.push({
            GRANTEE: element[0],
            OWNER: element[1],
            TABLE_NAME: element[2],
            COLUMN_NAME: element[3],
            GRANTOR: element[4],
            PRIVILEGE: element[5],
            GRANTABLE: element[6],
            COMMON: element[7],
            INHERITED: element[8]
        });
    }


    return list;
};

//list all privs of users has tab privs on users
module.exports.getList_TAB_PRIVS = async (config, username) =>
{
    let result;

    try {
        if(username)
            result = await db.executeCommand(config, `SELECT * FROM USER_TAB_PRIVS WHERE TABLE_NAME='USERS' AND OWNER='USER_MANAGER' AND GRANTEE=UPPER(:username)`, {username:username}); 
        else
            result = await db.executeCommand(config, `SELECT * FROM USER_TAB_PRIVS WHERE TABLE_NAME='USERS' AND OWNER='USER_MANAGER'`, {});
        result = result.rows;
    } catch (error) {
        throw error;
    }
    
    let list = [];

    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        list.push({
            GRANTEE: element[0],
            OWNER: element[1],
            TABLE_NAME: element[2],
            GRANTOR: element[3],
            PRIVILEGE: element[4],
            GRANTABLE: element[5],
            HIERARCHY: element[6],
            COMMON: element[7],
            TYPE: element[8],
            INHERITED: element[9]
        });
    }


    return list;
};

module.exports.getList_ROLE_PRIVS = async (config, username) =>
{
    let result;
    if(username)
         result = await db.executeCommand(config, `SELECT * FROM USER_ROLE_PRIVS WHERE USERNAME=UPPER(:username)`, {username: username});
    else
         result = await db.executeCommand(config, `SELECT * FROM USER_ROLE_PRIVS`, {});


    result = result.rows;


    list = [];

    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        list.push({
            USERNAME: element[0],
            GRANTED_ROLE: element[1],
            ADMIN_OPTION: element[2],
            DELEGATE_OPTION: element[3],
            DEFAULT_ROLE: element[4],
            OS_GRANTED: element[5],
            COMMON: element[6],
            INHERITED: element[7]
        });
    }


    return list;
};

module.exports.grantSysPrivilege = async(config, privilege, object, grantable)=>
{
    let result;
    try {
        if(grantable == 'YES')
        {
            query = `GRANT ` + privilege + ` TO ` + object + ` WITH ADMIN OPTION`;
        }
        else
        {
            query = `GRANT ` + privilege + ` TO ` + object + ` `;
        }
        
        result = await db.executeCommand(config, query, {});
    } catch (error) {
        throw error;
    }
    
   return result;
};

module.exports.sys_privileges_to_grant = async(config)=>
{
    let result;
    try {
        let query = `select * from user_manager.sys_privileges`;
        result = await db.executeCommand(config, query, {});
    } catch (error) {
        throw error;
    }

    result = result.rows;
    let list = [];
    for (let i = 0; i < result.length; i++) {
        list.push({name: result[i][1], needtocheck: result[i][2]});
    }
    
   return list;
};


module.exports.tab_privileges_to_grant = async(config)=>
{
    let result;
    try {
        let query = `select * from user_manager.tab_privileges`;
        result = await db.executeCommand(config, query, {});
    } catch (error) {
        throw error;
    }

    result = result.rows;
    let list = [];
    for (let i = 0; i < result.length; i++) {
        list.push({name: result[i][1], object_name: result[i][2], needtocheck: result[i][3]});
    }
    
   return list;
};

module.exports.grantTabPrivilege = async(config, privilege, object)=>
{
    let result;
    
    try {
        let query;
        if(privilege.grantable == 'YES')
        {
            query = `GRANT ` + privilege.privilege + ` TO ` + object + ` WITH GRANT OPTION`;
        }
        else 
        {
            query = `GRANT ` + privilege.privilege + ` TO ` + object + ` `;
        }

        result = await db.executeCommand(config, query, {});
    } catch (error) {
        throw error;
    }
    
   return result;
};

module.exports.revokeSysPrivilege = async(config, priv, username)=>
{
    let result;
    try {
        let query = `REVOKE ` + priv + ` FROM ` + username + ` `;
        
        result = await db.executeCommand(config, query, {});
    } catch (error) {
        throw error;
    }
    
   return result;
};


module.exports.revokeTabPrivilege = async(config, priv, table_name, grantee)=>
{
    let result;
    try {
        let query = `REVOKE ` + priv + ` ON ` + table_name + ` FROM ` + grantee + ` `;
        
        result = await db.executeCommand(config, query, {});
    } catch (error) {
        throw error;
    }
    
   return result;
};



module.exports.revokeColPrivilege = async(config, priv)=>
{
    console.log(priv);
    let result;
    try {
        let query = `REVOKE ` + priv.priv + ` ON ` + priv.owner + `.` + priv.table_name + ` FROM ` + priv.grantee + ` `;
        console.log(query);
        result = await db.executeCommand(config, query, {});
    } catch (error) {
        throw error;
    }
    
   return result;
};

module.exports.listcolumnNameOfUsers = async(config)=>
{
    try {
        let result = await db.executeCommand(config,
        `SELECT COLUMN_NAME
        FROM dba_tab_cols 
        where table_name='USERS' and owner='USER_MANAGER'`, {});
        return result.rows;
    } catch (error) {
        throw error;
    }

    return null;
};


module.exports.grantColPrivilege = async(config, privilege)=>
{
    let result;
    
    try {
        let query;
        if(privilege.grantable == 'YES')
        {
            query = `GRANT ` + privilege.privilege + `(`+ privilege.column_name +`) ON USER_MANAGER.USERS  TO ` + privilege.object + ` WITH GRANT OPTION`;
        }
        else 
        {
            query = `GRANT ` + privilege.privilege + `(`+ privilege.column_name +`) ON USER_MANAGER.USERS  TO ` + privilege.object + ` `;
        }
        //console.log(query);
        result = await db.executeCommand(config, query, {});
    } catch (error) {
        throw error;
    }
    
   return result;
};