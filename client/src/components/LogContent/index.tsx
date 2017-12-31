import * as React from 'react';
import * as moment from 'moment';
import * as queryString from 'query-string';
import Card, { CardContent } from 'material-ui/Card';
import { LinearProgress } from 'material-ui/Progress';
import { animateScroll as scroll } from 'react-scroll';

import { cleanChannel } from '@src/utils';

import Pagination from '../Pagination';
import './log-content.scss';

const PAGE_SIZE = 20;

type Log = {
  time: string;
  nick: string;
  message: string;
};

interface Props {
  channel: string;
  time: moment.Moment;
}

interface State {
  limit: number;
  offset: number;
  total: number;
  logs: Log[];
  loading: boolean;
}

const doubleIntDigit = (digit: string): string => Number(digit) < 10 ? `0${digit}` : `${digit}`;

class LogContent extends React.Component<Props, State> {
  state = {
    limit: PAGE_SIZE,
    offset: 0,
    total: 0,
    logs: [],
    loading: true
  };

  async componentWillReceiveProps (nextProps: Props) {    
    const channel = cleanChannel(nextProps.channel);
    const date = this.getDate(nextProps.time);
    const offset = 0;
    const { limit } = this.state;      
    await this.setState({ offset });      
    this.fetchLogs(channel, date, limit, offset);    
  }

  getDate = (date: moment.Moment): string => date.format('YYYY-MM-DD');  

  fetchLogs = (channel: string, date: string, limit: number, offset: number): Promise<void> => {
    const [year, month, day] = date.split('-');    
    this.setState({ loading: true });    
    return fetch(`/api/irc-logs?${queryString.stringify({
      year,
      month: Number(month),
      day: Number(day),
      channel, limit, offset
    })}`)
      .then((res: Response) => res.json())
      .then(json => {
        this.setState({ loading: false });
        scroll.scrollToTop({
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart'
        });
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
            {
              this.state.loading &&
              <div className="loading-panel">
                <LinearProgress className="progress-bar"/>
              </div>
            }
          </CardContent>          
        </Card>
        <Pagination
          total={Math.ceil(this.state.total / this.state.limit)}
          current={Math.floor(this.state.offset / this.state.limit) + 1}
          onChange={async (page: number) => {
            const { limit } = this.state;
            const offset = (page - 1) * limit;              
            const channel = cleanChannel(this.props.channel);
            const date = this.getDate(this.props.time);

            await this.setState({ offset });
            await this.fetchLogs(channel, date, limit, offset);
          }}
        />
      </div>
    );
  }
}

export default LogContent;
