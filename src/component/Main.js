import React, { Component } from 'react';
import Article from './Article';
import Home from './Home';
import Music from './Music';
import Header from './Header';
import Footer from './Footer';
import About from './About';
import SingleArticle from './SingleArticle';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Articles} from './sample';


class Main extends Component {
  render() {

    const articleWihID = ({match}) => {
        return(
            <SingleArticle article={Articles.filter((article) => article.id === parseInt(match.params.id,10))[0]} />
        );
      };


    return (
      <div >
          <Header/>
            <Switch>
                <Route path='/Home' component={Home} />
                <Route exact path='/Article' component={()=><Article articles={Articles}/> }/>
                <Route path='/Article/:id' component={articleWihID} />
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
