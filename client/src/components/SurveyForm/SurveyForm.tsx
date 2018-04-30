import * as React from 'react';
import { FormikProps, Form, Field, withFormik } from 'formik';
import { SurveyField } from './SurverField/SurveyField';
import * as yup from 'yup';
import { Button } from 'my-react-story';
import * as styles from './SurveyForm.css';
import { Link } from 'react-router-dom';

const fields: { name: string; label: string; value: string }[] = [
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
        value: ''
    }
];

interface SurveyFormProps extends React.HtmlHTMLAttributes<{}> {}

interface SurveyFormValue {}

const SurveyInnerForm: React.SFC<FormikProps<SurveyFormValue>> = (props: FormikProps<SurveyFormValue>) => {
    const { isSubmitting } = props;
    const fieldsEl = fields.map(field => (
        <Field key={field.label} name={field.name} label={field.label} component={SurveyField} />
    ));

    return (
        <Form className={styles.surveyForm}>
            {fieldsEl}
            <Link to="/dashboard" className={[styles.button, styles.cancel].join(' ')}>
                Cancel
            </Link>
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
        return values;
    },
    validationSchema: yup.object().shape({
        title: yup.string().required('this field is required')
    }),
    handleSubmit: (values: SurveyFormValue, { setSubmitting }) => {
        // tslint:disable-next-line:no-console
        console.log(values);
        setSubmitting(false);
    }
})(SurveyInnerForm);
