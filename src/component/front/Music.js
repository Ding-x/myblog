import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { baseUrl } from '../../shared/baseUrl';
import MusicPlayer from 'react-responsive-music-player'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingBottom:"5%",
    // padding:'5% 15%',
  },

  musicplayer:{
    padding:'5% 0%',
    //backgroundColor: '#81D8D0',
    width:'1000px',
    margin:'100px auto',
    boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
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

const playlist = [
  {
    url:  baseUrl+"/music/yuhao.mp3",
    cover: baseUrl+"/images/yuhao.jpg",
    title: 'Nice Rain',
    artist: [
      'Xiao'
    ]
  },
  {
    url:  baseUrl+"/music/light.mp3",
    cover: baseUrl+"/images/light.jpg",
    title: 'Light',
    artist: [
      'Xiao'
    ]
  },
]

class Music extends Component {

  
  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
       <div className={classes.header}>
            <h1 className={classes.headerTitle}>Works</h1>
            <h1 className={classes.subTitle}>作品・ワークス・Works</h1>
        </div>

        <div className={classes.musicplayer} >
        <MusicPlayer  playlist={playlist} autoplay/>
          
        </div>
      </div>
    );
  }
}

Music.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(styles,{ withTheme: true })(Music);
