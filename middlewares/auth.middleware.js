var db = module.require('../db');

module.exports.requireAuth = function(req, res, next)
{
    db.getConnection(
        {
            user: "scott",
            password: "scott",
            connectString: "192.168.117.128:1521/orclpdb.localdomain"
        },
        function(err, conn)
        {
            if(err)
            {
                return console.log(err);
            }
            conn.execute(
                "select * from dept",
                function(err, rs)
                {
                    if(err) return console.log(err);
                    console.log(rs.rows);
                }
            )
        }
    );
   
    next();
};