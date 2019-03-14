import {combineReducers} from 'redux';
import enterpriseReducer from './enterpriseReducer';

export default combineReducers({
  enterpriseData: enterpriseReducer
});