import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { baseUrl } from '../../shared/baseUrl';
import DBNav from './DBNav';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';



function Transition(props) {
  return <Slide direction="up" {...props} />;
}


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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  uploadContainer:{
    paddingTop:"40px",
    paddingBottom:"20px",
    paddingLeft:"10px"
  },
  alert:{
    color:"red",
    marginTop:"10px"
  }

});



class DBMusic extends React.Component {
  state = {
    name: '',
    author:'',
    musicData: null,
    imageData: null,
    musicServerPath:'',
    imageServerPath:'',
    open: false,
    musicReady:false,
    imageReady:false,
}

handleClickOpen = () => {
  this.setState({ open: true });
};

handleClose = () => {
  this.setState({ open: false });
};

changeName = (e) => {
    this.setState({ name: e.target.value })
}

changeAuthorName = (e) => {
  this.setState({ author: e.target.value })
}

changeMusicPath = (e) => {
    const file = e.target.files[0];
    if (!file) {
        return;
    }

    this.setState({ musicPath: file.name, musicData: file })
}

changeImagePath = (e) => {
  const file = e.target.files[0];
  if (!file) {
      return;
  }

  this.setState({ imagePath: file.name, imageData: file})
}



uploadMusic = () => {
    
    const data = this.state.musicData;
    if (!data) {
        console.log('未选择文件');
        return;
    }

    const form = new FormData();

    form.append('musicFile', data);

    const bearer = 'Bearer ' + localStorage.getItem('token');
    const url = baseUrl+'musicUploadRouter';

    fetch(url, {
            method: 'POST',
            body: form,
            headers: { 'Authorization': bearer },
          credentials: 'same-origin'
        })
        .then(response => {
          if (response.ok) {
              this.setState( { musicReady:true } )
              return response;
          }
          else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
          }
          },
          error => {
            var errmess = new Error(error.message);
            console.log(errmess)
            throw errmess;
        })
        .then(response => response.json())
        .then(response => {
            this.setState(
              {
                musicServerPath:'music/'+response.filename
              }
            )
        })
        .catch(error => { console.log('Post music ', error.message);
        alert('Your music could not be posted\nError: '+ error.message); })
}


uploadImage = () => {
    
  const data = this.state.imageData;
  if (!data) {
      console.log('未选择文件');
      return;
  }

  const form = new FormData();
  form.append('imageFile', data);

  const bearer = 'Bearer ' + localStorage.getItem('token');
  const url = baseUrl+'imageUploadRouter';

  fetch(url, {
          method: 'POST',
          body: form,
          headers: { 'Authorization': bearer },
        credentials: 'same-origin'
      })
      .then(response => {
        if (response.ok) {
          this.setState( { imageReady:true } )
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
      var errmess = new Error(error.message);
      console.log(errmess)
      throw errmess;
  })
      .then(response => response.json())
      .then(response => {
          this.setState(
            {
              imageServerPath:'images/cover/'+response.filename
            }
          )
      })
      .catch(error => { console.log('Post image ', error.message);
      alert('Your image could not be posted\nError: '+ error.message); })
}


upload = () => {

  const musis ={
    "title":this.state.name,
    "author":this.state.author,
    "musicpath":this.state.musicServerPath,
    "imagepath":this.state.imageServerPath
  }
  this.props.postMusic(musis);
  this.setState({ open: false });
    
}

 cancel = () => {
    this.props.closeOverlay();
}


handleDeleteMusic = (music) => {    

  const bearer = 'Bearer ' + localStorage.getItem('token');
  const imageurl = baseUrl+'imageUploadRouter/'+music.imagepath.split("/")[2];

  fetch(imageurl, {
          method: 'DELETE',
          headers: { 'Authorization': bearer },
        credentials: 'same-origin'
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })

    const musicurl = baseUrl+'musicUploadRouter/'+music.musicpath.split("/")[1];

    fetch(musicurl, {
            method: 'DELETE',
            headers: { 'Authorization': bearer },
          credentials: 'same-origin'
        })
        .then(res => res.json())
        .then(res => {
          console.log(res)
        })
    this.props.deleteMusic(music._id)
  
}

render() {


    const { classes } = this.props;
    return (
        <div className={classes.root}>
        <DBNav auth={this.props.auth} />
        
        <main className={classes.content}>

        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}> New Music </Button>

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Upload New Music"}
          </DialogTitle>
          <DialogContent>



             <Grid container spacing={24}>

              <Grid item xs={12} sm={6}>
              <TextField
              id="outlined-name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.changeName}
              margin="normal"
              variant="outlined"
            />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
              id="outlined-name"
              label="Author"
              className={classes.textField}
              value={this.state.author}
              onChange={this.changeAuthorName}
              margin="normal"
              variant="outlined"
            />
              </Grid>
            </Grid>
            <Divider />
              <Grid container spacing={24} className={classes.uploadContainer}>

              <Grid item xs={16} sm={8}>
                <input type='file' accept='audio/mp3' onChange={this.changeMusicPath} />
                {this.state.musicReady? <p className={classes.alert}>Music uploaded!</p> : <p className={classes.alert}>Please upload a music file</p> }              
              </Grid>
              <Grid item xs={8} sm={4}>
                <Button variant="outlined" color="primary" onClick={this.uploadMusic}> Upload Music </Button>
              </Grid>
              </Grid>
              <Divider />

              <Grid container spacing={24} className={classes.uploadContainer}>
              <Grid item xs={16} sm={8}>
              <input type='file' accept='image/*' onChange={this.changeImagePath} />
              {this.state.imageReady? <p className={classes.alert}>Image uploaded!</p> : <p className={classes.alert}>Please upload a image file</p> }  
              
              </Grid>
              <Grid item xs={8} sm={4}>
              <Button variant="outlined" color="primary" onClick={this.uploadImage}> Upload Image </Button>
              </Grid>    
          </Grid>

            
 
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary"> Disagree </Button>
            {this.state.musicReady && this.state.imageReady? <Button onClick={this.upload} color="primary"> Agree  </Button>: <Button disabled color="primary"> Agree  </Button>}
            
          </DialogActions>
        </Dialog>

        <Grid container spacing={16}>
                 <Grid item xs={12} md={6}>  
              { this.props.musics.musics.map((music)=>{
                return(
                 
                  <List  key={music._id}  >
                    <ListItem>
                      <ListItemAvatar  >
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={music.title}
                      />
                      <ListItemSecondaryAction indexkey={music._id}  onClick={() => this.handleDeleteMusic(music)}>
                    
                        <IconButton aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                </List>
 
              )
              }) }
                </Grid>
                </Grid>  

            </main>
        </div>
    )
}

  
}

DBMusic.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DBMusic);