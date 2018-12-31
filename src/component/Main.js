import React, { Component } from 'react';

import Article from './front/Article';
import Home from './front/Home';
import Music from './front/Music';
import Header from './front/Header';
import Footer from './front/Footer';
import About from './front/About';
import SingleArticle from './front/SingleArticle';
import Login from './front/Login';
import Signup from './front/Signup';

import DBHome from './dashboard/DBHome';
import DBArticle from './dashboard/DBArticle';
import DBSingleArticle from './dashboard/DBSingleArticle';
import DBNewArticle from './dashboard/DBNewArticle';


import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {postArticle,editArticle, deleteArticle, postComment, fetchArticles, fetchComments,deleteCommentsOfOneArticle, loginUser, logoutUser, signupUser } from '../redux/ActionCreators';



const mapStateToProps = state => {

  return {
    articles: state.articles,
    comments: state.comments,
    auth:state.auth,
    signup:state.signup
  }
}

const mapDispatchToProps = dispatch => ({
  
  fetchArticles: () => { dispatch(fetchArticles())},
  postArticle:(title, content) => dispatch(postArticle(title, content)),
  postComment: (articleId, comment) => dispatch(postComment(articleId, comment)),
  fetchComments: () => {dispatch(fetchComments())},
  editArticle:(title, content,id)=>{dispatch(editArticle(title, content,id))},
  deleteArticle:(id)=>{dispatch(deleteArticle(id))},
  deleteCommentsOfOneArticle:(id)=>{dispatch(deleteCommentsOfOneArticle(id))},
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  signupUser: (creds) => dispatch(signupUser(creds)),

});

class Main extends Component {

  componentDidMount() {
    this.props.fetchArticles();
    this.props.fetchComments();

  }

  render() {

    const articleWihID = ({match}) => {

      function checkComments(value,index,array){
        
            if(value!=null ){
              if(value.article!=null){
                 return value.article._id===match.params.id;
              }
              
            }
      }
        return(
            <SingleArticle 
            article={this.props.articles.articles.filter((article) => article._id === match.params.id,10)[0]}
            isLoading={this.props.articles.isLoading}
            errMess={this.props.articles.errMess}
            comments={this.props.comments.comments.filter(checkComments)}
            postComment={this.props.postComment}
            auth={this.props.auth}

            />
        );
      };

      const editArticleWihID = ({match}) => {
        var articles = this.props.articles.articles.filter((article) => article.author.username === this.props.auth.user.username);

        return(
            <DBSingleArticle 
            article={articles.filter((article) => article._id === match.params.id,10)[0]}
            isLoading={this.props.articles.isLoading}
            errMess={this.props.articles.errMess}
            editArticle={this.props.editArticle}
            deleteArticle={this.props.deleteArticle}
            deleteCommentsOfOneArticle={this.props.deleteCommentsOfOneArticle}

            />
        );
      };

      var str=""+this.props.location.pathname;
      var isDashboard=str.search("Dashboard");

      return (
      <div >
        <Header isDashboard={isDashboard} 
                auth={this.props.auth} 
                loginUser={this.props.loginUser} 
                logoutUser={this.props.logoutUser}
                signup={this.props.signup} 
                signupUser={this.props.signupUser}
                />
            <Switch history={this.props.history}>
                <Route path='/Home' component={Home} />
                <Route exact path='/Article' component={()=><Article articles={this.props.articles}/> }/>
                <Route path='/Article/:id' component={articleWihID} />
                <Route exact path='/Music' component={Music} />
                <Route exact path='/About' component={About} />
                <Route exact path='/Login' component={()=><Login loginUser={this.props.loginUser} auth={this.props.auth} />} />
                <Route exact path='/Signup' component={()=><Signup  signup={this.props.signup}  signupUser={this.props.signupUser}  />} />

                <Route exact path='/Dashboard/Home' component={DBHome} />
                <Route exact path='/Dashboard/Article' component={()=><DBArticle 
                article={this.props.articles.articles.filter((article) => article.author.username === this.props.auth.user.username)}/>}
                isLoading={this.props.articles.isLoading}
                errMess={this.props.articles.errMess} />
                <Route path='/Dashboard/Article/:id' component={editArticleWihID} />
                <Route path='/Dashboard/NewArticle' component={()=><DBNewArticle auth={this.props.auth} postArticle={this.props.postArticle}/> } />

                <Redirect to="Home" />
            </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
