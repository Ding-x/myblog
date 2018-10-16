import * as ActionTypes from './ActionTypes';
import { ARTICLES} from '../shared/sample';


export const addComment = (articleId, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        articleId: articleId,
        comment: comment
    }
});

export const fetchArticles = () => (dispatch) => {

    dispatch(articlesLoading(true));

    setTimeout(() => {
        dispatch(addArticles(ARTICLES));
    }, 1000);
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