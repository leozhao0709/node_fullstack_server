import * as passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { environment } from '../environment/environment';
import { Router } from 'express';

export const googleOauth = Router();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || environment.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || environment.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    // tslint:disable-next-line:no-console
    console.log('access token', accessToken);
    // tslint:disable-next-line:no-console
    console.log('refresh token', refreshToken);
    // tslint:disable-next-line:no-console
    console.log('profile', profile);
}
));

googleOauth.get('/', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

googleOauth.get('/callback', passport.authenticate('google'));