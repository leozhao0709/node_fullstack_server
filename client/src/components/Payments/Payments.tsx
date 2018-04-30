import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreState } from '../../store/store';
import StripeCheckout from 'react-stripe-checkout';
import { userActions } from '../../store/actions/userActions';
import { Button } from 'my-react-story';

interface PaymentsStateProps {}

interface PaymentsDispatchProps {
    payCredits: (token) => void;
}

class Payments extends React.Component<PaymentsStateProps & PaymentsDispatchProps> {
    render() {
        return (
            <div>
                <StripeCheckout
                    name="Emaily"
                    description="$5 for 5 email credits"
                    amount={500}
                    token={token => {
                        this.props.payCredits(token);
                    }}
                    stripeKey={process.env.REACT_APP_STRIPE_KEY!}
                >
                    <Button text="Add Credits" />
                </StripeCheckout>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<StoreState>): PaymentsDispatchProps => {
    return {
        payCredits: token => dispatch(userActions.add_credits(token))
    };
};

export default connect(null, mapDispatchToProps)(Payments);
