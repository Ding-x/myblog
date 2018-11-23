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


const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      padding:'3% 15%',
    },
    title:{
      textAlign:'center',
      fontSize:36,
      marginBottom:'80px',
      fontStyle:'bold'
    },
    content:{
      fontSize:24,
      marginTop:'40px',
      lineHeight: '200%'
    },
    comment:{
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
      margin: '10px auto',
      width:"100%",
      background:"#81D8D0",
      height:'50px',
      color:'#000'
    }
  });

  

class SingleArticle extends Component {

  constructor(props){
    super(props);
    this.state={
      comment:'',
      p:props
    }
  }


  handleChange = (event) => {
    this.setState({comment: event.target.value});
 }

  handleSubmit= (event) => {
    this.props.addComment(this.props.article.id,this.state.comment);
    event.preventDefault();
}

  render() {
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
    const { classes } = this.props;
    return (
      <div className={classes.root} >
          <p className={classes.title}> {this.props.article.title}</p>
          <Divider/>
          <p className={classes.content}> {this.props.article.content} </p>
          <Divider/>
          <p className={classes.comment}>Comments:</p>
          <List>

          {this.props.comments.map((comment)=>{
            var info="via "+comment.author.username+" in "+comment.updatedAt;
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
      </div>
    );
        }
  }
}

SingleArticle.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SingleArticle);
