import axios from 'axios';
import { GET_ENTERPRISES, GET_DOMAINS, GET_SOLUTIONS, RESPONSE_LOADING} from './types';

export const getEnterprises = () => dispatch => {  //add integration for query here
  dispatch(setResponseLoading());
  axios
  .get('/api/enterprises/')
  .then(res =>
    dispatch({
      type: GET_ENTERPRISES,
      payload: res.data
    })
  )
};

export const getDomains = () => dispatch => {  //add integration for query here
  dispatch(setResponseLoading());
  axios
  .get('/api/enterprises/domains')
  .then(res =>
    dispatch({
      type: GET_DOMAINS,
      payload: res.data
    })
  )
};

export const getSolutions = () => dispatch => {  //add integration for query here
  dispatch(setResponseLoading());
  axios
  .get('/api/enterprises/solutions')
  .then(res =>
    dispatch({
      type: GET_SOLUTIONS,
      payload: res.data
    })
  )
};

export const setResponseLoading = () => {
  return{
    type: RESPONSE_LOADING
  }
}