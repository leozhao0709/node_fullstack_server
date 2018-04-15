import * as React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Landing from './containers/Landing/Landing';
import Dashboard from './containers/Dashboard/Dashboard';
import Survey from './containers/Survey/Surver';

interface AppDispatchProps {

}

interface AppStateProps {
}

class App extends React.Component<AppDispatchProps & AppStateProps, {}> {

  render() {
    return (
      <BrowserRouter>
        <Layout>
          {/* <Switch> */}
          <Route path="/surveys" exact component={Survey} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/" exact component={Landing} />
          {/* <Route render={() => <h1>Not found</h1>} /> */}
          {/* </Switch> */}
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
