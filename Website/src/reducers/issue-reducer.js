import {
         FETCH_ISSUES_INIT,
         FETCH_ISSUES_SUCCESS,
         FETCH_ISSUES_FAIL,
         FETCH_ISSUESBYID_INIT,
         FETCH_ISSUESBYID_SUCCESS,
         FETCH_ISSUESBYID_FAIL,
         ISSUES_ADD_SUCCESS,
         ISSUES_ADD_FAIL,
         ISSUES_DELETE_SUCCESS,
         ISSUES_DELETE_FAIL,
         ISSUES_UPDATE_FAIL,
         ISSUES_UPDATE_SUCCESS,
         ISSUES_USERS_INIT,
         ISSUES_USERS_SUCCESS,
         ISSUES_USERS_FAIL
   } from '../actions/types'
 
 const INITIAL_STATE = {
 issuesAdd:{
  data:[],
  isAdded : false,
  errors : []
 },
 issues:{
   data:[],
   errors:[],
   issueSingleData:[],
   isEdited:false
 },
 issueUser:{
   emails:[],
   errors:[]
 }
 
 }
 
 export const issueReducer = (state = INITIAL_STATE.issuesAdd, action) => {
 switch(action.type) {
    case ISSUES_ADD_SUCCESS:
    debugger;
    return Object.assign({}, state, {isAdded: true, errors: [], data:action.issueData});
    case ISSUES_ADD_FAIL:
    debugger;
    return Object.assign({}, state, {isAdded: false, errors: action.errors,data:[]});
    default:
    return state;
 }
 }
   
 
 export const issueListReducer = (state = INITIAL_STATE.issues, action) => {
   switch(action.type) {
    case FETCH_ISSUES_INIT:
    return Object.assign({}, state, {data:[],errors:[],issueSingleData:[],isEdited:false})
    case FETCH_ISSUES_SUCCESS:
    return Object.assign({}, state, {data: action.issues,errors:[],issueSingleData:[],isEdited:false})
    case FETCH_ISSUES_FAIL:
    return Object.assign({}, state, {data:[],errors: action.errors,issueSingleData:[],isEdited:false})
    case ISSUES_DELETE_SUCCESS:
    return Object.assign({}, state, {data: state.data.filter(({ _id }) => _id !== action.issueId ),errors:[],issueSingleData:[],isEdited:false})
    case ISSUES_DELETE_FAIL:
    return Object.assign({}, state,{data:action.issues,errors:action.errors,issueSingleData:[],isEdited:false})
    case FETCH_ISSUESBYID_INIT:
    return Object.assign({}, state, {data:[],errors:[],issueSingleData:[],isEdited:false})
    case FETCH_ISSUESBYID_SUCCESS:
    return Object.assign({}, state, {data:[],errors:[],issueSingleData:action.newData,isEdited:false})
    case FETCH_ISSUESBYID_FAIL:
    return Object.assign({}, state, {data:[],errors:action.errors,issueSingleData:[],isEdited:false})
    case ISSUES_UPDATE_SUCCESS:
    return Object.assign({}, state, {data:[],errors:[],issueSingleData:action.updatedIssue,isEdited:true})
    case ISSUES_UPDATE_FAIL:
    return Object.assign({}, state, {data:[],errors:action.errors,issueSingleData:[],isEdited:false})
    // case ISSUES_USERS_INIT:
    // return Object.assign({}, state, {data:[],errors:[],issueData:[],isEdited:false, emails:[]})
    // case ISSUES_USERS_SUCCESS:
    // return Object.assign({}, state, {data:[],errors:[],issueData:action.newData,isEdited:false, emails:action.emails})
    // case ISSUES_USERS_FAIL:
    // return Object.assign({}, state, {data:[],errors:action.errors,issueData:[],isEdited:false, emails:[]})
    default:
    return state;
   }
  }

export const issueUserReducer = (state = INITIAL_STATE.issueUser, action) => {
switch(action.type){
case ISSUES_USERS_INIT:
return Object.assign({}, state, {errors:[], emails:[]})
case ISSUES_USERS_SUCCESS:
return Object.assign({}, state, {errors:[], emails:action.emails})
case ISSUES_USERS_FAIL:
return Object.assign({}, state, {data:[],emails:[]})
default:
return state;
}
}
