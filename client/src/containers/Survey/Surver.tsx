import * as React from 'react';
import { SurveyForm } from '../../components/SurveyForm/SurveyForm';

interface SurveyProps {}

interface SurveyState {}

class Survey extends React.Component<SurveyProps, SurveyState> {
    static defaultProps: SurveyProps = {};

    state: SurveyState = {};

    render() {
        return (
            <div>
                <h1>New Survey...</h1>
                <SurveyForm />
            </div>
        );
    }
}

export default Survey;
