import * as React from 'react';
import * as styles from './NavigationItems.css';
import Payments from '../../../Payments/Payments';

interface NavigationItemsProps {
    userCredits: number;
}

const NavigationItems: React.SFC<NavigationItemsProps> = (props: NavigationItemsProps) => {
    return (
        <ul className={styles.navigationItems} >
            {/* <NavigationItem name="Surveys" link="/surveys" /> */}
            {/* <NavigationItem name="Dashboard" link="/dashboard" /> */}
            <li><Payments /></li>
            <li>Credits: {props.userCredits}</li>
        </ul>
    );
};

NavigationItems.defaultProps = {
};

export default NavigationItems;