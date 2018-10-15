import React, { Component } from 'react';
import Article from './Article';
import Home from './Home';
import Music from './Music';
import Header from './Header';
import Footer from './Footer';
import About from './About';
import {Switch, Route, Redirect} from 'react-router-dom';


class Main extends Component {
  render() {
    return (
      <div >
          <Header/>
            <Switch>
                <Route path='/Home' component={Home} />
                <Route exact path='/Article' component={Article} />
                <Route exact path='/Music' component={Music} />
                <Route exact path='/About' component={About} />
                <Redirect to="/home" />
            </Switch>
            <Footer/>
      </div>
    );
  }
}

export default Main;
