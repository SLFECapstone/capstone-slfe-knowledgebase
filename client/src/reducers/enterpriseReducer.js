import {GET_ENTERPRISES, GET_DOMAINS, GET_SOLUTIONS, RESPONSE_LOADING} from '../actions/types';

const initialState = {
  enterprises: [],
  domains: [],
  solutions: [],
  loading: false
};

export default function( state = initialState, action){
  switch(action.type){
    case GET_ENTERPRISES:
      return{
        ...state,
        enterprises: action.payload,
        loading: false
      };
    case GET_DOMAINS:
      return{
        ...state,
        domains: action.payload,
        loading: false
    };
    case GET_SOLUTIONS:
      return{
        ...state,
        solutions: action.payload,
        loading: false
    };
    case RESPONSE_LOADING:
      return{
        ...state,
        loading: true
      };
    default:
      return state;
  }
}