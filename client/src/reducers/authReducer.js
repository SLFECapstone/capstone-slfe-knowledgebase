import {
    LOAD_USER,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
  } from '../actions/types';
  
  const initialState = {
    token: null,
    isAuthenticated: false,
    user: null
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOAD_USER:
          if (sessionStorage.getItem('user')) {
            let parsedData = JSON.parse(sessionStorage.getItem('user'));
            return {
              ...state,
              token: sessionStorage.getItem('token'),
              isAuthenticated: true,
              user: parsedData
            }
          } else {
            return {
              ...state
            }
          }
      case LOGIN_SUCCESS:
        sessionStorage.setItem('token', action.payload.token)
        sessionStorage.setItem('user', JSON.stringify(action.payload.user))
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user
        }
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          user: null
        }
      default:
        return state;
    }
  }
  