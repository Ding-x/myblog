import React, { Component } from 'react';
import "./Home.css";
import { baseUrl } from '../../shared/baseUrl';
import Image from 'react-bootstrap/lib/Image'
import { fadeIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
  bounce: {
    animation: 'x 2s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
}

class Home extends Component {
  render() {

    const link=baseUrl+"/images/home.jpg"
    return (
      <StyleRoot>
      <div  className="home-root">
        <div  className="home-box" style={styles.bounce} >
         <Image  src={link}  />
        </div>
      </div>
      </StyleRoot>

    );
  }
}


  
  export default Home;
