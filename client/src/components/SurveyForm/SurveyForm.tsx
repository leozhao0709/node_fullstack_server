import * as React from 'react';
import { FormikProps, Form, Field, withFormik, FieldArray } from 'formik';
import { SurveyField } from './SurveyField/SurveyField';
import * as yup from 'yup';
import { Button } from 'my-react-story';
import * as styles from './SurveyForm.css';
import { RouterButton } from 'my-react-story';
import { SurveyFieldArray } from './SurveyFieldArray/SurveyFieldArray';

export const surveyFields: { name: string; label: string; defaultValue: string | string[] }[] = [
    {
        name: 'title',
        label: 'Campaign Title',
        defaultValue: ''
    },
    {
        name: 'subject',
        label: 'Subject Line',
        defaultValue: ''
    },
    {
        name: 'body',
        label: 'Email Body',
        defaultValue: ''
    },
    {
        name: 'recipients',
        label: 'Recipient List',
        defaultValue: ['']
    }
];

export interface SurveyFormValue {
    title: string;
    subject: string;
    body: string;
    recipients: string[];
}

const SurveyInnerForm: React.SFC<FormikProps<SurveyFormValue>> = (props: FormikProps<SurveyFormValue>) => {
    const { isSubmitting } = props;

    const fieldsEl = surveyFields.map(field => {
        return (
            (typeof props.values[field.name] === 'string' && (
                <Field key={field.label} name={field.name} label={field.label} component={SurveyField} />
            )) ||
            (Array.isArray(props.values[field.name]) && (
                <FieldArray
                    key={field.label}
                    name={field.name}
                    render={fieldArrayProps => {
                        return <SurveyFieldArray label={field.label} name={field.name} {...fieldArrayProps} />;
                    }}
                />
            ))
        );
    });

    return (
        <Form className={styles.surveyForm}>
            {fieldsEl}
            <RouterButton text="Cancel" className={[styles.button, styles.cancel].join(' ')} to="/dashboard" />
            <Button
                className={[styles.button, styles.submit].join(' ')}
                text="Next"
                type="submit"
                disabled={isSubmitting}
            />
        </Form>
    );
};

interface SurveyFormProps extends React.FormHTMLAttributes<{}> {
    onFormSubmit: (values) => void;
    values?: SurveyFormValue;
}

export const SurveyForm = withFormik<SurveyFormProps, SurveyFormValue>({
    mapPropsToValues: props => {
        let values = {};
        surveyFields.forEach(field => {
            values[field.name] = (props.values && props.values[field.name]) || field.defaultValue;
        });
        return values as SurveyFormValue;
    },
    validationSchema: yup.object().shape({
        title: yup.string().required('this field is required'),
        subject: yup.string().required('this field is required'),
        body: yup.string().required('this field is required'),
        recipients: yup
            .array(
                yup
                    .string()
                    .required('must be an email')
                    .email('must be an email')
            )
            .required('must have at least one recipient')
    }),
    handleSubmit: (values: SurveyFormValue, { props, setSubmitting }) => {
        setSubmitting(false);
        props.onFormSubmit(values);
    }
})(SurveyInnerForm);
