import * as React from 'react';
import { Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';

import Home from './Home';

interface Props extends RouteComponentProps<{}> {}

interface State {}

class Router extends React.Component<Props, State> {
  render() {
    return (
      <div className="App">        
        <Route exact={true} path="/" render={() => <Redirect to="/home"/>}/>
        <Route exact={true} path="/home" component={Home} />
        <Route path="/home/:channel" component={Home} />
      </div>
    );
  }
}

export default withRouter<Props>(Router);
