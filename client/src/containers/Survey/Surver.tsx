import * as React from 'react';
import { SurveyForm, SurveyFormValue } from '../../components/SurveyForm/SurveyForm';
import * as styles from './Survey.css';
import { SurveyFormReview } from '../../components/SurveyForm/SurveyFormReview/SurveyFormReview';
import { Dispatch, connect } from 'react-redux';
import { StoreState } from '../../store/store';
import { SurveyActions } from '../../store/actions/surveyActions';
import { RouterProps } from 'react-router';

interface SurveyProps extends RouterProps {}

interface SurveyDispatchProps {
    sendSurvey: (values) => void;
}

interface SurveyState {
    showSurveyReview: boolean;
}

class Survey extends React.Component<SurveyProps & SurveyDispatchProps, SurveyState> {
    state: SurveyState = {
        showSurveyReview: false
    };

    private _values: SurveyFormValue;

    onFormSubmit = (values: SurveyFormValue) => {
        this._values = values;
        this.setState({ showSurveyReview: true });
    };

    onSendSurvey = () => {
        this.props.sendSurvey(this._values);
        this.props.history.replace('/dashboard');
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

const mapDispatchToProps = (dispatch: Dispatch<StoreState>): SurveyDispatchProps => {
    return {
        sendSurvey: values => dispatch(SurveyActions.sendSurvey(values))
    };
};

export default connect(null, mapDispatchToProps)(Survey);
