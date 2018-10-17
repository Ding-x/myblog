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
import {deleteArticle, editArticle, postComment,postArticle,fetchArticles, fetchComments} from '../redux/ActionCreators';


const mapStateToProps = state => {
  return {
    articles: state.articles,
    comments: state.comments,
  }
}

const mapDispatchToProps = dispatch => ({
  deleteArticle:(id)=> dispatch(deleteArticle(id)),
  editArticle: (title,content,id,author)=> dispatch(editArticle(title,content,id,author)),
  postComment: (articleId, comment) => dispatch(postComment(articleId, comment)),
  postArticle: (titlle,content) => dispatch(postArticle(titlle,content)),
  fetchArticles: () => { dispatch(fetchArticles())},
  fetchComments: () => dispatch(fetchComments()),

});

class Main extends Component {

  componentDidMount() {
    this.props.fetchArticles();
    this.props.fetchComments();

  }


  render() {

    //console.log(this.props);
    const articleWihID = ({match}) => {

        return(
            <SingleArticle 
            article={this.props.articles.articles.filter((article) => article.id === parseInt(match.params.id,10))[0]}
            isLoading={this.props.articles.isLoading}
            errMess={this.props.articles.errMess}
            comments={this.props.comments.comments.filter((comments) => comments.articleId === parseInt(match.params.id,10))}
            commentErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
            
            />
        );
      };

      const editArticleWihID = ({match}) => {

        return(
            <DBSingleArticle 
            article={this.props.articles.articles.filter((article) => article.id === parseInt(match.params.id,10))[0]}
            isLoading={this.props.articles.isLoading}
            errMess={this.props.articles.errMess}
            postArticle={this.props.postArticle}
            editArticle={this.props.editArticle}
            deleteArticle={this.props.deleteArticle}
            isNew={false}
            />
        );
      };

      var str=""+this.props.location.pathname;
      var isDashboard=str.search("Dashboard");

    return (
      <div >
        <Header isDashboard={isDashboard}/>
            <Switch>
                <Route path='/Home' component={Home} />
                <Route exact path='/Article' component={()=><Article articles={this.props.articles}/> }/>
                <Route path='/Article/:id' component={articleWihID} />
                <Route exact path='/Music' component={Music} />
                <Route exact path='/About' component={About} />
                <Route exact path='/Dashboard/Home' component={DBHome} />
                <Route exact path='/Dashboard/Article' component={()=><DBArticle articles={this.props.articles} />} />
                <Route path='/Dashboard/Article/:id' component={editArticleWihID} />
                <Route exact path='/Dashboard/NewArticle' component={()=><DBSingleArticle article={null}
            isLoading={null}
            errMess={null}
            postArticle={this.props.postArticle}
            editArticle={this.props.editArticle}
            isNew={true} />} />

                <Redirect to="/home" />
            </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
