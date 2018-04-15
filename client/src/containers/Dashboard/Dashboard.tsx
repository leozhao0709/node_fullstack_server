import * as React from 'react';

interface DashboardProps {
}

interface DashboardState {
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {

    static defaultProps: DashboardProps = {
    };

    state: DashboardState = {
    };

    render() {
        return (
            <div>
                <h1>Dashboard...</h1>
            </div>
        );
    }
}

export default Dashboard;