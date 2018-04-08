import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Landing from './containers/Landing/Landing';
import Dashboard from './containers/Dashboard/Dashboard';
import Survey from './containers/Survey/Surver';
import { AuthActions } from './store/actions/authActions';
import { connect, Dispatch } from 'react-redux';
import { StoreState } from './store/store';

interface AppDispatchProps {
  fetchUser: () => void;
}

interface AppStateProps {
  currentUser: { _id: string, email: string } | null;
}

class App extends React.Component<AppDispatchProps & AppStateProps, {}> {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    let currentUser = (
      <>
        <h2>not logged in yet</h2>
      </>
    );
    if (this.props.currentUser) {
      currentUser = (
        <>
          <h2>{this.props.currentUser.email}</h2>
        </>
      );
    }

    return (
      <Layout>
        {currentUser}
        <BrowserRouter>
          <Switch>
            <Route path="/surveys" exact component={Survey} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/" exact component={Landing} />
            <Route render={() => <h1>Not found</h1>} />
          </Switch>
        </BrowserRouter>
      </Layout>
    );
  }
}

const mapState = (storeState: StoreState): AppStateProps => {
  return {
    currentUser: storeState.auth.user!
  };
};

const mapDispatch = (dispatch: Dispatch<StoreState>): AppDispatchProps => {
  return {
    fetchUser: () => dispatch(AuthActions.fetch_user())
  };
};

export default connect(mapState, mapDispatch)(App);
