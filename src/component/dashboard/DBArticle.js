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
        marginLeft:theme.spacing.unit * 5,
        marginBottom: theme.spacing.unit * 4,
        marginRight:theme.spacing.unit * 4,
        padding:theme.spacing.unit * 3,
        height: '8vh',
        background:'#fff',
        width:'95%',
        boxShadow:'0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.1) ',
        border:'1px solid #ddd',

    },
    frame:{
        height: '85vh',
        margin:0
  
      },

  });

class DBArticle extends Component {
  render() {
    const { classes } = this.props;
    if (this.props.articles.isLoading) {
        return(
            <div>
                     
                    <Loading />
            </div>
        );
    }
    else if (this.props.articles.errMess) {
        return(
            <div >
                    <h4>{this.props.articles.errMess}</h4>
            </div>
        );
    }
    else
    return (
        <div className={classes.root}>
          <DBNav/>
          <main className={classes.content}>
          <Paper className={classes.frame} elevation={1}>
          <List component="nav">
          {this.props.articles.articles.map((article)=>{
              return(
                <ListItem key={article.id} className={classes.item} button to={`/Dashboard/Article/${article.id}`} component={Link}>
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