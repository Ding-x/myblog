import * as ActionTypes from './ActionTypes';


export const Musics = (state = {  errMess:null, musics:[] }, action) => {
    switch(action.type){
        case ActionTypes.LOAD_MUSICS:
            return {...state,  errMess:null, musics: action.payload};
        case ActionTypes.ADD_MUSIC:
            var music = action.payload;
            return {...state,  errMess:null, musics: state.musics.concat(music)};
        case ActionTypes.DELETE_MUSIC:
            var index = state.musics.findIndex(music=>music._id===action.payload)
            delete state.musics[index]
            return {...state, errMess:null, musics: state.musics};
        // case ActionTypes.EDIT_ARTICLE:
        //     var index1 = state.articles.findIndex(article=>article._id===action.payload.id)
        //     state.articles[index1].title=action.payload.title;
        //     state.articles[index1].content=action.payload.content;
        //     return {...state, articles: state.articles};
        // case ActionTypes.ARTICLES_LOADING:
        //     return {...state, isLoading: true, errMess: null, articles: []}

        case ActionTypes.MUSICS_FAILED:
            return {...state,  errMess: action.payload, musics: []};
        default:
            return state;
    }
    
};