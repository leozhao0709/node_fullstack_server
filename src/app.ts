import * as express from 'express';
import * as bodyParser from 'body-parser';
import { environment } from './environment/environment';
import { usersApi } from './api/usersApi';

const port = process.env.PORT || environment.PORT;

export const app = express();

app.use(bodyParser.json());

// api
app.use('/users', usersApi);

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is up on ${port}`);
});