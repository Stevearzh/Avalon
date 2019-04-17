import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

const styles: StyleRules = {
  'app-content': {
    paddingTop: '100px',
    paddingBottom: '40px',
  },
};

interface Props extends WithStyles<StyleRules> {}

const Content: React.SFC<Props> = ({ classes, children }) => <div className={classes['app-content']}>{children}</div>;

export default withStyles(styles)(Content);
