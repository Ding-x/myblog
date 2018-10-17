import * as ActionTypes from './ActionTypes';

function getNextId(obj) {
    return (Math.max.apply(Math, obj.map(function(o) {
      return o.id;
    })) + 1);
  }

export const Comments = (state = {
    errMess:null,
    comments:[]}, action) => {
    switch(action.type){
        // case ActionTypes.ADD_COMMENT:
        //     var comment = action.payload;
        //     comment.id = getNextId(state);
        //     comment.date = new Date().toISOString();
        //     return state.concat(comment);
        // default:
        //     return state;
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading:false, errMess:null, comments:action.payload};
        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading:false, errMess:action.payload};
        case ActionTypes.ADD_COMMENT:
            var comment =action.payload;
            return {...state, comments:state.comments.concat(comment)};
        default:
            return state;
    }
    
};