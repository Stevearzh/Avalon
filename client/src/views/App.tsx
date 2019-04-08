import * as React from 'react';
import { Provider } from 'react-redux';
import { Router as ContainerRouter } from 'react-router-dom';

import NavBar from '@components/NavBar';
import store, { history } from '@src/store';
import Router from '@views/Router';

export class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <ContainerRouter history={history}>
          <div className="app">
            <NavBar />
            <div className="app-content">
              <Router />
            </div>
          </div>
        </ContainerRouter>
      </Provider>
    );
  }
}

export default App;
