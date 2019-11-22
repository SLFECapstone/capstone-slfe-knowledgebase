import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_SUCCESS, PROFILE_UPDATING, GET_USERS } from "./types";

export const getUsers = () => dispatch => {  //add integration for query here
  dispatch(setProfileLoading());
  return axios
  .get('/api/users/')
  .then(res =>
    dispatch({
      type: GET_USERS,
      payload: res.data
    })
  )
};

// Get current profile
export const getProfile = (username) => dispatch => {
  dispatch(setProfileLoading());
  console.log(`/api/users/profile/${username}`);
  return axios.get(`/api/users/profile/${username}`).then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  );
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Profile updating
export const setProfileUpdating = () => {
  return {
    type: PROFILE_UPDATING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const updateProfileFunc = (userProfile) => dispatch => {
  dispatch(setProfileUpdating());
  return axios.post('/api/users/updateprofile', { username: userProfile.username, firstname: userProfile.firstname, lastname: userProfile.lastname, organization: userProfile.organization, position: userProfile.position, email: userProfile.email })
    .then(res => 
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: err.response.data
      })
    })
}
