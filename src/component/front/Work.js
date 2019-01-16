import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    paddingBottom:"5%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  
  
  header:{
    background:"#fafafa",
    height:"400px",
    padding:"6% 8%",
    [theme.breakpoints.down('sm')]: {
        height:"300px",
        padding:"26% 8%",
      },
},
headerTitle:{
    fontSize:"64px",
    color:"#555",
    [theme.breakpoints.down('sm')]: {
        fontSize:"36px",
      },
},
subTitle:{
    color:"#777",
    [theme.breakpoints.down('sm')]: {
        fontSize:"24px",
      },
},
workbody:{
  padding:'0% 15%',
    width:'100%',
    margin:'40px auto 300px auto',
    height:'1300px'

},
card: {
  maxWidth: 500,
  minWidth: 300,
  float:"left",
  margin:'40px 80px',
  height:470
},
media: {
  objectFit: 'cover',
},
});




class Work extends Component {

  
  render() {

    const { classes } = this.props;

    const projects = [
      {
        "src":"http://www.romaincousin.fr/2048/img/fb-2048-animated-edition-romain-cousin.png",
        "imgtitle":"2048 Game",
        "title":"2048 Game",
        "description":"A sliding block puzzle game made by ReactNative.",
        "link":"https://github.com/Ding-x/2048",
        "demo":"https://reatc2048.herokuapp.com"
      },
      {
        "src":"https://www.ecampusnews.com/files/2016/01/blogs.jpg",
        "imgtitle":"Multi-user Blog",
        "title":"Multi-user Blog",
        "description":"Yes, it is this website.",
        "link":"https://github.com/Ding-x/myblog",
        "demo":"http://xiaop.ca"
      },
      {
        "src":"http://odude.com/demo/faq/wp-content/uploads/sites/2/2017/12/grid.png",
        "imgtitle":"Shopify Image Gallery",
        "title":"Shopify Image Gallery",
        "description":"An embedded Shopify image gallery to benefit users browsing and managing posted images.",
        "link":"https://github.com/Ding-x/image-gallery",
        "demo":null
      },
      {
        "src":"http://umanitoba.ca/about/media/admin_bldg_sunrise.jpg",
        "imgtitle":"UMUTOS",
        "title":"UMUTOS",
        "description":"An Amazon-like e-commerce Android application ",
        "link":"https://github.com/Ding-x/UMUTOS",
        "demo":null
      }
      ,
      {
        "src":"https://msdnshared.blob.core.windows.net/media/2017/01/servers.jpg",
        "imgtitle":"Golang Serve",
        "title":"Golang Serve",
        "description":"A concurrent server in Go",
        "link":"https://github.com/Ding-x/go-server",
        "demo":null
      }
      ,
      {
        "src":"http://friendshiprestaurant.com/wp-content/uploads/2014/05/friendship-restaurant-dining-room.jpg",
        "imgtitle":"Chinese Restaurant EPOS",
        "title":"Chinese Restaurant EPOS",
        "description":"Chinese restaurants Ordering System to guide various ethnic groups to complete their orders on the strength of their divers eating custom. ",
        "link":"https://github.com/Ding-x/restaurant-EPOS",
        "demo":null
      }]

    const ImgMediaCard =(data)=> {
      const project = data.data
      return (
        <Card className={classes.card}>
          <CardActionArea >
            <CardMedia
              component="img"
              alt={project.imgtitle}
              className={classes.media}
              height="300"
              image={project.src}
              title={project.imgtitle}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              {project.title}
              </Typography>
              <Typography component="p">
              {project.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>

            <Button href={project.link} size="small" color="primary"> Github </Button>
            {project.demo!=null? <Button href={project.demo} size="small" color="primary"> Demo </Button>:null}
          </CardActions>
        </Card>
      );
    }
    

    return (
      <div className={classes.root}>
       <div className={classes.header}>
            <h1 className={classes.headerTitle}>Works</h1>
            <h1 className={classes.subTitle}>作品・ワークス・Works</h1>
        </div>
        <div className={classes.workbody}>
        {projects.map((project,index)=>{
          return(
            <ImgMediaCard data={project} key={index}/>
          )
        })}

        </div>


        
      </div>
    );
  }
}

Work.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(styles,{ withTheme: true })(Work);
