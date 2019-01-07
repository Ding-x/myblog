import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      height:120,
      borderTop: '1px solid #e8e8e8',


    },
    footer:{
        height:120,
        fontSize:16,
        textAlign: 'center',
        paddingTop: 50,
        [theme.breakpoints.down('sm')]: {
          fontSize: 12,
        },
    },
    

  
  });

class Footer extends Component {
    
      render() {
        const { classes } = this.props;    
        return (
          <div className={classes.root}>
            <div className={classes.footer}>Copyright &copy; Xiao's Blog {new Date().getFullYear()}. Powered by <a href="http://xiaop.ca">Xiao Peng</a></div>
          </div>
        );
      }
  

}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
