import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PeopleIcon from '@material-ui/icons/People';
import DeleteIcon from '@material-ui/icons/Delete';


import DBNav from './DBNav';

const styles = theme => ({
  root: {
    display: 'flex',
    background:'white'
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



class DBUser extends React.Component {

  handleDelete = (id) => {    
    this.props.deleteUser(id)
 }



  render() {
    const { classes } = this.props;
      
    return (
        <div className={classes.root}>
          <DBNav auth={this.props.auth} />
          <main className={classes.content}>
            
            <Grid container spacing={16}>
                 <Grid item xs={12} md={6}>  
              {this.props.auth.admin? this.props.users.users.map((user)=>{
                return(
                 
                  <List  key={user._id}  >
                    <ListItem>
                      <ListItemAvatar  >
                        <Avatar>
                          <PeopleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.username}
                      />
                      <ListItemSecondaryAction indexkey={user._id}  onClick={() => this.handleDelete(user._id)}>
                        <IconButton aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                </List>
 
              )
              }) : null}
                </Grid>
                </Grid>  
          </main>
        </div>

    );
  }


  
}

DBUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DBUser);