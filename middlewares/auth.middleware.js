var db = module.require('../db');

module.exports.requireAuth = function(req, res, next)
{
    
    if(!req.signedCookies.username)
    {
        res.redirect('/auth/login');
        return;
    }

    let user = 
    
    next();
};