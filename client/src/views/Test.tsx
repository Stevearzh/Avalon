import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';
import * as React from 'react';

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

interface Props extends WithStyles<typeof styles> {}

class App extends React.Component<Props> {
  public render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <Menu />
              </IconButton>
              <Typography variant="h6" color="inherit">
                Material UI
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button variant="contained" color="primary">
          Hello, world!
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(App);
