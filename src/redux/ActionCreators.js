import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';



export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload:  comment
    
});

export const postComment = (articleId, comment) => (dispatch) => {

    const newComment = {
        article: articleId,
        comment: comment
    }

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Your comment could not be posted\nError: '+ error.message); })
}

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});


export const deleteCommentsOfOneArticle = (id) => (dispatch) => {

   
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments/articles/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .catch(error => { console.log('Delete comments ', error.message);
        alert('Your comments could not be deleted\nError: '+ error.message); })
} 

//---------------------------------------------------------------------------------------------------------------
export const fetchArticles = () => (dispatch) => {
    dispatch(articlesLoading(true));

    return fetch(baseUrl +'articles')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(articles => dispatch(addArticles(articles)))
        .catch(error => dispatch(articlesFailed(error.message)));
}

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
    payload:  article
    
});

export const deleteAnArticle = (article) => ({
    type: ActionTypes.DELETE_ARTICLE,
    payload:  article
    
});

export const editAnArticle = (article) => ({
    type: ActionTypes.EDIT_ARTICLE,
    payload:  article
    
});


export const postArticle = (title, content) => (dispatch) => {

    const newArticle = {
        title: title,
        content: content,
    }

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'articles', {
        method: 'POST',
        body: JSON.stringify(newArticle),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addArticle(response)))
    .catch(error => { console.log('Post article ', error.message);
        alert('Your article could not be posted\nError: '+ error.message); })
} 


export const editArticle = (title, content,id) => (dispatch) => {

    const newArticle = {
        title: title,
        content: content,
        id:id
    }

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'articles/' + id, {
        method: 'PUT',
        body: JSON.stringify(newArticle),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(editAnArticle(newArticle)))
    .catch(error => { console.log('Post article ', error.message);
        alert('Your article could not be posted\nError: '+ error.message); })
} 

export const deleteArticle = (id) => (dispatch) => {

   
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'articles/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(deleteAnArticle(id)))
    .catch(error => { console.log('Post article ', error.message);
        alert('Your article could not be posted\nError: '+ error.message); })
} 

//---------------------------------------------------------------------------------------------------------------

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {

    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token,
        admin: response.admin
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {

        if (response.success) {
            // If login was successful, set the token in local storage

            
            localStorage.setItem('admin', response.admin);
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(receiveLogin(response));

            if(response.admin){           
                dispatch(fetchUsers())
            }
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;

            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    localStorage.removeItem('admin');
    localStorage.removeItem('users');
    dispatch(receiveLogout())
    dispatch(clearUsers())
}



//---------------------------------------------------------------------------------------------------------------

  
export const receiveSignup = (response) => {
    return {
        type: ActionTypes.SIGNUP_SUCCESS,
        token: response.token
    }
}
  
export const signupError = (message) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        message
    }
}

export const signupUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API

    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {

            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;

            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {

        if (response.success) {
            // Dispatch the success action
            dispatch(receiveSignup(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(signupError(error.message)))
};




//---------------------------------------------------------------------------------------------------------------
export const fetchUsers = () => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl +'users',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response=>{
            localStorage.setItem('users', JSON.stringify(response));
            dispatch(addUsers(response))

        })
        .catch(error => dispatch(usersFailed(error.message)));
}


export const addUsers = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users
});

export const usersFailed = (errmess) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errmess
});

export const clearUsers = () => ({
    type: ActionTypes.CLEAR_USERS,
});

export const deleteUser = (id) => (dispatch) => {

   
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'users/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(deleteAnUser(id)))
    .catch(error => { console.log('Delete user ', error.message);
        alert('Your user could not be deleted\nError: '+ error.message); })
} 

export const deleteAnUser = (id) => ({
    type: ActionTypes.DELETE_USER,
    payload:  id
    
});


//-----------------------------------------------------------------------------------------------


export const addMusic = (music) => ({
    type: ActionTypes.ADD_MUSIC,
    payload:  music
    
});

export const postMusic = (music) => (dispatch) => {


    const bearer = 'Bearer ' + localStorage.getItem('token');
    
    return fetch(baseUrl + 'musics', {
        method: 'POST',
        body: JSON.stringify(music),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        console.log(errmess)
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addMusic(response)))
    .catch(error => { console.log('Post music ', error.message);
        alert('Your music could not be posted\nError: '+ error.message); })
}


export const fetchMusics = () => (dispatch) => {
    return fetch(baseUrl + 'musics')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(musics => dispatch(addMusics(musics)))
        .catch(error => dispatch(musicsFailed(error.message)));
}

export const musicsFailed = (errmess) => ({
    type: ActionTypes.MUSICS_FAILED,
    payload: errmess
});

export const addMusics = (musics) => ({
    type: ActionTypes.LOAD_MUSICS,
    payload: musics
});


export const deleteMusic = (id) => (dispatch) => {

   
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'musics/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(deleteAMusic(id)))
    .catch(error => { console.log('Delete user ', error.message);
        alert('Your user could not be deleted\nError: '+ error.message); })
} 

export const deleteAMusic = (id) => ({
    type: ActionTypes.DELETE_MUSIC,
    payload:  id
    
});