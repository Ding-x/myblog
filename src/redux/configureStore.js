import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Articles} from './articles';
import {Comments} from './comments';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            articles: Articles,
            comments: Comments,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}