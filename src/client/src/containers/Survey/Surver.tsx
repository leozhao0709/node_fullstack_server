import * as React from 'react';

interface SurveyProps {
}

interface SurveyState {
}

class Survey extends React.Component<SurveyProps, SurveyState> {

    static defaultProps: SurveyProps = {
    };

    state: SurveyState = {
    };

    render() {
        return (
            <div>
                <h1>New Survey...</h1>
            </div>
        );
    }
}

export default Survey;