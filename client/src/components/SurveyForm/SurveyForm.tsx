import * as React from 'react';
import { FormikProps, Form, Field, withFormik, FieldArray } from 'formik';
import { SurveyField } from './SurveyField/SurveyField';
import * as yup from 'yup';
import { Button } from 'my-react-story';
import * as styles from './SurveyForm.css';
import { RouterButton } from 'my-react-story';
import { SurveyFieldArray } from './SurveyFieldArray/SurveyFieldArray';

const fields: { name: string; label: string; value: string | string[] }[] = [
    {
        name: 'title',
        label: 'Campaign Title',
        value: ''
    },
    {
        name: 'subject',
        label: 'Subject Line',
        value: ''
    },
    {
        name: 'emailBody',
        label: 'Email Body',
        value: ''
    },
    {
        name: 'recipients',
        label: 'Recipient List',
        value: ['']
    }
];

interface SurveyFormProps extends React.HtmlHTMLAttributes<{}> {}

interface SurveyFormValue {}

const SurveyInnerForm: React.SFC<FormikProps<SurveyFormValue>> = (props: FormikProps<SurveyFormValue>) => {
    const { isSubmitting } = props;

    const fieldsEl = fields.map(field => {
        return (
            (typeof field.value === 'string' && (
                <Field key={field.label} name={field.name} label={field.label} component={SurveyField} />
            )) ||
            (Array.isArray(field.value) && (
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

export const SurveyForm = withFormik<SurveyFormProps, SurveyFormValue>({
    mapPropsToValues: props => {
        let values = {};
        fields.forEach(field => {
            values[field.name] = field.value;
        });
        // tslint:disable-next-line:no-console
        console.log(values);
        return values;
    },
    validationSchema: yup.object().shape({
        title: yup.string().required('this field is required'),
        subject: yup.string().required('this field is required'),
        emailBody: yup.string().required('this field is required'),
        recipients: yup.string().required('this field is required')
    }),
    handleSubmit: (values: SurveyFormValue, { setSubmitting }) => {
        // tslint:disable-next-line:no-console
        console.log(values);
        setSubmitting(false);
    }
})(SurveyInnerForm);
