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

module.exports.getList_SYS_PRIVS = async (config) =>
{
    let result;
    try {
        result = await db.executeCommand(config, `SELECT * FROM USER_SYS_PRIVS`, {});
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

module.exports.getList_TAB_PRIVS = async (config) =>
{
    let result = await db.executeCommand(config, `SELECT * FROM USER_TAB_PRIVS`, {});
   
    result = result.rows;


    list = [];

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

module.exports.getList_ROLE_PRIVS = async (config) =>
{
    let result = await db.executeCommand(config, `SELECT * FROM USER_ROLE_PRIVS`, {});
    
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