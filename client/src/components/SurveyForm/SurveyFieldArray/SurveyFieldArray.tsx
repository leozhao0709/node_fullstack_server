import * as React from 'react';
import { ArrayHelpers, FormikProps, Field } from 'formik';
import { AddButton, MinusButton } from 'my-react-story';
import * as styles from './SurveyFieldArray.css';

interface FieldArrayProps extends ArrayHelpers {
    form: FormikProps<any>;
    name: string;
}

interface SurveyFieldArrayProps extends FieldArrayProps {
    label: string;
}

export const SurveyFieldArray: React.SFC<SurveyFieldArrayProps> = props => {
    return (
        <div className={styles.surveyFieldArray}>
            <label className={styles.label}>{props.label}</label>
            <AddButton
                type="button"
                onClick={() => {
                    props.push('');
                }}
                className={styles.addButton}
            />
            <br />
            {props.form.values[props.name].map((value, index) => (
                <div className={styles.inputField} key={`${props.name}${index}`}>
                    <Field name={`${props.name}.${index}`} className={styles.input} />
                    <MinusButton
                        type="button"
                        className={styles.minusButton}
                        onClick={() => {
                            props.remove(index);
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

SurveyFieldArray.defaultProps = {};
