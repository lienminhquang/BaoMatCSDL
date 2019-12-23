var db = module.require('../db');
let config = module.require('../config/database')

module.exports.requireAuth = async function(req, res, next)
{
    
    if(!req.signedCookies.username)
    {
        res.redirect('/auth/login');
        return;
    }
    console.log('USER_NAME_COOKIE: ' + req.signedCookies.username);
  
    let result = await db.executeCommand(config.admin, 
        `select * from users where username = :username`, 
        { username: req.signedCookies.username });

    console.log(result);
    
    // ? lam sao de dang nhap vao scott
    
    next();
};