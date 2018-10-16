import React, { Component } from 'react';
import DBNav from './DBNav';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Loading from '../LoadingComponent';



const styles = theme => ({
    root: {
      display: 'flex',
    },
    mainFrame: {
      flexGrow: 1,
      paddingTop: theme.spacing.unit * 12,
      paddingLeft:theme.spacing.unit * 4,
      paddingBottom: theme.spacing.unit * 4,
      paddingRight:theme.spacing.unit * 4,
      height: '100vh',
      overflow:'auto'
    },
    frame:{
      height: '80vh',

    },
    title:{
      textAlign:'center',
      fontSize:36,
      marginBottom:'80px',
      fontStyle:'bold'
    },
    content:{
      fontSize:24,
      marginTop:'40px',
      lineHeight: '200%'
    },

  });

class DBSingleArticle extends Component {

  render() {
    const { classes } = this.props;
    if (this.props.isLoading) {
      return(
          <div>
                   
                  <Loading />
          </div>
      );
  }
  else if (this.props.errMess) {
      return(
          <div >
                  <h4>{this.props.errMess}</h4>
          </div>
      );
  }
  else if (this.props.article != null){ 
    return (
        <div className={classes.root}>
          <DBNav/>
          <main className={classes.mainFrame}>
              <Paper className={classes.frame} elevation={1}>
              <p className={classes.title}>{this.props.article.title}</p>
              <Divider/>
              <p className={classes.content}>{this.props.article.content}</p>
              </Paper>
          </main>
        </div>
    );
  }
  }
}

DBSingleArticle.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(DBSingleArticle);