import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

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

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
