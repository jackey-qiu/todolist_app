const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function(passport, User) {
    passport.use(
        new localStrategy({ usernameField: 'user' }, (username, password, done) => {
            User.findOne({ user: username }, (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false, { message: 'The user is not registered!' });
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Fail to authenticate the user!' });
                    }
                });
            });
        })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id }, (err, user) => {
            const userInformation = {
                user: user.user,
            };
            cb(err, userInformation);
        });
    });
};