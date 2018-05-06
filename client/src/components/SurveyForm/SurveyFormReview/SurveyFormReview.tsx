import * as React from 'react';
import { surveyFields, SurveyFormValue } from '../SurveyForm';
import * as styles from './SurveyFormReview.css';
import { Button } from 'my-react-story';

interface SurveyFormReviewProps extends React.HtmlHTMLAttributes<{}> {
    values: SurveyFormValue;
    onCancel: () => void;
    onSendSurvey: () => void;
}

export const SurveyFormReview: React.SFC<SurveyFormReviewProps> = (props: SurveyFormReviewProps) => {
    const reviewFields = surveyFields.map(surveyField => (
        <div key={surveyField.name} className={styles.fields}>
            <label className={styles.label}>{surveyField.label}</label>
            <div>
                {(typeof props.values[surveyField.name] === 'string' && props.values[surveyField.name]) ||
                    (Array.isArray(props.values[surveyField.name]) && props.values[surveyField.name].join(', '))}
            </div>
        </div>
    ));
    return (
        <div className={styles.surveyReview}>
            <h5 className={styles.title}>Please confirm your entries</h5>
            {reviewFields}

            <div className={styles.buttonGroup}>
                <Button text="BACK" onClick={props.onCancel} className={styles.cancelButton} />
                <Button text="SEND SURVEY" onClick={props.onSendSurvey} className={styles.sendSurveyButton} />
            </div>
        </div>
    );
};

SurveyFormReview.defaultProps = {};
