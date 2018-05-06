import * as React from 'react';
import { SurveyForm, SurveyFormValue } from '../../components/SurveyForm/SurveyForm';
import * as styles from './Survey.css';
import { SurveyFormReview } from '../../components/SurveyForm/SurveyFormReview/SurveyFormReview';

interface SurveyProps {}

interface SurveyState {
    showSurveyReview: boolean;
}

class Survey extends React.Component<SurveyProps, SurveyState> {
    static defaultProps: SurveyProps = {};

    state: SurveyState = {
        showSurveyReview: false
    };

    private _values: SurveyFormValue;

    onFormSubmit = (values: SurveyFormValue) => {
        this._values = values;
        this.setState({ showSurveyReview: true });
    };

    onSendSurvey = () => {
        // tslint:disable-next-line:no-console
        console.log(this._values);
    };

    render() {
        return (
            <div className={styles.survey}>
                {!this.state.showSurveyReview && (
                    <SurveyForm onFormSubmit={values => this.onFormSubmit(values)} values={this._values} />
                )}
                {this.state.showSurveyReview && (
                    <SurveyFormReview
                        values={this._values}
                        onCancel={() => this.setState({ showSurveyReview: false })}
                        onSendSurvey={this.onSendSurvey}
                    />
                )}
            </div>
        );
    }
}

export default Survey;
