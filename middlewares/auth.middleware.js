var db = module.require('../db');
let config = module.require('../config/database');
let userModel = module.require('../model/user.model');

module.exports.requireAuth = async function(req, res, next)
{
    
    if(!req.signedCookies.username || !req.signedCookies.password)
    {
        res.redirect('/auth/login');
        return;
    }
    console.log('USER_NAME_COOKIE: ' + req.signedCookies.username);
  
    // let result = await db.executeCommand(config.admin, 
    //     `select * from users where username = :username`, 
    //     { username: req.signedCookies.username });


    let isValidUser = userModel.isValidUser(req.signedCookies.username, req.signedCookies.password);
    if(isValidUser == false)
    {
        res.redirect('/auth/login');
        return;
    }
    
    res.locals.config = {
        user: req.signedCookies.username,
        password: req.signedCookies.password,
        connectString: "192.168.117.128:1521/orclpdb.localdomain"
    };

    next();
};