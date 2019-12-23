
// var shortId = require('shortid');
// var md5 = require('md5');

module.exports.login = function(req, res) {
    res.render('auth/login',{
       
    } )
};

module.exports.loginPost = function(req, res) {
    // var body = req.body;
    // var users = db.get('users').find({mail: body.mail}).value();
    // if(!users)
    // {
    //     res.render('auth/login', {errors: [
    //         "Not found"
    //     ]});
    //     return;
    // }
    // if(users.password !== md5(body.password))
    // {
    //     res.render('auth/login', {errors: [
    //         "Wrong password"
    //     ]});
    //     return;
    // }
    
    // res.cookie('userId', users.id, {
    //     signed: true
    // });
    // res.redirect('/users');

    res.render('auth/login',{
       
    } )
};
