import {COMMENTS} from '../shared/sample';
import * as ActionTypes from './ActionTypes';

function getNextId(obj) {
    return (Math.max.apply(Math, obj.map(function(o) {
      return o.id;
    })) + 1);
  }

export const Comments = (state = COMMENTS, action) => {
    switch(action.type){
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = getNextId(state);
            comment.date = new Date().toISOString();
            return state.concat(comment);
        default:
            return state;
    }
    
};