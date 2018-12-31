import * as ActionTypes from './ActionTypes';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export const Signup = (state = {
        errMess: null,
        isSignup:false
    }, action) => {
    switch (action.type) {
        case ActionTypes.SIGNUP_SUCCESS:
            return {...state,errMess: null,isSignup:true};
        case ActionTypes.SIGNUP_FAILURE:
            return {...state,errMess: action.message,isSignup:false};
        default:
            return state;
    }
}