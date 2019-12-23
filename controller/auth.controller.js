const oracledb = require('../db');
// var shortId = require('shortid');
// var md5 = require('md5');

module.exports.login = function(req, res) {
    res.render('auth/login',{
       
    } )
};

module.exports.loginPost = function(req, res) {
    let user = req.body;
    oracledb.login(user.username, user.password, (err, conn)=>{
        if(err)
        {
            console.log(err+'');
            res.render('auth/login', {errors: [
                "User name or password invalid!"
            ]});
            return;
        } 
        else 
        {
            console.log("LOGIN SUCCESSED");
            res.cookie('username', user.username, {signed: true});
            res.redirect('/');
        }
    });

};

module.exports.register = function(req, res) {
    
    res.render('auth/register',{
       
    } )
};

module.exports.registerPost = function(req, res) {
    
    res.render('auth/register',{
       
    } )
};
