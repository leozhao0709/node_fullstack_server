import * as React from 'react';
import * as styles from './Dashboard.css';
import { RouterProps } from 'react-router';
import { AddButton } from 'my-react-story';

interface DashboardProps extends RouterProps {}

interface DashboardState {}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
    state: DashboardState = {};

    addButtonClickHandler = () => {
        this.props.history.push('/survey');
    };

    render() {
        return (
            <div className={styles.dashboard}>
                <h1>Dashboard...</h1>
                <AddButton className={styles.addButton} onClick={this.addButtonClickHandler} />
            </div>
        );
    }
}

export default Dashboard;
