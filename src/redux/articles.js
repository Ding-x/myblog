import * as ActionTypes from './ActionTypes';


export const Articles = (state = { isLoading: true,
    errMess: null,
    articles:[]}, action) => {
    switch(action.type){
        case ActionTypes.ADD_ARTICLES:
        // console.log(action.payload.filter((article)=>article.id===2)[0]);
        // action.payload.filter((article)=>article.id===2)[0].title='hahah';
        // console.log(action.payload.filter((article)=>article.id===2)[0]);
            return {...state, isLoading: false, errMess: null, articles: action.payload};

        case ActionTypes.ARTICLES_LOADING:
            return {...state, isLoading: true, errMess: null, articles: []}

        case ActionTypes.ARTICLES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        case ActionTypes.ADD_ARTICLE:
            var article =action.payload;;
            return {...state, articles:state.articles.concat(article)};
      
        default:
            return state;
    }
    
};

