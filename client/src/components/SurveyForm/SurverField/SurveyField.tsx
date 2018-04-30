import * as React from 'react';
import { FieldProps } from 'formik';
import * as styles from './SurveyField.css';

interface SurveyFieldProps extends FieldProps {
    label: string;
}

export const SurveyField: React.SFC<SurveyFieldProps> = ({ field, form: { touched, errors }, ...props }) => {
    let labelClasses = [styles.label];
    let inputClasses = [styles.input];
    if (field.value) {
        labelClasses = [...labelClasses, styles.labelActive];
    }
    if (errors && errors[field.name]) {
        inputClasses = [...inputClasses, styles.inputError];
    }
    return (
        <div className={styles.surveyField}>
            <input className={inputClasses.join(' ')} id={props.label} type="text" {...field} {...props} />
            <label className={labelClasses.join(' ')} htmlFor={props.label}>
                {props.label}
            </label>
            {errors && errors[field.name] && <p className={styles.error}>{errors[field.name]}</p>}
        </div>
    );
};

SurveyField.defaultProps = {};
