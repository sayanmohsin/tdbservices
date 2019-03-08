const router = require('express').Router();
const passport = require('passport');
require('../../configs/passport.config')(passport);
const jwt = require('jsonwebtoken');
const secretConfigs = require('../../configs/secrets.config');
var refreshTokensDir = [];

//auth admin jwt
router.post('/login', function (req, res, next) {
    passport.authenticate('adminsLocalStrategy', {session: false}, (err, admin, info) => {
        if (err || !admin) {
            return res.status(400).json({
                message: 'Something is not right',
                admin   : admin
            });
        }
       req.login(admin, {session: false}, (err) => {
        if (err) {
            res.send(err);
        }
        const accessToken = jwt.sign({data: admin}, secretConfigs.tokenSecret, {expiresIn: secretConfigs.tokenLife});
        const refreshToken = jwt.sign({data: admin}, secretConfigs.refreshTokenSecret, {expiresIn: secretConfigs.refreshTokenLife});
        refreshTokensDir[refreshToken] = admin;
           return res.json({admin, accessToken, refreshToken});
        });
    })(req, res);
});

//reissue token
router.post('/tokens', function (req, res, next) {
    var refreshToken = req.body.refreshToken;
    try{
        var decoded = jwt.verify(refreshToken, secretConfigs.refreshTokenSecret);
        if(refreshTokensDir[refreshToken]){
            var admin = refreshTokensDir[refreshToken];
            const accessToken = jwt.sign({data: admin}, secretConfigs.tokenSecret, {expiresIn: secretConfigs.tokenLife});
            return res.json({admin, accessToken});
        }else{
            throw new Error('What?');
        }
    }catch(err) {
        res.status(401).send(err.message);
    }
});

module.exports = router;
