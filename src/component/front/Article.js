import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Loading from '../LoadingComponent';



const styles =theme =>( {
    root:{
        paddingBottom:"5%",
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    frame:{
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        maxWidth: '1000px',
        margin:"80px auto 60px auto"
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
        lineHeight: '220%',
        wordBreak:'break-all'
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
    },
    header:{
        background:"#fafafa",
        height:"450px",
        padding:"6% 8%"
    },
    headerTitle:{
        fontSize:"64px",
        color:"#555"
    },
    subTitle:{
        color:"#777"
    }
  });


 
class Article extends Component {

    componentDidMount () {
        window.scrollTo(0, 0)
      }

  render() {


 function compare(a,b) {

    if (a.createdAt> b.createdAt)
      return -1;
    else
      return 1;
   
  }

this.props.articles.articles.sort(compare)

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
        <div className={classes.header}>
            <h1 className={classes.headerTitle}>Articles</h1>
            <h1 className={classes.subTitle}>筆記・書き物・Articles</h1>
        </div>
        {}
      {this.props.articles.articles.map((article)=>{
          var date = new Date(article.createdAt).toLocaleString()
          var content='';

          if(article.content.length<400){
              content=article.content
             
          }
          else{
            content=article.content.slice(0,399)+"..."
          }
          return(
            <Paper key={article._id} className={classes.frame} >
            <p className={classes.title}>
            {article.title}
            </p>
            <Divider  />
            <p className={classes.content} dangerouslySetInnerHTML={{ __html:content }} />
           
            <Divider  />
            <div className={classes.actionBar}>
                <Grid container spacing={24}>

                    <Grid className={classes.info} item xs={10}>
                  Posted by {article.author.username} on {date}
                    </Grid>

                    <Grid item xs={2}>
                    <Button className={classes.moreBtn} size="small" color="secondary" to={`/Article/${article._id}`} component={Link}>
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