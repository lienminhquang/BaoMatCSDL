let db = require('../db');
let oracledb = db.oracledb;

module.exports.getList_SYS_PRIVS = async (config) =>
{
    let result = await db.executeCommand(config, `SELECT * FROM USER_SYS_PRIVS`, {});
   
    result = result.rows;

    list = [];

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

module.exports.getList_profiles = async (config) =>
{
    let result;
    try {
        result = await db.executeCommand(config, `SELECT DISTINCT PROFILE FROM DBA_PROFILES`, {});
        result = result.rows;
    } catch (error) {
        console.log("ERROR: " + error);
    }

    if (!result) result = ['DEFAULT'];

    return result;
};

module.exports.createProfile = async(config, profile)=>
{
    let query_create_profile = 
    `
    create PROFILE `+ profile.nameprofile +` limit
    SESSIONS_PER_USER ` + profile.sessions_per_user +` 
    CONNECT_TIME ` + profile.connect_time +` 
    IDLE_TIME ` + profile.idle_time +` 
    `;

    let result;
    try {
        
        result = await db.executeCommand(config, query_create_profile, {});
    } catch (error) {
        throw error;
    }
    
    return result;
};

module.exports.getProfileDetail = async (config, profile_name) =>
{
    let sessions_per_user;
    let connect_time;
    let idle_time;

    try {
        sessions_per_user = await db.executeCommand(config, `SELECT LIMIT FROM DBA_PROFILES WHERE profile=:profile_name and resource_name=:resource_name`,
        {
            profile_name: profile_name,
            resource_name: 'SESSIONS_PER_USER'
        });
        connect_time = await db.executeCommand(config, `SELECT LIMIT FROM DBA_PROFILES WHERE profile=:profile_name and resource_name=:resource_name`,
        {
            profile_name: profile_name,
            resource_name: 'CONNECT_TIME'
        });
        idle_time = await db.executeCommand(config, `SELECT LIMIT FROM DBA_PROFILES WHERE profile=:profile_name and resource_name=:resource_name`,
        {
            profile_name: profile_name,
            resource_name: 'IDLE_TIME'
        });
    } catch (error) {
        throw error;
    }
    
    let profile = {
        profile: profile_name,
        sessions_per_user: sessions_per_user.rows[0][0],
        connect_time: connect_time.rows[0][0],
        idle_time: idle_time.rows[0][0]
    };

    return profile;
};

module.exports.alterProfile = async (config, profile) =>
{
    let result;
    try {
        let query = 
        `ALTER PROFILE ` + profile.profile + ` LIMIT 
        SESSIONS_PER_USER ` + profile.sessions_per_user +` 
        CONNECT_TIME ` + profile.connect_time +` 
        IDLE_TIME ` + profile.idle_time +` 
        `
        result = await db.executeCommand(config, query, {});
        
    } catch (error) {
        throw error;
    }

   

    return result;
};

module.exports.deleteProfile = async (config, profile_name) =>
{
    let result;
    try {
        let query = 
        `DROP PROFILE `+ profile_name +` `;
        result = await db.executeCommand(config, query, {});
        
    } catch (error) {
        throw error;
    }

    return result;
};
