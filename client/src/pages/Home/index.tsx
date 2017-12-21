import * as React from 'react';
import * as moment from 'moment';

import NavBar from '@src/components/NavBar';
import LogContent from '@src/components/LogContent';

interface Props {}

interface State {
  selectedDate: moment.Moment;  
}

class App extends React.Component<Props, State> {
  state = {
    selectedDate: moment()    
  };

  handleDateChange = (newDate: moment.Moment): void =>
    this.setState({ selectedDate: newDate }) 

  render() {
    return (
      <div className="page home-page">
        <NavBar
          onDateChange={this.handleDateChange}
          selectedDate={this.state.selectedDate}
        />
        <LogContent          
          selectedDate={this.state.selectedDate}
        />
      </div>
    );
  }
}

export default App;
