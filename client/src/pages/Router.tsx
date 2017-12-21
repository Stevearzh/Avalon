import * as React from 'react';
import { Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { RootState, Dispatch } from '@src/redux';
import { actionCreators } from '@src/redux/channel';

import Home from './Home';

interface Props extends RouteComponentProps<{}> {}

interface StateProps {}

interface DispatchProps {
  fetchList: typeof actionCreators.fetchList;
}

interface State {}

const mapStateToProps = (state: RootState): StateProps => ({});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators({ fetchList: actionCreators.fetchList }, dispatch);

class Router extends React.Component<Props & StateProps & DispatchProps, State> {
  async componentDidMount () {
    await this.props.fetchList();    
  }

  render() {
    return (
      <div className="App">        
        <Route exact={true} path="/" component={Home}/>
        <Route path="/home" render={() => <Redirect to="/"/>}/>
      </div>
    );
  }
}

// React Router 4 (beta 8) won't render components if using redux connect
// https://github.com/ReactTraining/react-router/issues/4671
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Router));
