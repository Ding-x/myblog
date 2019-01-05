import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Articles} from './articles';
import {Comments} from './comments';
import {Users} from './users';
import {Musics} from './musics';
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
            signup:Signup,
            users:Users,
            musics:Musics
        }),
        applyMiddleware(thunk)
    );

    return store;
}