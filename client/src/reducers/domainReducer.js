import {GET_DOMAIN_ENTRIES,RESPONSE_LOADING} from '../actions/types';

const initialState = {
  domains: [],
  loading: false
};

export default function( state = initialState, action){
  switch(action.type){
    case GET_DOMAIN_ENTRIES:
      return{
        ...state,
        domains: action.payload,
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