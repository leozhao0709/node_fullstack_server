import * as express from 'express';
import * as bodyParser from 'body-parser';
import { environment } from './environment/environment';
import { usersApi } from './api/usersApi';
import { googleOauth } from './oauth/google';

const port = process.env.PORT || environment.PORT;

export const app = express();

app.use(bodyParser.json());

// oauth
app.use('/auth/google', googleOauth);

// api
app.use('/users', usersApi);

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is up on ${port}`);
});