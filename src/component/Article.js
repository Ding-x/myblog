import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';



const styles =theme =>( {
    root:{
        padding:'3%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    frame:{
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        maxWidth: '70%',
        margin:"10px auto 60px auto"
    },
    title:{
        margin:"20px auto 30px auto",
        textAlign:'center',
        fontSize:'22px',
        fontStyle:'bold'
    },
    content:{
        margin:"20px auto 20px auto",
        padding:'10px 5%',
        fontSize:'18px',
        color:'#222',
        lineHeight: '150%'
    },
    actionBar:{
        margin:"20px auto 10px auto",

    },
    moreBtn:{
       float:'right'
    },
    info:{
        color:'#aaa',
        fontStyle:'italic',
        fontSize:14,
        marginTop:8
    }
  });


 
class Article extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      {this.props.articles.map((article)=>{
          return(
            <Paper key={article.id} className={classes.frame} >
            <p className={classes.title}>
            {article.title}
            </p>
            <Divider/>
            <p className={classes.content}>
            {article.content}
            </p>
            <Divider/>
            <div className={classes.actionBar}>
                <Grid container spacing={24}>

                    <Grid className={classes.info} item xs={10}>
                  Posted by {article.author} on {article.date}
                    </Grid>

                    <Grid item xs={2}>
                    <Button className={classes.moreBtn} size="small" color="secondary" to={`/Article/${article.id}`} component={Link}>
                    More...
                </Button>
                    </Grid>
                </Grid>

            </div>

          </Paper>
          )
      })}
        
      </div>
    );
  }
}

Article.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Article);