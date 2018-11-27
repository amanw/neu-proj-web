import {combineReducers} from 'redux';
import {authReducer} from './auth-reducer';
import {universityReducer, universityEditReducer } from './university-reducer'
import { reducer as formReducer } from 'redux-form';
import {auditplanReducer, auditplanStatusReducer} from './auditplan-reducer'

const rootReducer = combineReducers({
  auth:authReducer,
  form: formReducer,
  universities :universityReducer,
  universityData: universityEditReducer,
  auditPlan: auditplanReducer,
  auditPlanStatus: auditplanStatusReducer
  // universityAreas: universityAreaReducer,
  // universityOwners: universityOwnerReducer
});

export default rootReducer;
