import * as React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import * as styles from './NavigationItems.css';

interface NavigationItemsProps {
}

const NavigationItems: React.SFC<NavigationItemsProps> = (props: NavigationItemsProps) => {
    return (
        <div className={styles.navigationItems} >
            <ul>
                <NavigationItem name="Surveys" link="/surveys" />
                <NavigationItem name="Dashboard" link="/dashboard" />
            </ul>
        </div>
    );
};

NavigationItems.defaultProps = {
};

export default NavigationItems;