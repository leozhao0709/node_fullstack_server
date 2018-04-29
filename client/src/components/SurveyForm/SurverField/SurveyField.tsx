import * as React from 'react';
import { FieldProps } from 'formik';

interface SurveyFieldProps extends FieldProps {
    label: string;
}

export const SurveyField: React.SFC<SurveyFieldProps> = ({ field, form: { touched, errors }, ...props }) => {
    return (
        <>
            <label htmlFor={props.label}>{props.label}</label>
            <input id={props.label} type="text" {...field} {...props} />
        </>
    );
};

SurveyField.defaultProps = {};
