import * as ActionTypes from './ActionTypes';


export const Articles = (state = { 
    isLoading: true,
    errMess: null,
    articles:[]}, action) => {
    switch(action.type){
        case ActionTypes.ADD_ARTICLES:
            return {...state, isLoading: false, errMess: null, articles: action.payload};
        case ActionTypes.ADD_ARTICLE:
            var article = action.payload;
            return {...state, articles: state.articles.concat(article)};
        case ActionTypes.DELETE_ARTICLE:
            var index = state.articles.findIndex(article=>article._id===action.payload)
            delete state.articles[index]
            return {...state, articles: state.articles};
        case ActionTypes.ARTICLES_LOADING:
            return {...state, isLoading: true, errMess: null, articles: []}

        case ActionTypes.ARTICLES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, articles: []};
        default:
            return state;
    }
    
};