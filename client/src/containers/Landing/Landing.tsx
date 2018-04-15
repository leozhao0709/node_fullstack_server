import * as React from 'react';

interface LandingProps {
}

interface LandingState {
}

class Landing extends React.Component<LandingProps, LandingState> {

    static defaultProps: LandingProps = {
    };

    state: LandingState = {
    };

    render() {
        return (
            <div style={{ textAlign: 'center', fontSize: '2.5rem' }} >
                <h1>Emaily!</h1>
                Collecy your feed back from your users
        </div>
        );
    }
}

export default Landing;