import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DBNav from './DBNav';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 12,
    paddingLeft:theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    paddingRight:theme.spacing.unit * 4,
    height: '100vh',
    overflow: 'auto',
  },

});

class DBHome extends React.Component {

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
          <DBNav/>
          <main className={classes.content}>
            <div  />
            <Typography variant="h4" gutterBottom component="h2">
              Home
            </Typography>
          </main>
        </div>

    );
  }
}

DBHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DBHome);