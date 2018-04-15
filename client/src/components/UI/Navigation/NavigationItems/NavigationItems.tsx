import * as React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import * as styles from './NavigationItems.css';

interface NavigationItemsProps {
}

const NavigationItems: React.SFC<NavigationItemsProps> = (props: NavigationItemsProps) => {
    return (
        <ul className={styles.navigationItems} >
            <NavigationItem name="Surveys" link="/surveys" />
            <NavigationItem name="Dashboard" link="/dashboard" />
        </ul>
    );
};

NavigationItems.defaultProps = {
};

export default NavigationItems;