let db = require('../db');
let oracledb = db.oracledb;

module.exports.getListRoles = async(config)=>
{
    let result;
    try {
        result = await db.executeCommand(config,`SELECT ROLE, PASSWORD_REQUIRED FROM DBA_ROLES`, {});
    } catch (error) {
        throw error;
    }

    result = result.rows;
    let list = [];
    for (let i = 0; i < result.length; i++) {
        list.push({role: result[i][0], password_required: result[i][1]});
    }
    return list;
};

module.exports.roleDetail = async(config, role_name)=>
{
    let result;
    try {
        result = await db.executeCommand(
            config, 
            `SELECT ROLE, PASSWORD_REQUIRED FROM DBA_ROLES WHERE ROLE=:role_name`, 
            { role_name: role_name });
    } catch (error) {
        throw error;
    }
    result = result.rows[0];
    return {role: result[0], password_required: result[1]};
};

module.exports.alterRole = async(config, role)=>
{
    try {
        if(role.password_required === 'YES')
        {
            let query = `ALTER ROLE ` + role.role + ` IDENTIFIED BY ` + role.password + ` `;
            return await db.executeCommand(config, query, {});
        }
        else if (role.password_required === 'NO')
        {
            let query = `ALTER ROLE ` + role.role + ` NOT IDENTIFIED `;
            return await db.executeCommand(config, query, {});
        }
    } catch (error) {
        throw error;
    }
    
    return null;

};

module.exports.dropRole = async(config, role_name)=>
{
    try {
        let query = `DROP ROLE ` + role_name + ` `;
        return await db.executeCommand(config, query, {});
    } catch (error) {
        throw error;
    }

    return null;
};

module.exports.createRole = async (config, role)=>
{
    try {

        let query;
        if(role.password_required == 'YES')
            query = `CREATE ROLE ` + role.role + ` IDENTIFIED BY ` + role.password + ` `;
        else
            query = `CREATE ROLE ` + role.role + ` `;

        return await db.executeCommand(config, query, {});

    } catch (error) {
        throw error;
    }

    return null;
};