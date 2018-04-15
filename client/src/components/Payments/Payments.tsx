import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreState } from '../../store/store';
import StripeCheckout from 'react-stripe-checkout';
import * as styles from './Payments.css';
import { userActions } from '../../store/actions/userActions';

interface PaymentsStateProps {
}

interface PaymentsDispatchProps {
    payCredits: (token) => void;
}

class Payments extends React.Component<PaymentsStateProps & PaymentsDispatchProps> {

    render() {
        return (
            <div className={styles.payments} >
                <StripeCheckout
                    name="Emaily"
                    description="$5 for 5 email credits"
                    amount={500}
                    token={(token) => {
                        this.props.payCredits(token);
                    }}
                    stripeKey={process.env.REACT_APP_STRIPE_KEY!}
                >
                    <button className={styles.btn} >Add Credits</button>
                </StripeCheckout>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<StoreState>): PaymentsDispatchProps => {
    return {
        payCredits: (token) => dispatch(userActions.add_credits(token))
    };
};

export default connect(null, mapDispatchToProps)(Payments);