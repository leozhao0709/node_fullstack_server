import * as express from 'express';
import * as bodyParser from 'body-parser';
import { environment } from './environment/environment';
// import { usersApi } from './api/usersApi';
import { googleOauth } from './oauth/google';
import * as passport from 'passport';
import cookieSession = require('cookie-session');

const port = environment.PORT;

export const app = express();

app.use(bodyParser.json());

app.use(cookieSession({
    name: 'session',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [environment.COOKIE_KEY]
}));
app.use(passport.initialize());
app.use(passport.session());

// oauth
app.use('/auth/google', googleOauth);

// api
// app.use('/users', usersApi);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'));
}

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is up on ${port}`);
});