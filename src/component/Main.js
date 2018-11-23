import React, { Component } from 'react';

import Article from './front/Article';
import Home from './front/Home';
import Music from './front/Music';
import Header from './front/Header';
import Footer from './front/Footer';
import About from './front/About';
import SingleArticle from './front/SingleArticle';

import DBHome from './dashboard/DBHome';
import DBArticle from './dashboard/DBArticle';
import DBSingleArticle from './dashboard/DBSingleArticle';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { postComment, fetchArticles, fetchComments,loginUser, logoutUser } from '../redux/ActionCreators';



const mapStateToProps = state => {
  console.log(state)
  return {
    articles: state.articles,
    comments: state.comments,
    auth:state.auth
  }
}

const mapDispatchToProps = dispatch => ({
  
  fetchArticles: () => { dispatch(fetchArticles())},
  
  postComment: (articleId, comment) => dispatch(postComment(articleId, comment)),
  fetchComments: () => {dispatch(fetchComments())},

  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),

});

class Main extends Component {

  componentDidMount() {
    this.props.fetchArticles();
    this.props.fetchComments();

  }

  render() {
    const articleWihID = ({match}) => {
        return(
            <SingleArticle 
            article={this.props.articles.articles.filter((article) => article._id === match.params.id,10)[0]}
            isLoading={this.props.articles.isLoading}
            errMess={this.props.articles.errMess}
            comments={this.props.comments.comments.filter((comments) => comments.article._id === match.params.id,10)}
            postComment={this.props.postComment}
            />
        );
      };

      const editArticleWihID = ({match}) => {

        return(
            <DBSingleArticle 
            article={this.props.articles.articles.filter((article) => article._id === parseInt(match.params.id,10))[0]}
            isLoading={this.props.articles.isLoading}
            errMess={this.props.articles.errMess}
            />
        );
      };

      var str=""+this.props.location.pathname;
      var isDashboard=str.search("Dashboard");

      return (
      <div >
        <Header isDashboard={isDashboard} auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser} />
            <Switch>
                <Route path='/Home' component={Home} />
                <Route exact path='/Article' component={()=><Article articles={this.props.articles}/> }/>
                <Route path='/Article/:id' component={articleWihID} />
                <Route exact path='/Music' component={Music} />
                <Route exact path='/About' component={About} />

                <Route exact path='/Dashboard/Home' component={DBHome} />
                <Route exact path='/Dashboard/Article' component={()=><DBArticle articles={this.props.articles}/>} />
                <Route path='/Dashboard/Article/:id' component={editArticleWihID} />

                <Redirect to="/home" />
            </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
