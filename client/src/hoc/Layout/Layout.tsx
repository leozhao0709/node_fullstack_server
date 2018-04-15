import * as React from 'react';
import Navigation from '../../components/UI/Navigation/Navigation';
import { Dispatch, connect } from 'react-redux';
import { userActions } from '../../store/actions/userActions';
import { StoreState } from '../../store/store';
import { withRouter } from 'react-router';

interface LayoutDispatchProps {
    fetchUser: () => void;
}

interface LayoutStateProps {
    user?: { _id: string, email: string, credits: number } | null;
}

class Layout extends React.Component<LayoutDispatchProps & LayoutStateProps, {}> {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <>
                <Navigation user={this.props.user} />
                {this.props.children}
            </>
        );
    }
}

const mapState = (storeState: StoreState): LayoutStateProps => {
    return {
        user: storeState.auth.user
    };
};

const mapDispatch = (dispatch: Dispatch<StoreState>): LayoutDispatchProps => {
    return {
        fetchUser: () => dispatch(userActions.fetch_user())
    };
};

// tslint:disable-next-line:no-any
export default withRouter(connect(mapState, mapDispatch)(Layout) as any);