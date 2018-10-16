import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root:{
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        padding:'3%',
        minHeight: 'calc(60vh - 50px)',
        width:'100%'
    },
    progress: {
      margin: '200px 48%',
    },
  });

  

class Loading extends Component {

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <CircularProgress className={classes.progress} size={50} />
            </div>
        );
    }

};

Loading.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Loading);