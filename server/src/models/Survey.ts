import mongoose from '../db/mongoose';
import { RecipientSchema, IRecipient } from './RecipientSchema';

export interface ISurvey extends mongoose.Document {
    title: string;
    subject: string;
    body: string;
    _user: mongoose.Schema.Types.ObjectId;
    recipients: IRecipient[];
    yes?: boolean;
    no?: boolean;
    dateSent?: Date;
    lastResponed?: Date;
}

const surveySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    recipients: [RecipientSchema],
    yes: {
        type: Number,
        default: 0,
    },
    no: {
        type: Number,
        default: 0,
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateSent: {
        type: Date,
        default: Date.now()
    },
    lastResponed: {
        type: Date
    }
});

export const Survey = mongoose.model<ISurvey>('Survey', surveySchema);