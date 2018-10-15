import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {Articles} from './sample'


const styles =theme =>( {
    root:{
        padding:'3%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    paperContent:{
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        maxWidth: '60%',
        margin:"10px auto 60px auto"
    }


  });


 
class Article extends Component {

  render() {
    const { classes } = this.props;
    console.log(Articles);
    return (
      <div className={classes.root}>
      {Articles.map((artical)=>{
          return(
            <Paper key={artical.id} className={classes.paperContent} elevation={1}>
            <Typography align="center" variant="h5" component="h3">
            {artical.title}
            </Typography>
            <Divider/>
            <Typography component="p">
            {artical.content}
            </Typography>
            <Divider/>
            <Button size="small" color="secondary">
                        More...
                    </Button>
          </Paper>
          )
      })}
        
      </div>
    );
  }
}

Article.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Article);