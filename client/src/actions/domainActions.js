import axios from 'axios';
import {GET_DOMAIN_ENTRIES, RESPONSE_LOADING} from './types';

export const getDomainEntries = () => dispatch => {  //add integration for query here
  dispatch(setResponseLoading());
  return axios
  .get('/api/domains/')
  .then(res =>
    dispatch({
      type: GET_DOMAIN_ENTRIES,
      payload: res.data
    })
  )
};

export const setResponseLoading = () => {
  return{
    type: RESPONSE_LOADING
  }
}