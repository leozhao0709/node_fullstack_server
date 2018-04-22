import * as React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Landing from './containers/Landing/Landing';
import Dashboard from './containers/Dashboard/Dashboard';
import Survey from './containers/Survey/Surver';
import { StoreState } from './store/store';
import { connect } from 'react-redux';

interface AppDispatchProps {

}

interface AppStateProps {
  user?: { _id: string, email: string, credits: number } | null;
}

class App extends React.Component<AppDispatchProps & AppStateProps, {}> {

  render() {
    let homeRoute = <Route path="/" exact component={Landing} />;

    if (this.props.user) {
      homeRoute = <Redirect from="/" to="/dashboard" />;
    }

    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/survey" exact component={Survey} />
            <Route path="/dashboard" exact component={Dashboard} />
            {homeRoute}
            <Route render={() => <h1>Not found</h1>} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateProps = (storeState: StoreState): AppStateProps => {
  return {
    user: storeState.auth.user
  };
};

export default connect(mapStateProps)(App);
