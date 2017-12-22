import * as React from 'react';
import * as moment from 'moment';

import NavBar from '@src/components/NavBar';
import LogContent from '@src/components/LogContent';

interface Props {}

interface State {}

class App extends React.Component<Props, State> {
  handleDateChange = (newDate: moment.Moment): void =>
    this.setState({ selectedDate: newDate }) 

  render() {
    return (
      <div className="page home-page">
        <NavBar/>
        <LogContent/>
      </div>
    );
  }
}

export default App;
