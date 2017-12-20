import * as React from 'react';
import { Provider } from 'react-redux';
import { Router as ContainerRouter } from 'react-router-dom';

import store, { history } from '@src/store';
import Router from './Router';

export class App extends React.Component<{}> {
  render () {
    return (
      <Provider store={store}>
        <ContainerRouter history={history}>
          <Router/>
        </ContainerRouter>
      </Provider>
    );
  }
}

export default App;
