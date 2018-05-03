import * as React from 'react';
import { ArrayHelpers, FormikProps, Field } from 'formik';
import { AddButton } from 'my-react-story';

interface FieldArrayProps extends ArrayHelpers {
    form: FormikProps<any>;
    name: string;
}

interface SurveyFieldArrayProps extends FieldArrayProps {
    label: string;
    value: string[];
}

export const SurveyFieldArray: React.SFC<SurveyFieldArrayProps> = props => {
    return (
        <div>
            <label>{props.label}</label>
            <AddButton
                type="button"
                onClick={e => {
                    props.push('aaa');
                }}
            />
            {props.form.values[props.name].map((element, index) => (
                <Field key={`${props.name}${index}`} name={`${props.name}${index}`} />
            ))}
        </div>
    );
};

SurveyFieldArray.defaultProps = {};
