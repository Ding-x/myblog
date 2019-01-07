import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ChatBubble from '@material-ui/icons/ChatBubble';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Loading from '../LoadingComponent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from 'react-router-dom';

const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      padding:'3% 15%',
    },
    title:{
      textAlign:'center',
      fontSize:36,
      marginBottom:'50px',
      fontStyle:'bold',
      marginTop:'150px',
      fontWeight:'400'
    },
    content:{
      fontSize:22,
      marginBottom:'50px',
      marginTop:'40px',
      lineHeight: '220%',
      fontWeight:'300'
    },
    info:{
      fontSize:18,
      marginTop:'20px',
      marginBottom:'20px',
      lineHeight: '200%',
      color:'#aaa',
      fontStyle:'italic',
    },
    comment:{
      marginTop:'50px',
      fontSize:24
    },
    margin: {
      margin: theme.spacing.unit,
      width:"100%"
    },
    textField: {
      flexBasis: 200,
    },
    submit:{
      margin: '30px auto 0 auto',
      width:"100%",
      background:"#81D8D0",
      height:'50px',
      color:'#fff',
      float:'left'
    },
    backToArticle:{
      position:'fixed',
      left:'40px',
      bottom:'150px',
      width:'100px'
    },
    toTop:{
      position:'fixed',
      left:'40px',
      bottom:'210px',
      width:'100px',
      fontWeight:'100'
    }
  });

  

class SingleArticle extends Component {

  constructor(props){
    window.scrollTo(100, 100)
    super(props);
    this.state={
      comment:'',
      p:props,
      alertOpen:false,
      dialogTitle:'',
      dialogContent:''
    }
  }

  // componentDidMount () {
  //   window.scrollTo(0, 0)
  // }

  handleAlertClose = () => {
    this.setState({ alertOpen: false });
  };

  handleChange = (event) => {
    this.setState({comment: event.target.value});
 }

  handleSubmit= (event) => {
    if(this.props.auth.isAuthenticated && this.state.comment.length>0){
      this.props.postComment(this.props.article._id,this.state.comment);
      event.preventDefault();
    }
    else if(!this.props.auth.isAuthenticated){

      this.setState({ 
        alertOpen: true,
        dialogTitle:"Haven't login?",
        dialogContent:"You need to login to comment on this article"
      });
    }
    else if(this.state.comment.length===0){
      this.setState({ 
        alertOpen: true,
        dialogTitle:"No comments?",
        dialogContent:"Please say something..."
      });
    }
    else{
      this.setState({ 
        alertOpen: true,
      });
    }

}


goToTop= (event) => {
  window.scrollTo(0, 0)
}

  render() {

    if (this.props.isLoading) {
      return(
          <div><Loading /></div>
      );
  }
  else if (this.props.errMess) {
      return(
          <div ><h4>{this.props.errMess}</h4></div>
      );
  }
  else if (this.props.article != null){ 
    const { classes } = this.props;
    var date = new Date(this.props.article.createdAt).toLocaleString();
    return (
      <div className={classes.root} >
          <Button className={classes.backToArticle} variant="outlined" to={`/Article`} component={Link}>《</Button>
          <Button className={classes.toTop} variant="outlined" onClick={this.goToTop}>Top</Button>
          <p className={classes.title} id="artictle_title"> {this.props.article.title}</p>
          <Divider/>
          <p className={classes.content} dangerouslySetInnerHTML={{ __html:this.props.article.content }} /> 
          <Divider/>
          <Grid className={classes.info} item xs={10}>
                  Posted by {this.props.article.author.username} on {date}
          </Grid>
          <Divider/>
          <p className={classes.comment}>Comments:</p>
          <List>

          {this.props.comments.map((comment)=>{
            var date = new Date(comment.createdAt).toLocaleString();
            var info="via "+comment.author.username+" on "+date;
            return(
              <ListItem  key={comment._id}>
                <Avatar>
                  <ChatBubble />
                </Avatar>
                <ListItemText key={comment._id} primary={comment.comment} secondary={info} />
              </ListItem>
            )
          })}
          </List>
          <form >

          <Grid container spacing={24}>

            <Grid className={classes.info} item xs={10}>
            <TextField multiline id="outlined-simple-start-adornment" className={classNames(classes.margin, classes.textField)} 
            variant="outlined" name="comment" label="New Comment" value={this.state.comment} onChange={this.handleChange}/>
            </Grid>
            <Grid item xs={2}>
            <Button  className={classes.submit} color="secondary" onClick={this.handleSubmit}>Submit</Button>
            </Grid>
          </Grid>
   </form>

   <Dialog
          open={this.state.alertOpen}
          onClose={this.handleAlertClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">{this.state.dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.dialogContent}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleAlertClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
        }
  }
}

SingleArticle.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SingleArticle);
