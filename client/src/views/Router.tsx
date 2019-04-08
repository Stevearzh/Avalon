import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';

import Home from 'src/views/Home';

interface Props extends RouteComponentProps {}

class Router extends React.Component<Props> {
  private redirectHome = () => <Redirect to="/home" />;

  public render() {
    return (
      <Switch>
        <Route exact={true} path="/" render={this.redirectHome} />
        <Route exact={true} path="/home" component={Home} />
        <Route path="/home/:channel" component={Home} />
      </Switch>
    );
  }
}

export default withRouter<Props>(Router);
