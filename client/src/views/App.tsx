import { default as DateFnsUtils } from '@date-io/date-fns';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router as ContainerRouter } from 'react-router-dom';

import NavBar from '@components/NavBar';
import store, { history } from '@src/store';
import Router from '@views/Router';

const themeCreater = (theme: 'light' | 'dark') =>
  createMuiTheme({
    palette: {
      type: theme,
    },
  });

interface Props {}

interface State {
  theme: 'light' | 'dark';
}

export class App extends React.Component<Props, State> {
  public state: State = { theme: 'light' };

  private handleThemeChange = () =>
    this.setState({
      theme: this.state.theme === 'light' ? 'dark' : 'light',
    }); // tslint:disable-line:semicolon

  public render() {
    const { theme } = this.state;
    const backgroundColor = theme === 'light' ? '#fff' : '#4f4f4f';

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Provider store={store}>
          <ContainerRouter history={history}>
            <MuiThemeProvider theme={themeCreater(theme)}>
              <div className="app" id="app" style={{ backgroundColor }}>
                <NavBar theme={theme} onThemeChange={this.handleThemeChange} />
                <div className="app-content">
                  <Router />
                </div>
              </div>
            </MuiThemeProvider>
          </ContainerRouter>
        </Provider>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
