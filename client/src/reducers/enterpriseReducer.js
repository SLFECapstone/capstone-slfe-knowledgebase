import {GET_ENTERPRISES, GET_DOMAINS, GET_SOLUTIONS, GET_BYID, GET_FIELD, GET_CUSTOM,
        UPDATE_SOLUTION, RESPONSE_LOADING} from '../actions/types';

const initialState = {
  enterprises: [],
  domains: [],
  solutions: [],
  singleSolution: [],
  field: [],
  custom: [],
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
    case UPDATE_SOLUTION:
      return {
        ...state,
        singleSolution: action.payload,
        loading: false
      };
    case GET_BYID:
      return{
        ...state,
        singleSolution: action.payload,
        loading: false
    };
    case GET_FIELD:
      return{
        ...state,
        field: action.payload,
        loading: false
    };
    case GET_CUSTOM:
      return{
        ...state,
        custom: action.payload,
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
