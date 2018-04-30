import * as React from 'react';
import { SurveyForm } from '../../components/SurveyForm/SurveyForm';
import * as styles from './Survey.css';

interface SurveyProps {}

interface SurveyState {}

class Survey extends React.Component<SurveyProps, SurveyState> {
    static defaultProps: SurveyProps = {};

    state: SurveyState = {};

    render() {
        return (
            <div className={styles.survey}>
                <SurveyForm />
            </div>
        );
    }
}

export default Survey;
