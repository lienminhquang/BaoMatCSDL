let db = require('../db');
let oracledb = db.oracledb;

module.exports.getListRoles = async (config) => {
    let result;
    try {
        result = await db.executeCommand(config, `SELECT ROLE, PASSWORD_REQUIRED FROM DBA_ROLES`, {});
    } catch (error) {
        throw error;
    }

    result = result.rows;
    let list = [];
    for (let i = 0; i < result.length; i++) {
        list.push({ role: result[i][0], password_required: result[i][1] });
    }
    return list;
};

module.exports.roleDetail = async (config, role_name) => {
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
    return { role: result[0], password_required: result[1] };
};

module.exports.alterRole = async (config, role) => {
    try {
        if (role.password_required === 'YES') {
            let query = `ALTER ROLE ` + role.role + ` IDENTIFIED BY ` + role.password + ` `;
            return await db.executeCommand(config, query, {});
        }
        else if (role.password_required === 'NO') {
            let query = `ALTER ROLE ` + role.role + ` NOT IDENTIFIED `;
            return await db.executeCommand(config, query, {});
        }
    } catch (error) {
        throw error;
    }

    return null;

};

module.exports.dropRole = async (config, role_name) => {
    try {
        let query = `DROP ROLE ` + role_name + ` `;
        return await db.executeCommand(config, query, {});
    } catch (error) {
        throw error;
    }

    return null;
};

module.exports.grantRoleToRole = async (config, grantee, granted_role, admin_option) => {
    try {
        let query;
        if(admin_option == 'YES')
        {
            query = `GRANT ` + granted_role + ` TO ` + grantee + ` WITH ADMIN OPTION`;
        }
        else
        {
            query = `GRANT ` + granted_role + ` TO ` + grantee + ` `;
        }
        console.log(query);
        return await db.executeCommand(config, query, {});
    } catch (error) {
        throw error;
    }

    return null;
};

module.exports.createRole = async (config, role) => {
    try {

        let query;
        if (role.password_required == 'YES')
            query = `CREATE ROLE ` + role.role + ` IDENTIFIED BY ` + role.password + ` `;
        else
            query = `CREATE ROLE ` + role.role + ` `;

        return await db.executeCommand(config, query, {});

    } catch (error) {
        throw error;
    }

    return null;
};

module.exports.getROLE_SYS_PRIVS = async (config, role) => {
    let result;

    try {
        let query;
        if (role) {
            result = await db.executeCommand(
                config,
                `select *
                from role_sys_privs
                where role=:role
                order by 1`,
                { role: role });
        }
        else {
            result = await db.executeCommand(
                config,
                `select *
                from role_sys_privs
                order by 1`,
                {});
        }
        result = result.rows;
    } catch (error) {
        throw error;
    }

    let list = [];

    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        list.push({
            role: element[0],
            privilege: element[1],
            admin_option: element[2],
            common: element[3],
            inherited: element[4]
        });
    }


    return list;
};

module.exports.getROLE_TAB_PRIVS = async (config, role) => {
    let result;

    try {
        if (role) {
            result = await db.executeCommand(
                config,
                `select *
                from role_tab_privs
                where owner='USER_MANAGER' and role=:role
                order by 1`,
                { role: role });
        }
        else {
            result = await db.executeCommand(
                config,
                `select *
                from role_tab_privs
                where owner='USER_MANAGER'
                order by 1`,
                {});
        }
        result = result.rows;
    } catch (error) {
        throw error;
    }

    let list = [];

    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        list.push({
            role: element[0],
            owner: element[1],
            table_name: element[2],
            column_name: element[3],
            privilege: element[4],
            grantable: element[5],
            common: element[6],
            inherited: element[7]
        });
    }


    return list;
};

module.exports.getROLE_ROLE_PRIVS = async (config, role) => {
    let result;

    try {
        if (role) {
            result = await db.executeCommand(
                config,
                `select * from role_role_privs
                where role =:role`,
                { role: role });
        }
        else {
            result = await db.executeCommand(
                config,
                `select * from role_role_privs`,
                {});
        }

        result = result.rows;
    } catch (error) {
        throw error;
    }

    let list = [];

    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        list.push({
            role: element[0],
            granted_role: element[1],
            admin_option: element[2],
            common: element[3],
            inherited: element[4]
        });
    }


    return list;
};

module.exports.getUserAssignedToRole = async (config, role) => {
    let result;

    try {

        result = await db.executeCommand(
            config,
            `select * from dba_role_privs where granted_role=:role`,
            {role: role});

            result = result.rows;
    } catch (error) {
        throw error;
    }

    let list = [];

    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        list.push({
            grantee: element[0],
            granted_role: element[1],
            admin_option: element[2],
            delegate_option: element[3],
            default_role: element[4],
            common: element[5],
            inherited: element[6]
        });
    }


    return list;
};

module.exports.getAllRoleOfUser = async (config, username) => {
    let result;

    try {

        result = await db.executeCommand(
            config,
            `select * from dba_role_privs where grantee=UPPER(:username)`,
            {username: username});

            result = result.rows;
    } catch (error) {
        throw error;
    }

    let list = [];

    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        list.push({
            grantee: element[0],
            granted_role: element[1],
            admin_option: element[2],
            delegate_option: element[3],
            default_role: element[4],
            common: element[5],
            inherited: element[6]
        });
    }


    return list;
};

module.exports.revokeRoleToRole = async(config, grantee, granted_role)=>
{
    let result;
    try {
        let query = `REVOKE ` + granted_role + ` FROM ` + grantee + ` `;
        
        result = await db.executeCommand(config, query, {});
    } catch (error) {
        throw error;
    }
    
   return result;
};