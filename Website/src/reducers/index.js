import {combineReducers} from 'redux';
import {authReducer} from './auth-reducer';
import {universityReducer, universityEditReducer } from './university-reducer'
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth:authReducer,
  form: formReducer,
  universities :universityReducer,
  universityData: universityEditReducer
  // universityAreas: universityAreaReducer,
  // universityOwners: universityOwnerReducer
});

export default rootReducer;
