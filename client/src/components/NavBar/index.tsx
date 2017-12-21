import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import * as moment from 'moment';
import { DatePicker } from 'material-ui-pickers/src';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { RootState, Dispatch } from '@src/redux';
import { actionCreators, State as Channel } from '@src/redux/channel';

import './style.scss';

interface Props {
  selectedDate: moment.Moment;  
  onDateChange: Function;  
}

interface StateProps {
  channel: Channel;
}

interface DispatchProps {
  select: typeof actionCreators.select;
}

interface State {
  channels: string[];
  minDate: string;
  availableDate: string[];
}

const mapStateToProps = (state: RootState): StateProps => ({
  channel: state.channel
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators({ select: actionCreators.select }, dispatch);

class NavBar extends React.Component<Props & StateProps & DispatchProps, State> {
  state = {
    channels: [],
    minDate: '1900-1-1',
    availableDate: []
  };

  componentDidMount () {
    fetch('/api/times')
      .then((res: Response) => res.json())
      .then(json => this.setState({ availableDate: json.data.list }))
      .then(() => this.setState({ minDate: `${this.state.availableDate[0]}-1` }))
      .catch(error => null);
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.props.select(event.target.value)

  handleDateChange = (date: moment.Moment): void =>
    this.props.onDateChange(date)

  handleDateDismiss = (event: React.MouseEvent<HTMLElement>): void => undefined;

  render () {
    return (
      <div className="nav-bar">
        <AppBar position="static">
          <Toolbar>
            <IconButton className="menu-button" color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <div className="detail-info">
              <InputLabel
                htmlFor="channel-simple"
                className="input-label"
              >
                Channel:
              </InputLabel>
              <Select
                value={this.props.channel.choosen}              
                input={<Input name="channel" id="channel-simple" />}
                onChange={this.handleChange}
                className="select-bar"                
              >
                {
                  this.props.channel.list.map((channel: string, i: number) => (
                    <MenuItem value={channel} key={i}>
                      <em>{channel}</em>
                    </MenuItem>
                  ))
                }
              </Select>            
              <div className="date-picker">
                <div className="picker-label">Date:</div>
                <DatePicker
                  className="picker"
                  value={this.props.selectedDate}
                  onChange={this.handleDateChange}
                  disableFuture={true}
                  minDate={this.state.minDate}
                  InputProps={null}
                />
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
