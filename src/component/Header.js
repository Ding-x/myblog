import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link} from 'react-router-dom';

const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      height:200
    },
    header:{
        height:140,
        borderBottom: '1px solid #e8e8e8',
        fontSize:42,
        textAlign: 'center',
        paddingTop: 30,
    },
    tabsRoot: {
      background:'#81D8D0',
      color:'#ffffff',
      borderBottom: '1px solid #e8e8e8',
    },
    tabsIndicator: {
      backgroundColor: '#309c91',
      height:3
    },
    tabRoot: {
      textTransform: 'initial',
      fontSize:18,
      height:60,
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing.unit * 4,
      fontFamily: [
      ].join(','),
      '&:hover': {
        color: '#555',
        opacity: 1,
      },
      '&$tabSelected': {
        color: '#333',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: '#333',
      },
    },
    tabSelected: {},
  });

class Header extends Component {

    state = {
        value: 0,
      };
    
      handleChange = (event, value) => {
        this.setState({ value });
      };
    
      render() {
        const { classes } = this.props;
        const { value } = this.state;
    
        return (
          <div className={classes.root}>
              <div className={classes.header}>Ding-X</div>
              <Tabs value={value} onChange={this.handleChange} classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}>
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Home" to='/Home' component={Link}/>
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Article" to='/Article' component={Link}/>
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Music" to='/Music' component={Link}/>
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="About" to='/About' component={Link}/>
              </Tabs>
          </div>
        );
      }
  

}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
