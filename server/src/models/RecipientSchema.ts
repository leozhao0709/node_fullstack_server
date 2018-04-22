import mongoose from '../db/mongoose';
import * as Validator from 'validator';

export interface IRecipient {
    email: string;
    respond?: boolean;
}

export const RecipientSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: Validator.isEmail
    },
    responded: {
        type: Boolean,
        default: false
    }
});