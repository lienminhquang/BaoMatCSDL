let db = require('../db');
let userModel = require('../model/user.model');
let profileModel = require('../model/profile.model');

module.exports.listProfiles = async (req, res) => {
    let list_profiles = await profileModel.getList_profiles(res.locals.config);
    console.log(list_profiles);

    res.render('profiles/listprofiles', {profiles: list_profiles});
};


// module.exports.listProfiles = async (req, res) => {
//     let list_SYS_PRIVS = await profileModel.getList_SYS_PRIVS(res.locals.config);
//     let list_TAB_PRIVS = await profileModel.getList_TAB_PRIVS(res.locals.config);
//     let list_ROLE_PRIVS = await profileModel.getList_ROLE_PRIVS(res.locals.config);

//     res.render('profiles/listprofiles', {
//         list_SYS_PRIVS: list_SYS_PRIVS,
//         list_TAB_PRIVS: list_TAB_PRIVS,
//         list_ROLE_PRIVS: list_ROLE_PRIVS
//     });
// };

module.exports.createProfile = async (req, res) => {
    res.render('profiles/create', {

    });
};

module.exports.createProfilePost = async (req, res) => {
    let profile = req.body;
    let result;
    let errors = [];

    try {
        result = await profileModel.createProfile(res.locals.config, profile);
    } catch (error) {
        console.log('' + error);
        errors.push(error + '');
    }
    
    if(result) errors.push("Created profile");

    res.render('profiles/create', {
        errors: errors
    });
};

module.exports.detail = async (req, res) =>
{
    let profile_name = req.params.profile;
    let profile;
    let errors = [];

    try {
        profile = await profileModel.getProfileDetail(res.locals.config, profile_name);
    } catch (error) {
        errors.push(error + '');
        res.render('profiles/detail', {
            errors: [error + '']
        });
        return;
    }

    console.log(profile);

    res.render('profiles/detail', {
        profile: profile
    });

};

module.exports.detailPost = async (req, res)=>
{
    let profile = req.body;

    try {
        await profileModel.alterProfile(res.locals.config, profile);
    } catch (error) {
        res.render('profiles/detail', {profile: profile, errors: ["Cannot change profile", error + '']});
        return;
    }

    res.render('profiles/detail', {profile: profile, errors: ["Profile changed"]});
};

module.exports.deleteProfile = async (req, res) =>
{
    let profile_name = req.params.profile;

    try {
        await profileModel.deleteProfile(res.locals.config, profile_name);
    } catch (error) {
        let list_profiles = await profileModel.getList_profiles(res.locals.config);
        res.render('profiles/listprofiles', {profiles: list_profiles, errors: ["Cannot delete profile", error + '']});
        return;
    }

    let list_profiles = await profileModel.getList_profiles(res.locals.config);
    res.render('profiles/listprofiles', {profiles: list_profiles, errors: ["Profile deleted"]});
};