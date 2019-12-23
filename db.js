const oracledb = require('oracledb');
const dbConfig = require('./config/database');

module.exports.oracledb = oracledb;

module.exports.simpleExecute = function simpleExecute(config, statement, binds = [], opts = {}) {
    oracledb.getConnection(config, function(err, conn){
        if(err) return console.log(err);
        conn.execute(statement, binds, opts, (err, rs)=>{
            if(err) return console.log(err);
            return console.log(rs.rows);
        })
    });
};

module.exports.login = function login(username, password, callback)
{
    oracledb.getConnection({
        user: username,
        password: password,
        connectString: "192.168.117.128:1521/orclpdb.localdomain"
    }, callback);
}

