import * as passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { environment } from '../environment/environment';
import { Router } from 'express';
import { User, UserSource, IUser } from '../models/User';

export const googleOauth = Router();

passport.serializeUser((user: IUser, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            if (!user) {
                done(null, undefined);
            }
            done(null, user!);
        })
        .catch(err => done(err));
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || environment.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || environment.GOOGLE_CLIENT_SECRET,
    callbackURL: environment.GOOGLE_CALL_BACK_URL,
    passReqToCallback: true
}, (_0, _1, _2, profile, done) => {
    const { id, email } = profile;

    User.findOne({ googleId: id })
        .then(exisingUser => {
            if (!exisingUser) {
                const user = new User({ email, googleId: id, source: UserSource.GOOGLE_OAUTH });
                user.save()
                    .then(doc => done(null, doc))
                    .catch(err => done(err));
            }

            done(null, exisingUser);
        })
        .catch(err => {
            done(err);
        })
        ;
}
));

googleOauth.get('/', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

googleOauth.get('/callback', passport.authenticate('google'));

googleOauth.get('/current_user', (req, res) => {
    // res.send(req.session);
    res.send(req.user);
});

googleOauth.get('/logout', (req, res) => {
    req.logout();
    res.send(req.user);
});