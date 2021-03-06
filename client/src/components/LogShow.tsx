import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, StyleRules, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import format from 'date-fns/format';
import { default as Pagination } from 'material-ui-flat-pagination';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators as logActionCreators, Log, State as LogState } from '@models/log';
import { DATE_FORMATER, DEFAULT_PAGE_SIZE, PAGE_SIZE_SELECTIONS } from '@src/const';
import { Dispatch, RootState } from '@src/models';
import { cleanChannel } from '@src/utils';
import MessageRender from './MessageRender';

const styles = (theme: Theme) =>
  createStyles({
    'log-content': {
      position: 'relative', // relative for .progress-bar
      width: '90%',
      margin: '0 auto 20px',
      minHeight: '600px',
    },

    'progress-bar': {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
    },

    'log-list': {
      listStyle: 'none',
      textAlign: 'left',
      // color: '#434343',
      color: theme.palette.type === 'dark' ? '#fff' : '#434343',
      padding: '0 20px',

      '& > li': {
        display: 'flex',
        alignItems: 'stretch',
      },
    },

    time: {
      display: 'inline-block',
      fontFamily: 'monospace',
      lineHeight: '2.5em',
      marginRight: '1em',
      fontSize: '14px',
    },

    message: {
      flex: 1,
      margin: 0,
      lineHeight: '2em',
      paddingLeft: '1em',
      borderLeft: '1px solid #999',
      fontWeight: 300,
      wordBreak: 'break-all',
    },

    nick: {
      fontWeight: 700,
    },

    'pagination-container': {
      width: '90%',
      height: '36px',
      margin: '0 auto',
      textAlign: 'center',
    },

    pagination: {
      display: 'inline-block',
      float: 'right',

      '& button': {
        verticalAlign: 'middle',
        width: '64px',
      },
    },

    'page-sizer': {
      display: 'inline-block',
      float: 'left',
      marginLeft: '1em',

      '& span': {
        display: 'inline-block',
        fontSize: '12px',
        marginLeft: '1em',
        color: '#777',
      },
    },
  });

interface Props extends WithStyles<StyleRules> {}

interface State {
  limit: number;
  offset: number;
  total: number;
  channel: string;
  date: Date;
  list: Log[];
}

interface StateProps {
  channel: string;
  date: Date;
  logs: LogState;
}

interface DispatchProps {
  fetchLog: typeof logActionCreators.fetchList;
}

const mapStateToProps = (state: RootState): StateProps => ({
  channel: state.channel.choosen,
  date: state.date.choosen,
  logs: state.log,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators({ fetchLog: logActionCreators.fetchList }, dispatch);

class LogShow extends React.Component<Props & StateProps & DispatchProps, State> {
  public state: State = {
    limit: DEFAULT_PAGE_SIZE,
    offset: 0,
    total: this.props.logs.total,
    channel: this.props.channel,
    date: this.props.date,
    list: this.props.logs.list,
  };

  public componentDidMount() {
    this.fetchLog();
  }

  public static getDerivedStateFromProps(props: StateProps & DispatchProps, state: State) {
    const { channel, date, fetchLog, logs } = props;
    const { limit } = state;

    if (channel !== state.channel || date !== state.date) {
      fetchLog(cleanChannel(channel), format(date, DATE_FORMATER), limit, 0);
      return {
        channel: props.channel,
        date: props.date,
        offset: 0,
      };
    }

    if (logs.list !== state.list) {
      return {
        list: logs.list,
        total: logs.total,
      };
    }

    return null;
  }

  private fetchLog = () => {
    const { channel, date, fetchLog } = this.props;
    const { limit, offset } = this.state;

    fetchLog(cleanChannel(channel), format(date, DATE_FORMATER), limit, offset);
  }; // tslint:disable-line:semicolon

  private handlePaginationClick = (e: React.MouseEvent, offset: number) => this.setState({ offset }, this.fetchLog); // tslint:disable-line:semicolon

  private handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    this.setState({ limit: +event.target.value }, this.fetchLog); // tslint:disable-line:semicolon

  public render() {
    const { classes, logs } = this.props;
    const { list, limit, offset, total } = this.state;

    return (
      <>
        <Card className={classes['log-content']}>
          <CardContent>
            <ul className={classes['log-list']}>
              {(list || []).map((log: Log, i) => {
                const [hour, minute, second] = log.time.split(':');
                return (
                  <li key={i}>
                    <span className={classes.time}>{`${hour}:${minute}:${second}`}</span>
                    <p className={classes.message}>
                      <span className={classes.nick}>{log.nick}: </span>
                      <MessageRender msg={log.message} />
                    </p>
                  </li>
                );
              })}
            </ul>
            {logs.isFetching && <LinearProgress className={classes['progress-bar']} />}
          </CardContent>
        </Card>
        <div className={classes['pagination-container']}>
          <div className={classes['page-sizer']}>
            <Select
              value={limit}
              onChange={this.handlePageSizeChange}
              inputProps={{ name: 'pagesizer', id: 'page-sizer' }}
              className={classes['select-bar']}
            >
              {PAGE_SIZE_SELECTIONS.map((ch: number) => (
                <MenuItem value={ch} key={ch}>
                  <em>{ch}</em>
                </MenuItem>
              ))}
            </Select>
            <span> logs per page.</span>
          </div>
          <Pagination
            limit={limit}
            offset={offset}
            total={total}
            onClick={this.handlePaginationClick}
            currentPageColor="primary"
            otherPageColor="default"
            className={classes.pagination}
            previousPageLabel={<ChevronLeft />}
            nextPageLabel={<ChevronRight />}
          />
        </div>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(LogShow));
