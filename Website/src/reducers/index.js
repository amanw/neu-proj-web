import {combineReducers} from 'redux';
import {authReducer} from './auth-reducer';
import {universityReducer} from './university-reducer'
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth:authReducer,
  form: formReducer,
  universities :universityReducer
});

export default rootReducer;
