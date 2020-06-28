const passport = require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport to use google strategy
passport.use(new googleStrategy({
        clientID: "abc",
        clientSecret: "abc",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, done){
        //find user and verify if he is present or not
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('error in google strategy passport',err);
                return;
            }

            console.log(accessToken, refreshToken);
            console.log(profile);

            if(user){
                //if found, set the user as req.user
                return done(null, user);
            }
            else{
                //if not found, create the user and set it as req.user
                User.create({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')             
                }, function(err, user){
                    if(err){
                        console.log('error in creating user',err);
                        return;
                    }

                    return done(null, user);
                })
            }
        });
    }
));

module.exports=passport;