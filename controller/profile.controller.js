let db = require('../db');
let userModel = require('../model/user.model');
let profileModel = require('../model/profile.model');

module.exports.listProfiles = async (req, res) =>
{
    let list_SYS_PRIVS = await profileModel.getList_SYS_PRIVS(res.locals.config);
    let list_TAB_PRIVS = await profileModel.getList_TAB_PRIVS(res.locals.config);
    let list_ROLE_PRIVS = await profileModel.getList_ROLE_PRIVS(res.locals.config);
    
    res.render('profiles/listprofiles',{
        list_SYS_PRIVS: list_SYS_PRIVS,
        list_TAB_PRIVS: list_TAB_PRIVS,
        list_ROLE_PRIVS: list_ROLE_PRIVS
    });
};

module.exports.createProfile = async (req, res) => 
{
    res.render('profiles/createprofile', {

    });
};