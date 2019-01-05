import React, { Component } from 'react';
import DBNav from './DBNav';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Loading from '../LoadingComponent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'

import { Link } from 'react-router-dom';


const styles = theme => ({
    root: {
      display: 'flex',
    },
    mainFrame: {
      flexGrow: 1,
      paddingTop: theme.spacing.unit * 12,
      paddingLeft:theme.spacing.unit * 1,
      paddingBottom: theme.spacing.unit * 4,
      paddingRight:theme.spacing.unit * 1,
      height: '130vh',
      width:'10%'
    },
    frame:{
      height: '105vh',
      margin:0,
      overFlow:'scroll'

    },
    title:{
      textAlign:'center',
      fontSize:36,
      margin:'20px 5% 10px 5%',
      width:"90%"
    },
    content:{
      margin:'10px 5%',
      width:"90%"
    },
    editor:{
      border:'1px solid #ddd'
    },
    btn:{
      margin:'10% 35%',
      border:'1px solid #ddd',
      height:'50px',
      width:'30%',
      padding:'0'
    },
    btnFrame:{
      padding:'0 !important',
    }

  });

class DBSingleArticle extends Component {

  state = {
    editorState: BraftEditor.createEditorState(null), 
    title:'',
    submitOpen: false,
    deleteOpen: false,

  }

  componentDidMount () {
    this.isLivinig = true
    setTimeout(this.setEditorContentAsync, 500)
  }

  componentWillUnmount () {
    this.isLivinig = false
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
    })
  }

  setEditorContentAsync = () => {
    this.isLivinig && this.setState({
      editorState: BraftEditor.createEditorState(this.props.article.content),
      title:this.props.article.title
    })
  }

  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  }

 handleSubmitClickOpen = () => {
    this.setState({ submitOpen: true });
  };

  handleDeleteClickOpen = () => {
    this.setState({ deleteOpen: true });
  };

  handleSubmitClose = () => {
    this.setState({ submitOpen: false });
  };

  handleDeleteClose = () => {
    this.setState({ deleteOpen: false });
  };

 handleDelete = (event) =>{

  this.props.deleteArticle(this.props.article._id);
  this.props.deleteCommentsOfOneArticle(this.props.article._id);
  
 }

 handleSubmit = (event) =>{
  this.props.editArticle(this.state.title,this.state.editorState.toHTML(),this.props.article._id);
}


  render() {
    const { classes } = this.props;
    const { editorState } = this.state

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
          <DBNav auth={this.props.auth}/>
          <main className={classes.mainFrame}>
              <Paper className={classes.frame} elevation={1}>
              <TextField className={classes.title} variant="outlined" name="Title" label="Title" value={this.state.title} onChange={this.handleTitleChange}/>
        <div className={classes.content}>
          <BraftEditor
          className={classes.editor}
            value={editorState}
            onChange={this.handleChange}
          />
      </div>
      <Grid container spacing={24}>

        <Grid className={classes.btnFrame} item xs={4}><Button  className={classes.btn} color="primary" to='/Dashboard/Article' component={Link}>Cancel</Button></Grid>
        <Grid className={classes.btnFrame} item xs={4}><Button  className={classes.btn} color="primary" onClick={this.handleDeleteClickOpen}>Delete</Button></Grid>
        <Grid className={classes.btnFrame} item xs={4}><Button  className={classes.btn} color="secondary"  onClick={this.handleSubmitClickOpen}>Submit</Button></Grid>
      </Grid>

      <Dialog
          open={this.state.submitOpen}
          onClose={this.handleSubmitClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure to update this article?"}</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleSubmitClose} color="primary">
              No
            </Button>
            <Button onClick={this.handleSubmit} to='/Dashboard/Article' component={Link} color="primary" autoFocus >
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.deleteOpen}
          onClose={this.handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure to delete this article?"}</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleDeleteClose} color="primary">
              No
            </Button>
            <Button onClick={this.handleDelete} to='/Dashboard/Article' component={Link} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
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