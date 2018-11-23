import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link} from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';


import TextField from '@material-ui/core/TextField';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}



const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      height:240
    },
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },
    header:{
        height:170,
        borderBottom: '1px solid #e8e8e8',
        fontSize:42,
        textAlign: 'center',
        paddingTop: 60,
    },
    tabsRoot: {
      background:'#81D8D0',
      color:'#000',
      borderBottom: '1px solid #e8e8e8',
      fontWeight: theme.typography.fontWeightMedium,
    },
    tabsIndicator: {
      backgroundColor: '#309c91',
      height:3
    },
    tabRoot: {
      textTransform: 'initial',
      fontSize:18,
      height:70,
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
        color: '#fff',
        fontWeight: theme.typography.fontWeightHigh,
      },
      '&:focus': {
        color: '#fff',
      },
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    button: {
      margin: theme.spacing.unit,
    },
    tabSelected: {},
  });

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      open: false,
      username:'',
      password:''
    };
  
    this.handleLogin = this.handleLogin.bind(this);
    //this.handleLogout = this.handleLogout.bind(this);
}
    
      handleChange = (event, value) => {
        this.setState({ value });
      };
      handleOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

      handleChangeInput = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

      handleLogin(event) {
        this.handleClose();
        console.log(this.state.username+this.state.password)

        this.props.loginUser({username: this.state.username, password: this.state.password});
        event.preventDefault();

    }
    
      render() {
        const { classes } = this.props;
        const { value } = this.state;
        console.log(this.props)
        if(this.props.isDashboard<0)
          return (
            <div className={classes.root}>
                <div className={classes.header}>Ding-X</div>
                <Tabs value={value} onChange={this.handleChange} classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}>

                  <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Home" to='/Home' component={Link}/>
                  <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Article" to='/Article' component={Link}/>
                  <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Music" to='/Music' component={Link}/>
                  <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="About" to='/About' component={Link}/>                  
                  <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Dashboard" to='/Dashboard/Home' component={Link}/>  
                  <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Login" onClick={this.handleOpen}/>                                 
  
                </Tabs>
            
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <div style={getModalStyle()} className={classes.paper}>
                    <form className={classes.container} noValidate autoComplete="off" >
                      <TextField
                        id="standard-name"
                        label="Name"
                        className={classes.textField}
                        value={this.state.username}
                        onChange={this.handleChangeInput('username')}
                        margin="normal"
                      />
                      <TextField
                        onChange={this.handleChangeInput('password')}
                        id="standard-password-input"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                      />
                      <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleLogin}>Submit</Button>
                    </form>
                  </div>
                </Modal>
             
            </div>
          );
        else
          return(
            <div></div>
          )
      }
  

}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
