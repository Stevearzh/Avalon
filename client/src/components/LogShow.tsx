import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

import { DEFAULT_PAGE_SIZE } from '@src/const';

const styles: StyleRules = {
  'log-content': {
    position: 'relative', // relative for .progress-bar
    width: '90%',
    margin: '0 auto 40px',
    minHeight: '600px',
  },

  'progress-bar': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
};

interface Props extends WithStyles<StyleRules> {}

interface State {
  limit: number;
  offset: number;
  total: number;
  loading: boolean;
}

class LogShow extends React.Component<Props, State> {
  public state: State = {
    limit: DEFAULT_PAGE_SIZE,
    offset: 0,
    total: 0,
    loading: true,
  };

  public render() {
    const { classes } = this.props;
    const { loading } = this.state;

    return (
      <Card className={classes['log-content']}>
        <CardContent>
          Logs
          {loading && <LinearProgress className={classes['progress-bar']} />}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(LogShow);
