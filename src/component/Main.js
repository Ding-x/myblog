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
import Work from './front/Work';

import DBHome from './dashboard/DBHome';
import DBUser from './dashboard/DBUser';
import DBArticle from './dashboard/DBArticle';
import DBSingleArticle from './dashboard/DBSingleArticle';
import DBNewArticle from './dashboard/DBNewArticle';
import DBMusic from './dashboard/DBMusic';


import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {postArticle,editArticle, deleteArticle, postComment, 
        fetchArticles, fetchComments,deleteCommentsOfOneArticle, 
        loginUser, logoutUser, signupUser, fetchUsers, deleteUser,
        postMusic,fetchMusics,deleteMusic} from '../redux/ActionCreators';



const mapStateToProps = state => {

  return {
    articles: state.articles,
    comments: state.comments,
    auth:state.auth,
    signup:state.signup,
    users:state.users,
    musics:state.musics
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
  fetchUsers: () => { dispatch(fetchUsers())},
  deleteUser:(id)=>{dispatch(deleteUser(id))},
  postMusic:(music)=>{dispatch(postMusic(music))},
  fetchMusics: () => { dispatch(fetchMusics())},
  deleteMusic:(id)=>{dispatch(deleteMusic(id))},

});

class Main extends Component {

    componentDidMount() {
      this.props.fetchArticles();
      this.props.fetchComments();
      if(localStorage.getItem('admin')==="true"){
        this.props.fetchUsers();
      }
      this.props.fetchMusics();
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
        var articles = this.props.auth.admin? 
                       this.props.articles.articles:
                       this.props.articles.articles.filter((article) => article.author.username === this.props.auth.user.username);

        return(
            <DBSingleArticle 
            article={articles.filter((article) => article._id === match.params.id,10)[0]}
            isLoading={this.props.articles.isLoading}
            errMess={this.props.articles.errMess}
            editArticle={this.props.editArticle}
            deleteArticle={this.props.deleteArticle}
            deleteCommentsOfOneArticle={this.props.deleteCommentsOfOneArticle}
            auth={this.props.auth} 
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

                <Route exact path='/Work' component={()=><Work musics={this.props.musics}/> } />

                <Route exact path='/Article' component={()=><Article articles={this.props.articles}/> }/>

                <Route path='/Article/:id' component={articleWihID} />
                
                <Route exact path='/Music' component={()=><Music musics={this.props.musics}/> } />

                <Route exact path='/About' component={About} />

                <Route exact path='/Login' component={()=><Login loginUser={this.props.loginUser} auth={this.props.auth} />} />

                <Route exact path='/Signup' component={()=><Signup  signup={this.props.signup}  signupUser={this.props.signupUser}  />} />

                <Route exact path='/Dashboard/Home' component={()=><DBHome 
                auth={this.props.auth}
              
                 /> } />

                <Route exact path='/Dashboard/Music' component={()=><DBMusic 
                musics={this.props.musics}
                auth={this.props.auth}
                postMusic={this.props.postMusic}
                deleteMusic={this.props.deleteMusic}
                 /> } />

                <Route exact path='/Dashboard/Users' component={()=><DBUser 
                articles={this.props.articles} 
                auth={this.props.auth}
                users={this.props.users}
                deleteUser={this.props.deleteUser}
                 /> } />
                
                <Route exact path='/Dashboard/Article' component={()=><DBArticle 
                article={this.props.auth.admin? this.props.articles.articles:this.props.articles.articles.filter((article) => article.author.username === this.props.auth.user.username)}
                isLoading={this.props.articles.isLoading}
                errMess={this.props.articles.errMess}
                auth={this.props.auth}/>}
                 />

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
