import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      padding:'3%',
      minHeight: 'calc(70vh - 50px)'
    },
  });

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} >
          Home
      </div>
    );
  }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Home);
