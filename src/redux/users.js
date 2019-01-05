import * as ActionTypes from './ActionTypes';


export const Users = (state = {  
    errMess: null, 
    users:localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : null, 
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_USERS:
            return {...state,   errMess: null, users: action.payload};
        case ActionTypes.ADD_USER:
            var user = action.payload;
            var users = state.users.concat(user)
            return {...state, users: users};
        case ActionTypes.DELETE_USER:
            var index = state.users.findIndex(user=>user._id===action.payload)
            delete state.users[index]
            return {...state, users: state.users};
        case ActionTypes.USERS_FAILED:
            return {...state, errMess: action.payload, users: []};
         case ActionTypes.CLEAR_USERS:
            return {...state, errMess: null, users: []};
        default:
            return state;
    }
    
};