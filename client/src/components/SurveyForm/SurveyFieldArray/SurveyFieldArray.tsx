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
            {props.form.errors[props.name] &&
                !Array.isArray(props.form.errors[props.name]) && (
                    <p className={styles.error}>{props.form.errors[props.name]}</p>
                )}
            {props.form.values[props.name].map((value, index) => {
                let inputClass = [styles.input];

                if (
                    Array.isArray(props.form.touched[props.name]) &&
                    props.form.touched[props.name]![index] &&
                    Array.isArray(props.form.errors[props.name]) &&
                    props.form.errors[props.name][index]
                ) {
                    inputClass = [...inputClass, styles.inputError];
                }

                return (
                    <div className={styles.inputField} key={`${props.name}${index}`}>
                        <Field name={`${props.name}.${index}`} className={inputClass.join(' ')} />
                        <MinusButton
                            type="button"
                            className={styles.minusButton}
                            onClick={() => {
                                props.remove(index);
                            }}
                        />
                        {Array.isArray(props.form.touched[props.name]) &&
                            props.form.touched[props.name]![index] &&
                            Array.isArray(props.form.errors[props.name]) && (
                                <p className={styles.error}>{props.form.errors[props.name][index]}</p>
                            )}
                    </div>
                );
            })}
        </div>
    );
};

SurveyFieldArray.defaultProps = {};
