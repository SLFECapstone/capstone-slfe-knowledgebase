import {combineReducers} from 'redux';
import enterpriseReducer from './enterpriseReducer';
import domainReducer from './domainReducer';

export default combineReducers({
  enterpriseData: enterpriseReducer,
  domainData: domainReducer
});