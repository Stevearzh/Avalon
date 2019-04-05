import * as React from 'react';
import { Redirect, Route, RouteComponentProps, withRouter } from 'react-router-dom';

import Test from 'src/views/Test';

interface Props extends RouteComponentProps {}

class Router extends React.Component<Props> {
  private redirectHome = () => <Redirect to="/home"/>;

  public render() {
    return (
      <div className="App">        
        <Route exact={true} path="/" render={this.redirectHome}/>
        <Route exact={true} path="/home" component={Test} />
        <Route path="/home/:channel" component={Test} />
      </div>
    );
  }
}

export default withRouter<Props>(Router);
