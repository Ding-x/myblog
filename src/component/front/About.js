import React, { Component } from 'react';
import "./About.css";
import { Container, Row, Col } from 'reactstrap';
import Image from 'react-bootstrap/lib/Image'
import { baseUrl } from '../../shared/baseUrl';
import { bounce } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
  bounce: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounce, 'bounce')
  }
}

class About extends Component {
  render() {
    const link1 = baseUrl+"/images/selfie.jpg";

    return (
      <StyleRoot>

      <div className="about-root">
       <div className="about-header">
            <h1 className="about-headerTitle">About</h1>
            <h1 className="about-subTitle">關於・について・About</h1>
      </div>
      <div className="about-body">
      <Container>
        <Row>
          <Col xs={6} md={5}>
            <Image src={link1} thumbnail />
          </Col>
          <Col xs={6} md={2}> </Col>
          <Col xs={6} md={5}>
            <h1>Xiao Peng</h1>
            <h6>Programmer | Song-writer</h6>
            <a href='mailto:pengx345@myumanitoba.com' className="mail-icon"><i className="fas fa-envelope mail-icon"></i>pengx345@myumanitoba.com</a>
            <br></br>
            <a href='https://github.com/Ding-x'><i className="fab fa-github self-icon"  style={styles.bounce} ></i></a>
            <a href='https://www.linkedin.com/in/xiaopeng0202/'><i className="fab fa-linkedin self-icon"  style={styles.bounce}></i></a>
            <a href='https://music.163.com/#/artist?id=12027469'><i className="fas fa-headphones self-icon"  style={styles.bounce}></i></a>
          </Col>
        </Row>
      </Container>
      </div>
      </div>
      </StyleRoot>

    );
  }
}

export default About;