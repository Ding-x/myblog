import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { baseUrl } from '../../shared/baseUrl';
import MusicPlayer from '../ultils/MusicPlayer'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingBottom:"5%",
  },
  musicplayer:{
    padding:'5% 0%',
    width:'1200px',
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


class Music extends Component {

  
  render() {

    const { classes } = this.props;
    const playlist=[];

    if(this.props.musics.musics.length>0){
      this.props.musics.musics.map((music)=>{
        const artist=[]
        artist.push(music.author)
        const newmusic={
          title:music.title,
          artist:artist,
          url:baseUrl+music.musicpath,
          cover:baseUrl+music.imagepath
        }
        playlist.push(newmusic)
        return 0;
        
      })
    }

    return (
      <div className={classes.root}>
       <div className={classes.header}>
            <h1 className={classes.headerTitle}>Works</h1>
            <h1 className={classes.subTitle}>作品・ワークス・Works</h1>
        </div>

        <div className={classes.musicplayer} >
        {playlist.length>0? <MusicPlayer  playlist={playlist} autoplay/>: null  }
  
          
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
