import {
   AUDITPLAN_ADD_SUCCESS,
   AUDITPLAN_ADD_FAIL, 
   FETCH_AUDITPLANNEDSTATUS_INIT,
   FETCH_AUDITPLANNEDSTATUS_SUCCESS,
   FETCH_AUDITPLANNEDSTATUS_FAIL,
   FETCH_AUDITPLANS_INIT,
   FETCH_AUDITPLANS_SUCCESS,
   FETCH_AUDITPLANS_FAIL,
   AUDITPLAN_DELETE_SUCCESS,
   AUDITPLAN_DELETE_FAIL,
   FETCH_AUDITPLANBYID_INIT,
   FETCH_AUDITPLANBYID_SUCCESS,
   FETCH_AUDITPLANBYID_FAIL,
   AUDITPLAN_UPDATE_SUCCESS,
   AUDITPLAN_UPDATE_FAIL,
   FETCH_USEREMAILS_INIT,
   FETCH_USEREMAILS_SUCCESS,
   FETCH_USEREMAILS_FAIL
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
  errors:[],
  auditData:[],
  isEdited:false,
  emails:[]
},
auditPlannedStatus:{
  data:[],
  errors:[]
},

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
 return Object.assign({}, state, {data: action.auditPlannedStatus,errors:[]})
 case FETCH_AUDITPLANNEDSTATUS_FAIL:
 return Object.assign({}, state, {data:[],errors: action.errors})
 default:
 return state;
}
}

export const auditplanListReducer = (state = INITIAL_STATE.auditplans, action) => {
  switch(action.type) {
   case FETCH_AUDITPLANS_INIT:
   return Object.assign({}, state, {data:[],errors:[],auditData:[],isEdited:false})
   case FETCH_AUDITPLANS_SUCCESS:
   debugger;
   return Object.assign({}, state, {data: action.auditplans,errors:[],auditData:[],isEdited:false})
   case FETCH_AUDITPLANS_FAIL:
   return Object.assign({}, state, {data:[],errors: action.errors,auditData:[],isEdited:false})
   case AUDITPLAN_DELETE_SUCCESS:
   return Object.assign({}, state, {data: state.data.filter(({ _id }) => _id !== action.auditId ),errors:[],auditData:[],isEdited:false})
   case AUDITPLAN_DELETE_FAIL:
   return Object.assign({}, state,{data:action.auditplans,errors:action.errors,auditData:[],isEdited:false})
   case FETCH_AUDITPLANBYID_INIT:
   return Object.assign({}, state, {data:[],errors:[],auditData:[],isEdited:false})
   case FETCH_AUDITPLANBYID_SUCCESS:
   return Object.assign({}, state, {data:[],errors:[],auditData:action.newData,isEdited:false})
   case FETCH_AUDITPLANBYID_FAIL:
   return Object.assign({}, state, {data:[],errors:action.errors,auditData:[],isEdited:false})
   case AUDITPLAN_UPDATE_SUCCESS:
   return Object.assign({}, state, {data:[],errors:[],auditData:action.updatedaudit,isEdited:true})
   case AUDITPLAN_UPDATE_FAIL:
   return Object.assign({}, state, {data:[],errors:action.errors,auditData:[],isEdited:false})
   case FETCH_USEREMAILS_INIT:
   return Object.assign({}, state, {data:[],errors:[],auditData:[],isEdited:false,emails:[]})
   case FETCH_USEREMAILS_SUCCESS:
   return Object.assign({}, state, {data:[],errors:[],auditData:[],isEdited:false,emails:action.emails})
   case FETCH_USEREMAILS_FAIL:
   return Object.assign({}, state, {data:[],errors:action.errors,auditData:[],isEdited:false,emails:[]})
   default:
   return state;
  }
  }