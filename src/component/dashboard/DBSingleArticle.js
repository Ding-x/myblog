import React, { Component } from 'react';
import DBNav from './DBNav';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Loading from '../LoadingComponent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {withRouter} from 'react-router';

import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'



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
      height: '125vh',
      width:'10%'
    },
    frame:{
      height: '110vh',
      margin:0

    },
    title:{
      textAlign:'center',
      margin:'20px 5% 10px 5%',
      width:"90%"
    },
    content:{
      margin:'10px 5%',
      width:"90%"
    },
    editor:{
      border:'1px solid #ddd',
      height:'80vh'
    },
    btn:{
      margin:'30px 35%',
      border:'1px solid #ddd',
      height:'50px',
      width:'30%',
      padding:'0'
    },
    btnFrame:{
      padding:'0 !important',
    },

  });

class DBSingleArticle extends Component {

  state = {
    editorState: BraftEditor.createEditorState(''), 
    title:''
  }

  componentDidMount () {
    this.isLivinig = true;
    if(!this.props.isNew)
        setTimeout(this.setEditorContentAsync, 1000);
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

 handleEditSubmit= (event) => {
  if(this.state.title.length>0 && this.state.editorState.toHTML().length>0){
    this.props.editArticle(this.state.title,this.state.editorState.toHTML(),this.props.article.id, this.props.article.author);
    this.props.history.push('/Dashboard/Article');
    window.location.reload();
  }
  else
      alert('If you have nothing to say, why do you have to post?')
  event.preventDefault();
}

handlePostSubmit= (event) => {
  if(this.state.title.length>0 && this.state.editorState.toHTML().length>0){
    this.props.postArticle(this.state.title,this.state.editorState.toHTML());
    this.props.history.push('/Dashboard/Article');
  }
  else
      alert('If you have nothing to say, why do you have to post?')
  event.preventDefault();
}

handleCancle= (event) => {
  this.props.history.push('/Dashboard/Article');
  event.preventDefault();
}

deleteArticle= (event) => {
  
    this.props.deleteArticle(this.props.article.id);
    this.props.history.push('/Dashboard/Article');
    window.location.reload();

  event.preventDefault();
}

  render() {
    const { classes } = this.props;
    const { editorState } = this.state;


    if(this.props.isNew){
      return (
        <div className={classes.root}>
          <DBNav/>
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
      <Grid container md={12} spacing={24}>
      
        <Grid className={classes.btnFrame} item xs={6}><Button  className={classes.btn} color="primary" onClick={this.handleCancle}>Cancel</Button></Grid>
        <Grid className={classes.btnFrame} item xs={6}><Button  className={classes.btn} color="secondary" onClick={this.handlePostSubmit}>Submit</Button></Grid>
      </Grid>
              </Paper>
          </main>
        </div>
    );
    }else{
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
            <DBNav/>
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
        <Grid container md={12} spacing={24}>
        
          <Grid className={classes.btnFrame} item xs={4}><Button  className={classes.btn} onClick={this.handleCancle} color="primary" >Cancel</Button></Grid>
          <Grid className={classes.btnFrame} item xs={4}><Button  className={classes.btn} onClick={this.deleteArticle} color="#aaa" >Delete</Button></Grid>
          <Grid className={classes.btnFrame} item xs={4}><Button  className={classes.btn} color="secondary" onClick={this.handleEditSubmit}>Submit</Button></Grid>
        </Grid>
                </Paper>
            </main>
          </div>
      );
    }
    }



  }
}

DBSingleArticle.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withRouter(withStyles(styles)(DBSingleArticle)) ;