import * as React from 'react';
import Button from 'my-react-story/src/Button';

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
                <Button
                    onClick={() => {
                        // tslint:disable-next-line:no-console
                        console.log(`aaaaa`);
                    }}

                    text="test button"
                    backgroundColor="#527785"
                />
            </div>
        );
    }
}

export default Landing;