import * as React from 'react';

interface LayoutProps {
}

interface LayoutState {
}

class Layout extends React.Component<LayoutProps, LayoutState> {

    static defaultProps: LayoutProps = {
    };

    state: LayoutState = {
    };

    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

export default Layout;