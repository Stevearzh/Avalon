import { default as DateFnsUtils } from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router as ContainerRouter } from 'react-router-dom';

import NavBar from '@components/NavBar';
import store, { history } from '@src/store';
import Router from '@views/Router';

export class App extends React.Component {
  public render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
