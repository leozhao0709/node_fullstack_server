import * as sgMail from '@sendgrid/mail';
import { environment } from '../environment/environment';
import { ISurvey } from '../models/Survey';

sgMail.setApiKey(environment.SENDGRID_KEY);

const surveyTemplate = (body: string) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <title>emaily</title>
    </head>
    <body>
        <div style="text-align: center">
            <h3>I'd like your input!</h3>
            <p>Please anwser the following question:</p>
            <p>${body}</p>
            <div>
                <a href="${environment.REDIRECT_DOMAIN}/surveys">Yes</a>
            </div>
            <div>
                <a href="${environment.REDIRECT_DOMAIN}/surveys">No</a>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const sendSurveyEmail = ({ subject, body, recipients }: ISurvey) => {
    const msg = {
        from: 'no-reply@emaily.com',
        to: recipients.map(recipient => recipient.email),
        subject,
        html: surveyTemplate(body),
        trackingSettings: {
            clickTracking: {
                enable: true,
            },
        }
    };

    return sgMail.send(msg);
};