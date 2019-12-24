let db = require('../db');
let userModel = require('../model/user.model');

module.exports.listProfiles = async (req, res) =>
{
    res.render('profiles/listprofiles',{
        
    });
};

module.exports.createProfile = async (req, res) => 
{
    res.render('profiles/createprofile', {

    });
};