const { User }      = require('../models');
const validator     = require('validator');
const { to, TE }    = require('../services/util.service');

/* this is so that they can send in 3 options unique_key, email, or mobile and it will work */
const getUniqueKeyFromBody = function(body){
    let unique_key = body.unique_key;
    if(typeof unique_key==='undefined'){
        if(typeof body.email != 'undefined'){
            unique_key = body.email
        }else if(typeof body.mobile != 'undefined'){
            unique_key = body.mobile
        }else{
            unique_key = null;
        }
    }

    return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

/* Add new User */
const createUser = async (userInfo) => {
    let unique_key, auth_info, err;

    auth_info={};
    auth_info.status='create';

    unique_key = getUniqueKeyFromBody(userInfo);
    if(!unique_key) TE('An email or mobile number was not entered.');

    if(validator.isEmail(unique_key)){
        auth_info.method = 'email';
        userInfo.email = unique_key;

        [err, user] = await to(User.create(userInfo));
        if(err) TE('user already exists with that email');

        return user;

    }else if(validator.isMobilePhone(unique_key, 'any')){//checks if only mobile number was sent
        auth_info.method = 'mobile';
        userInfo.mobile = unique_key;

        [err, user] = await to(User.create(userInfo));
        if(err) TE('user already exists with that mobile number');

        return user;
    }else{
        TE('A valid email or mobile number was not entered.');
    }
}
module.exports.createUser = createUser;

/* Authenticate rquesting user's unique_key/email/mobile and password */
const authUser = async function(userInfo){//returns token
    let unique_key;
    let auth_info = {};
    auth_info.status = 'login';
    unique_key = getUniqueKeyFromBody(userInfo);

    if(!unique_key) TE('Please enter an email or mobile number to login');


    if(!userInfo.password) TE('Please enter a password to login');

    let user;
    if(validator.isEmail(unique_key)){
        auth_info.method='email';

        [err, user] = await to(User.findOne({where:{email:unique_key}}));
        if(err) TE(err.message);

    }else if(validator.isMobilePhone(unique_key, 'any')){//checks if only mobile number was sent
        auth_info.method='mobile';

        [err, user] = await to(User.findOne({where:{mobile:unique_key }}));
        if(err) TE(err.message);

    }else{
        TE('A valid email or mobile number was not entered');
    }

    if(!user) TE('Not registered');

    [err, user] = await to(user.comparePassword(userInfo.password));

    if(err) TE(err.message);

    return user;

}
module.exports.authUser = authUser;