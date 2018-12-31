import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Articles} from './articles';
import {Comments} from './comments';
import {Auth} from './auth';
import {Signup} from './signup';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            articles: Articles,
            comments: Comments,
            auth:Auth,
            signup:Signup
        }),
        applyMiddleware(thunk)
    );

    return store;
}