import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Menu from '@material-ui/icons/Menu';
import ModeComment from '@material-ui/icons/ModeComment';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators as channelActionCreators, State as Channel } from '@models/channel';
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
  'select-bar': {
    width: '8em',
    color: 'white',
    marginRight: '1.5em',
    marginLeft: '0.5em',

    '&:before': {
      borderColor: 'white',
    },

    '&:hover:before': {
      borderColor: 'white !important',
    },

    '& svg': {
      color: 'white !important',
      marginTop: '-3px',
    },

    '& > div > div': {
      marginTop: '-6px',
    },
  },
};

export interface Props extends WithStyles<StyleRules> {}

interface StateProps {
  channel: Channel;
}

interface DispatchProps {
  selectChannel: typeof channelActionCreators.selectChannel;
  fetchChannelList: typeof channelActionCreators.fetchList;
}

const mapStateToProps = (state: RootState): StateProps => ({
  channel: state.channel,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      selectChannel: channelActionCreators.selectChannel,
      fetchChannelList: channelActionCreators.fetchList,
    },
    dispatch,
  );

class NavBar extends React.Component<Props & StateProps & DispatchProps> {
  public async componentDidMount() {
    await this.props.fetchChannelList();
  }

  private handleChannelChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    this.props.selectChannel(event.target.value); // tslint:disable-line:semicolon

  public render() {
    const { classes, channel } = this.props;
    const channelList = (channel && channel.list) || [];

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
            <Typography variant="h6" color="inherit" className={classes['nav-items']}>
              <ModeComment />
              <Select
                value={(channel && channel.choosen) || ''}
                onChange={this.handleChannelChange}
                inputProps={{ name: 'channel', id: 'channel-select' }}
                className={classes['select-bar']}
              >
                {channelList.map((ch: string, i: number) => (
                  <MenuItem value={ch} key={i}>
                    <em>{ch}</em>
                  </MenuItem>
                ))}
              </Select>
              <CalendarToday />
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(NavBar));
