const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const HeaderAPIKeyStrategy = require('passport-headerapikey').HeaderAPIKeyStrategy;
var Promise = require("bluebird");
var _ = require('lodash');

/** nosql db */
const Admins = require('../models/Admins');

module.exports = function(passport) {
    passport.serializeUser((admin, done) => {
        done(null, admin._id);
    });

    passport.deserializeUser((_id, done) => {
        return Admin.findById(_id).then((admin) => {
            done(null, admin);
        });
    });

    /** 
     * authentication of admins
     * local strategy
    */
    passport.use('adminsLocalStrategy', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    function (username, password, done){
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        Admins.findOne({
            username : username,
            password : password
        })
		.then(admin => {
            if (!admin) {
                return done(null, false, {message: 'Incorrect email or password.'});
            }
            return done(null, admin, {message: 'Logged In Successfully'});
        })
        .catch(err => done(err));
    }
    ));
    /** 
     * jwt opts for user
    */
    var optsAdmins = {}
    optsAdmins.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
    optsAdmins.secretOrKey = '6QRMOCxT0Y';
    passport.use('adminsLocalStrategyJWT', new JWTStrategy(optsAdmins, function(jwt_payload, done) {
        Admins.findById(jwt_payload.data._id)
        .then(admin => {
            if (!admin) {
                return done(null, false, {message: 'Incorrect email or password.'});
            }
            return done(null, admin, {message: 'Logged In Successfully'});
        })
        .catch(err => done(err));
    }));

    /** 
     * header api strategy
    */
    passport.use('headerApiKey', new HeaderAPIKeyStrategy(
        { header: 'Authorization', prefix: 'Api-Key ' },
        false,
        function(apikey, done) {
            Admins.findOne({ apikey: apikey }, function (err, admin) {
            if (err) { return done(err); }
            if (!admin) { return done(null, false); }
            return done(null, admin);
          });
        }
    ));
};



