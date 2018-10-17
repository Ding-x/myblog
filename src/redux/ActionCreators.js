import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
    
});

export const postComment=(articleId, comment) =>(dispatch)=> {
    const newComment={
        articleId:articleId,
        comment:comment
    }

    newComment.date=new Date().toISOString();

    return fetch(baseUrl+'COMMENTS',{
        method:'POST',
        body:JSON.stringify(newComment),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    })
        .then(response=>{
            if (response.ok){
                return response;
            }
            else{
                var error = new Error('Error '+response.status + ': '+response.statusText);
                error.response=response;
                throw error;
            }
        },
        error=>{
            var errmess=new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response=>dispatch(addComment(response)))
        .catch(error=>{console.log('Post message',error.message);alert(error.message)})
            
}

export const fetchComments = () => (dispatch) =>{    
    return fetch(baseUrl+'COMMENTS')
        .then(response=>{
            if (response.ok){
                return response;
            }
            else{
                var error = new Error('Error '+response.status + ': '+response.statusText);
                error.response=response;
                throw error;
            }
        },
        error=>{
            var errmess=new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(comments=>dispatch(addComments(comments)))
        .catch(error=>dispatch(commentsFailed(error.message)))

};

export const commentsFailed=(errmess)=>({
    type:ActionTypes.COMMENTS_FAILED,
    payload:errmess
});

export const addComments=(comments)=>({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
});

export const fetchArticles = () => (dispatch) => {

    dispatch(articlesLoading(true));

    return fetch(baseUrl+'ARTICLES')
    .then(response=>{

        if (response.ok){
            console.log(response)

            return response;
        }
        else{
            var error = new Error('Error '+response.status + ': '+response.statusText);
            error.response=response;
            throw error;
        }
    },
    error=>{
        var errmess=new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(articles=>dispatch(addArticles(articles)))
    .catch(error=>dispatch(articlesFailed(error.message)))
};

export const articlesLoading = () => ({
    type: ActionTypes.ARTICLES_LOADING
});

export const articlesFailed = (errmess) => ({
    type: ActionTypes.ARTICLES_FAILED,
    payload: errmess
});

export const addArticles = (articles) => ({
    type: ActionTypes.ADD_ARTICLES,
    payload: articles
});

export const addArticle = (article) => ({
    type: ActionTypes.ADD_ARTICLE,
    payload: article
    
});

export const postArticle=(title,content) =>(dispatch)=> {
    const newArticle={
        title:title,
        content:content
    }

    newArticle.date=new Date().toISOString();
    newArticle.author="Ding";

    return fetch(baseUrl+'ARTICLES',{
        method:'POST',
        body:JSON.stringify(newArticle),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    })
        .then(response=>{
            if (response.ok){
                return response;
            }
            else{
                var error = new Error('Error '+response.status + ': '+response.statusText);
                error.response=response;
                throw error;
            }
        },
        error=>{
            var errmess=new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response=>dispatch(addArticle(response)))
        .catch(error=>{console.log('Post message',error.message);alert('Post message'+error.message)})
            
}

export const editArticle=(title,content,id, author) =>(dispatch)=> {
    return fetch(baseUrl+'ARTICLES/'+id,{
        method:'PUT',
        body:JSON.stringify({
            'title':title,
            'content':content,
            'date':new Date().toISOString(),
            'author':author
        }),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    })

        .then(function(response) {
            return response.json()
          }).then(function(json) {
            console.log('parsed json: ', json)
          }).catch(function(ex) {
            console.log('parsing failed: ', ex)
          })
            
}

export const deleteArticle=(id) =>(dispatch)=> {
    return fetch(baseUrl+'ARTICLES/'+id,{
        method:'delete'
    })
        .then(function(response) {
            return response.json()
          }).then(function(json) {
            console.log('parsed json: ', json)
          }).catch(function(ex) {
            console.log('parsing failed: ', ex)
          })
            
}
