import {combineReducers} from 'redux';
import enterpriseReducer from './enterpriseReducer';
import domainReducer from './domainReducer';
import profileReducer from './profileReducer';
import authReducer from './authReducer';

export default combineReducers({
  enterpriseData: enterpriseReducer,
  domainData: domainReducer,
  profile: profileReducer,
  auth: authReducer
});