import * as React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from './NavigationItem.css';

interface NavigationItemProps {
    name: string;
    link: string;
}

const NavigationItem: React.SFC<NavigationItemProps> = (props: NavigationItemProps) => {
    return (
        <li className={styles.navigationItem} >
            <NavLink
                to={props.link}
                exact
                activeClassName={styles.active}
            >
                {props.name}
            </NavLink>
        </li>
    );
};

NavigationItem.defaultProps = {
};

export default NavigationItem;