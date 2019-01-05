import React, { Component } from 'react';
import DBNav from './DBNav';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditOutlined from '@material-ui/icons/EditOutlined';
import {Link} from 'react-router-dom';
import Loading from '../LoadingComponent';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';



const styles = theme => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      paddingTop: theme.spacing.unit * 12,
      paddingLeft:theme.spacing.unit * 4,
      paddingBottom: theme.spacing.unit * 4,
      paddingRight:theme.spacing.unit * 4,
      height: '100vh',
      overflow:'auto'
    },
    item:{
        marginTop: theme.spacing.unit * 3,
        marginLeft:'70px',
        marginBottom: theme.spacing.unit * 4,
        marginRight:theme.spacing.unit * 8,
        padding:theme.spacing.unit * 3,
        height: '8vh',
        background:'#fff',
        width:'90%',
        boxShadow:'0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 5px 0 rgba(0, 0, 0, 0.05) ',
        border:'1px solid #ddd',

    },
    frame:{
        height: '85vh',
        margin:0,
  
      },
      newArticleBtn:{
          marginLeft:'70px',
          marginTop:'20px'
      }

  });

class DBArticle extends Component {
    
  render() {
    const { classes } = this.props;
    console.log(this.props)
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
    else
    return (
        <div className={classes.root}>
          <DBNav auth={this.props.auth}/>
          <main className={classes.content}>
          <Paper className={classes.frame} elevation={1}>
          <Button  className={classes.newArticleBtn}  variant="outlined" color="primary" to={`/Dashboard/NewArticle`} component={Link}>New</Button>
          <List component="nav">
          {this.props.article.map((article)=>{
              return(
                <ListItem key={article._id} className={classes.item} button to={`/Dashboard/Article/${article._id}`} component={Link}>
                   <ListItemText >Title: {article.title}</ListItemText>
                    <ListItemIcon>
                        <EditOutlined />
                    </ListItemIcon>
                </ListItem>
              )
          })}
      </List>
      </Paper>
          </main>
        </div>
    );
  }
}

DBArticle.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(DBArticle);