import * as React from 'react';
import * as styles from './Navigation.css';
import { Link } from 'react-router-dom';
import NavigationItems from './NavigationItems/NavigationItems';

interface NavigationProps {
    user?: { _id: string, email: string, credits: number } | null;
}

const Navigation: React.SFC<NavigationProps> = (props: NavigationProps) => {

    let loggedInOut = (<></>);
    if (props.user) {
        loggedInOut = (
            <>
                <a href="/auth/google/logout" >Logged Out</a>
            </>
        );
    } else if (props.user === null) {
        loggedInOut = (
            <>
                <a href="/auth/google" >Logged In</a>
            </>
        );
    }

    return (
        <nav className={styles.navigation} >
            <div className={styles.logo}>
                <Link
                    to={props.user ? '/dashboard' : '/'}
                    className={styles.logoLink}
                >
                    Emaily
                </Link>
            </div>
            <div className={styles.items} >
                <NavigationItems
                    userCredits={props.user ? props.user.credits : 0}
                />
            </div>
            <div className={styles.auth} >
                {loggedInOut}
            </div>
        </nav>
    );
};

Navigation.defaultProps = {
};

export default Navigation;