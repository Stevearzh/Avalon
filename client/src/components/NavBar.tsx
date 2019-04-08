import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';
import * as React from 'react';

const styles = {
  'nav-bar': {
    flexGrow: 1,
  },
  'menu-button': {
    marginLeft: -12,
    marginRight: 20,
  },
};

export interface Props extends WithStyles<typeof styles> {}

class NavBar extends React.Component<Props> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes['nav-bar']}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes['menu-button']} color="inherit" aria-label="Menu">
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit">
              IRC Logs
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
