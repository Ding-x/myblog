import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

});



class DBWork extends React.Component {
  state = {
    name: '',
    author:'',
    musicData: null,
    imageData: null,
    musicServerPath:'',
    imageServerPath:'',
    open: false,
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
    const url = 'http://localhost:3000/musicUploadRouter';

    fetch(url, {
            method: 'POST',
            body: form,
            headers: { 'Authorization': bearer },
          credentials: 'same-origin'
        })
        .then(res => res.json())
        .then(res => {
            this.setState(
              {
                musicServerPath:'music/'+res.filename
              }
            )
        })
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
  const url = 'http://localhost:3000/imageUploadRouter';

  fetch(url, {
          method: 'POST',
          body: form,
          headers: { 'Authorization': bearer },
        credentials: 'same-origin'
      })
      .then(res => res.json())
      .then(res => {
          this.setState(
            {
              imageServerPath:'images/cover/'+res.filename
            }
          )
      })
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
  const imageurl = 'http://localhost:3000/imageUploadRouter/'+music.imagepath.split("/")[2];

  fetch(imageurl, {
          method: 'DELETE',
          headers: { 'Authorization': bearer },
        credentials: 'same-origin'
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })

    const musicurl = 'http://localhost:3000/musicUploadRouter/'+music.musicpath.split("/")[1];

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
            <div className='row'>
            <TextField
              id="outlined-name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.changeName}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-name"
              label="Author"
              className={classes.textField}
              value={this.state.author}
              onChange={this.changeAuthorName}
              margin="normal"
              variant="outlined"
            />
            </div>

              <div className='row'>
                <label>Music file</label>
                <div className='row-input'>
                    <input type='file' accept='audio/mp3' onChange={this.changeMusicPath} />
                    <Button variant="outlined" color="primary" onClick={this.uploadMusic}> Upload Music </Button>
                </div>
            </div>
            <div className='row'>
                <label>Image file</label>
                <div className='row-input'>
                    <input type='file' accept='image/*' onChange={this.changeImagePath} />
                    <Button variant="outlined" color="primary" onClick={this.uploadImage}> Upload Image </Button>
                </div>
            </div>
 
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.upload} color="primary">
              Agree
            </Button>
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

DBWork.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DBWork);