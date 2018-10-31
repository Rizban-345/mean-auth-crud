const { ExtractJwt, Strategy } = require('passport-jwt');
const { User }      = require('../models');
const env = process.env.NODE_ENV || 'development';
const authConfig = require(__dirname + '/../config/config.js')[env].auth;
const {to}          = require('../services/util.service');

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = authConfig.jwt_encryption;

    passport.use(new Strategy(opts, async function(jwt_payload, done){
        let err, user;
        [err, user] = await to(User.findById(jwt_payload.id));

        if(err) return done(err, false);
        if(user) {
            return done(null, user);
        }else{
            return done(null, false);
        }
    }));
}