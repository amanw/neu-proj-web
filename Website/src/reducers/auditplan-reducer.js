import {
   AUDITPLAN_ADD_SUCCESS,
   AUDITPLAN_ADD_FAIL, 
   FETCH_AUDITPLANNEDSTATUS_INIT,
   FETCH_AUDITPLANNEDSTATUS_SUCCESS,
   FETCH_AUDITPLANNEDSTATUS_FAIL
  } from '../actions/types'

const INITIAL_STATE = {
auditplansAdd:{
 data:[],
 isAdded : false,
 errors : []
},
auditData:{
  data:[],
  errors:[]
},
auditplans:{
  data:[],
  errors:[]
},
auditPlannedStatus:{
  data:[],
  errors:[]
}

}

export const auditplanReducer = (state = INITIAL_STATE.auditplansAdd, action) => {
switch(action.type) {
   case AUDITPLAN_ADD_SUCCESS:
   return Object.assign({}, state, {isAdded: true, errors: [], data:action.auditData});
   case AUDITPLAN_ADD_FAIL:
   return Object.assign({}, state, {isAdded: false, errors: action.errors,data:[]});
   default:
   return state;
}
}

export const auditplanStatusReducer = (state = INITIAL_STATE.auditPlannedStatus, action) => {
switch(action.type) {
 case FETCH_AUDITPLANNEDSTATUS_INIT:
 return Object.assign({}, state, {data:[],errors:[]})
 case FETCH_AUDITPLANNEDSTATUS_SUCCESS:
 debugger;
 return Object.assign({}, state, {data: action.auditPlannedStatus,errors:[]})
 case FETCH_AUDITPLANNEDSTATUS_FAIL:
 return Object.assign({}, state, {data:[],errors: action.errors})
 default:
 return state;
}
}