import { Router } from 'express';
import { Survey } from '../models/Survey';
import { sendSurveyEmail } from '../services/mail';
import { authRequire } from '../middleware/authRequire';
import { creditsRequire } from '../middleware/creditsRequire';

export const surveyApi = Router();

surveyApi.get('/', (_, res) => {
    res.send('Thanks for voting!');
});

surveyApi.post('/', authRequire, creditsRequire, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.map((recipient: string) => ({ email: recipient })),
        _user: req.user!.id
    });

    sendSurveyEmail(survey)
        .then(() => {
            return survey.save();
        })
        .then(() => {
            req.user!.credits -= 1;
            return req.user!.save();
        })
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.status(422).send(err);
        })
        ;
});
