import * as React from 'react';
import Button from 'my-react-story/src/Button/Button';

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
                <Button text="123" />
                <h1>Landing...</h1>
            </div>
        );
    }
}

export default Landing;