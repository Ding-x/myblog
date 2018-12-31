import React, { Component } from 'react';
import "./Home.css";
import { baseUrl } from '../../shared/baseUrl';
import Image from 'react-bootstrap/lib/Image'


class Home extends Component {
  render() {

    const link=baseUrl+"/images/home.jpg"
    return (
      <div  className="home-root">
        <div  className="home-box">
         <Image src={link}  />
        </div>
      </div>
    );
  }
}


  
  export default Home;
