import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CalendarToday from '@material-ui/icons/CalendarToday';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Menu from '@material-ui/icons/Menu';
import { DatePicker, MaterialUiPickersDate } from 'material-ui-pickers';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators as channelActionCreators, State as Channel } from '@models/channel';
import { actionCreators as dateActionCreators, State as DateState } from '@models/date';
import { DRAWER_WIDTH } from '@src/const';
import { Dispatch, RootState } from '@src/models';

const styles: StyleRules = {
  'nav-bar': {
    flexGrow: 1,
    position: 'fixed',
    top: 0,
    zIndex: 10,
    width: '100%',
  },
  'menu-button': {
    marginLeft: -12,
    marginRight: 20,
  },
  'nav-items': {
    display: 'flex',
    position: 'absolute',
    top: '1em',
    right: '2em',
  },
  'date-picker': {
    width: '8em',
    marginLeft: '0.5em',

    '& div:before': {
      borderColor: 'white',
    },

    '& div:hover:before': {
      borderColor: 'white !important',
    },

    '& input': {
      color: 'white',
    },
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    justifyContent: 'flex-end',
  },
};

interface Props extends WithStyles<StyleRules> {}

interface State {
  drawerOpen: boolean;
}

interface StateProps {
  channel: Channel;
  date: DateState;
}

interface DispatchProps {
  selectChannel: typeof channelActionCreators.selectChannel;
  changeCurrentDate: typeof dateActionCreators.changeCurrentDate;
}

const mapStateToProps = (state: RootState): StateProps => ({
  channel: state.channel,
  date: state.date,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      selectChannel: channelActionCreators.selectChannel,
      changeCurrentDate: dateActionCreators.changeCurrentDate,
    },
    dispatch,
  );

class NavBar extends React.Component<Props & StateProps & DispatchProps, State> {
  public state: State = { drawerOpen: false };

  private handleDateChange = (date: MaterialUiPickersDate) => this.props.changeCurrentDate(date); // tslint:disable-line:semicolon

  private handleDrawerOpen = () => this.setState({ drawerOpen: true });

  private handleDrawerClose = () => this.setState({ drawerOpen: false });

  private handleChannelSelect = (channel: string) => () => {
    this.props.selectChannel(channel);
    this.handleDrawerClose();
  }; // tslint:disable-line:semicolon

  public render() {
    const { classes, channel, date } = this.props;
    const { drawerOpen } = this.state;

    const channelList = (channel && channel.list) || [];

    const minDate = (date && date.list[0]) || new Date(0);
    const maxDate = new Date();

    const choosenDate = (date && date.choosen) || maxDate;

    return (
      <div className={classes['nav-bar']}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes['menu-button']}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleDrawerOpen}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit">
              {channel.choosen} Logs
            </Typography>
            <Typography variant="h6" color="inherit" className={classes['nav-items']}>
              <CalendarToday />
              <DatePicker
                className={classes['date-picker']}
                value={choosenDate}
                onChange={this.handleDateChange}
                disableFuture={true}
                minDate={minDate}
                maxDate={maxDate}
                showTodayButton={true}
              />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeft />
            </IconButton>
          </div>
          <Divider />
          {channelList.map((ch: string, i: number) => (
            <div key={i} onClick={channel.choosen === ch ? () => null : this.handleChannelSelect(ch)}>
              <MenuItem value={ch} selected={channel.choosen === ch}>
                <em>{ch}</em>
              </MenuItem>
            </div>
          ))}
        </Drawer>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(NavBar));
