import axios from 'axios';
import {GET_USER_UPDATE_PASSWORD, GET_USER_SESSION, GET_USER_REGISTER, RESPONSE_LOADING} from './types';

export const getUserSession = (username, password) => dispatch => {  //add integration for query here
  dispatch(setResponseLoading());
  return axios
  .get(`/api/users/account/${username}/${n}`)
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