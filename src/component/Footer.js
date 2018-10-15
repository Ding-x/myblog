import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      height:120,
    },
    header:{
        height:120,
        borderTop: '1px solid #e8e8e8',
        fontSize:24,
        textAlign: 'center',
        paddingTop: 30,
    },
  
  });

class Footer extends Component {
    
      render() {
        const { classes } = this.props;    
        return (
          <div className={classes.root}>
              <div className={classes.header}>This is footer</div>
            
          </div>
        );
      }
  

}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
