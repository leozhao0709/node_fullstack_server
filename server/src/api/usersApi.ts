import { Router } from 'express';
import { User, IUser } from '../models/User';
import { authRequire } from '../middleware/authRequire';

export const usersApi = Router();

usersApi.post('/', (req, res) => {
    const { email, password, source } = req.body;

    const user = new User({ email, password, source });

    user.generateAuthToken()
        .then(token => {
            res.header('x-auth', token).send(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

usersApi.get('/me', authRequire, (req, res) => {
    res.send(req.user);
});

usersApi.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findByCrediential(email, password)
        .then(user => {
            return user.generateAuthToken().then(token => {
                res.header('x-auth', token).send(user);
            });
        })
        .catch(_ => {
            res.status(400).send();
        });
});

usersApi.delete('/me/token', authRequire, (req, res) => {
    (<IUser>req.user!).removeToken(req.params.token).then(() => {
        res.status(200).send();
    }).catch(_ => {
        res.status(400).send();
    });
});
