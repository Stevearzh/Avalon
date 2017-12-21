import * as React from 'react';
import * as moment from 'moment';
import * as queryString from 'query-string';
import Card, { CardContent } from 'material-ui/Card';
import { connect } from 'react-redux';

import { RootState } from '@src/redux';
import { State as Channel } from '@src/redux/channel';

import Pagination from '../Pagination';
import './log-content.scss';

const PAGE_SIZE = 20;

type Log = {
  time: string;
  nick: string;
  message: string;
};

interface Props {
  selectedDate: moment.Moment;  
}

interface StateProps {
  channel: Channel;
}

interface State {
  limit: number;
  offset: number;
  total: number;
  logs: Log[];
}

const mapStateToProps = (state: RootState): StateProps => ({
  channel: state.channel
});

const doubleIntDigit = (digit: string): string => Number(digit) < 10 ? `0${digit}` : `${digit}`;

class LogContent extends React.Component<Props & StateProps, State> {
  state = {
    limit: PAGE_SIZE,
    offset: 0,
    total: 0,
    logs: []
  };

  async componentWillReceiveProps (nextProps: Props & StateProps) {    
    const channel = this.getChannel(nextProps.channel.choosen);
    const date = this.getDate(nextProps.selectedDate);
    const offset = 0;
    const { limit } = this.state;      
    await this.setState({ offset });      
    this.fetchLogs(channel, date, limit, offset);    
  }

  getDate = (date: moment.Moment): string => date.format('YYYY-MM-DD');

  getChannel = (channel: string): string => {
    const tmp = channel.split('#');
    return tmp[tmp.length - 1];
  }

  fetchLogs = (channel: string, date: string, limit: number, offset: number): Promise<void> => {
    const [year, month, day] = date.split('-');
    return fetch(`/api/irc-logs?${queryString.stringify({ year, month, day: Number(day), channel, limit, offset })}`)
      .then((res: Response) => res.json())
      .then(json => {        
        if (!json.message) {
          const { logs, total } = json.data;
          this.setState({ logs, total });
        }
      })
      .catch(error => undefined);
  }

  render () {
    return (
      <div className="log-content">        
        <Card className="content-card">
          <CardContent>            
            <ul className="log-list">
              {
                this.state.logs.map((log: Log, i: number): JSX.Element => {
                  const [hour, minute, second] = log.time.split(':');
                  return (
                    <li key={i}>
                      <span className="time">
                        {`${doubleIntDigit(hour)}:${doubleIntDigit(minute)}:${doubleIntDigit(second)}`}
                      </span>
                      <p className="message">
                        <span className="nick">{log.nick}: </span>
                        {log.message}
                      </p>
                    </li>
                  );
                })
              }
            </ul>
          </CardContent>          
        </Card>
        <Pagination
          total={Math.ceil(this.state.total / this.state.limit)}
          current={Math.floor(this.state.offset / this.state.limit) + 1}
          onChange={async (page: number) => {
            const { limit } = this.state;
            const offset = (page - 1) * limit;              
            const channel = this.getChannel(this.props.channel.choosen);
            const date = this.getDate(this.props.selectedDate);

            await this.setState({ offset });
            await this.fetchLogs(channel, date, limit, offset);
          }}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(LogContent);
