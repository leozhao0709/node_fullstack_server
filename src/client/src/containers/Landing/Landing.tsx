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
            <div>
                <h1>Landing...</h1>
            </div>
        );
    }
}

export default Landing;