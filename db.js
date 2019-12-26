const oracledb = require('oracledb');
const dbConfig = require('./config/database');

module.exports.oracledb = oracledb;

module.exports.simpleExecute = function simpleExecute(config, statement, binds = [], opts = {}, callback) {
    oracledb.getConnection(config, function(err, conn){
        if(err) return console.log(err);
        conn.execute(statement, binds, opts, (err, rs)=>{
            if(err) return console.log(err);
            return console.log(rs.rows);
        })
        conn.close(err => console.log(err+''));
    });
};


module.exports.login = function login(username, password, callback)
{
    oracledb.getConnection({
        user: username,
        password: password,
        connectString: "192.168.117.129:1521/orclpdb.localdomain"
    }, callback);
}

module.exports.executeCommand = async (config, command, parameters)=>{
    let conn = await oracledb.getConnection(config);
    let result = await conn.execute(command, parameters, {autoCommit: true});
    conn.close();
    return result;
};



