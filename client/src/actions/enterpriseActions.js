import axios from 'axios';
import { GET_ENTERPRISES, GET_DOMAINS, GET_SOLUTIONS, ADD_SOLUTION, GET_BYID, GET_FIELD,  RESPONSE_LOADING, GET_CUSTOM} from './types';

export const getEnterprises = () => dispatch => {  //add integration for query here
  dispatch(setResponseLoading());
  return axios
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
  return axios
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
  return axios
  .get('/api/enterprises/solutions')
  .then(res =>
    dispatch({
      type: GET_SOLUTIONS,
      payload: res.data
    })
  )
};

export const addSolutionFunc = (solution) => dispatch => {
  dispatch(setResponseLoading());
  return axios.post('/api/enterprises', solution).then(res => dispatch({
    type: ADD_SOLUTION,
    payload: res.data
  }))
};

export const getField = (field, n) => dispatch => {  //add integration for query here
  dispatch(setResponseLoading());
  return axios
  .get(`/api/enterprises/f/${field}/${n}`)
  .then(res =>
    dispatch({
      type: GET_FIELD,
      payload: res.data
    })
  )
};

export const getByID = (id) => dispatch => {  //add integration for query here
  dispatch(setResponseLoading());
  return axios
  .get(`/api/enterprises/i/${id}`)
  .then(res =>
    dispatch({
      type: GET_BYID,
      payload: res.data
    })
  )
};

export const getCustom = (field, value) => dispatch => {
  dispatch(setResponseLoading());
  return axios
    .get(`/api/enterprises/q/${field}/${value}`)
    .then( res => 
      dispatch({
      type: GET_CUSTOM, 
      payload: res.data
      })
    )
}

export const getLatLong = () => dispatch =>{
  return axios
    .get('/api/enterprises/latlong')
    .then(res =>
      dispatch({
        type: GET_FIELD,
        payload: res.data
      }))
}

export const setResponseLoading = () => {
  return{
    type: RESPONSE_LOADING
  }
}