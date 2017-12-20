import * as React from 'react';
import * as moment from 'moment';

import NavBar from '@src/components/NavBar';
import LogContent from '@src/components/LogContent';

interface Props {}

interface State {
  selectedDate: moment.Moment;
  selectedChannel: string;
}

class App extends React.Component<Props, State> {
  state = {
    selectedDate: moment(),
    selectedChannel: ''
  };

  handleDateChange = (newDate: moment.Moment): void =>
    this.setState({ selectedDate: newDate }) 

  handleChannelChange = (newChannel: string): void =>
    this.setState({ selectedChannel: newChannel })

  render() {
    return (
      <div className="page home-page">
        <NavBar
          onDateChange={this.handleDateChange}
          onChannelChange={this.handleChannelChange}
          selectedChannel={this.state.selectedChannel}
          selectedDate={this.state.selectedDate}
        />
        <LogContent
          selectedChannel={this.state.selectedChannel}
          selectedDate={this.state.selectedDate}
        />
      </div>
    );
  }
}

export default App;
