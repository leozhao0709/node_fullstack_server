import * as React from 'react';
import { FormikProps, Form, Field, withFormik } from 'formik';
import { SurveyField } from './SurverField/SurveyField';

interface SurveyFormProps extends React.HtmlHTMLAttributes<{}> {}

interface SuveryFormValue {}

const SurveyInnerForm: React.SFC<FormikProps<SuveryFormValue>> = (props: FormikProps<SuveryFormValue>) => {
    const { isSubmitting } = props;
    return (
        <Form>
            <Field name="title" label="label" type="email" component={SurveyField} />
            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </Form>
    );
};

export const SurveyForm = withFormik<SurveyFormProps, SuveryFormValue>({
    mapPropsToValues: props => {
        return { title: '' };
    },
    handleSubmit: (values: SuveryFormValue, { setSubmitting }) => {
        // tslint:disable-next-line:no-console
        console.log(values);
        setSubmitting(false);
    }
})(SurveyInnerForm);
