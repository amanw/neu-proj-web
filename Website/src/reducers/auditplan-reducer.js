import {
        AUDITPLAN_ADD_SUCCESS,
        AUDITPLAN_ADD_FAIL, 
        FETCH_AUDITPLANS_INIT,
        FETCH_AUDITPLANS_SUCCESS,
        FETCH_AUDITPLANS_FAIL,
        FETCH_AUDITPLANBYID_INIT,
        FETCH_UNIVERSITIESBYID_SUCCESS,
        FETCH_AUDITPLANBYID_FAIL,
        FETCH_AUDITPLANNEDSTATUS_INIT,
        FETCH_AUDITPLANNEDSTATUS_SUCCESS,
        FETCH_AUDITPLANNEDSTATUS_FAIL
       } from '../actions/types'

 const INITIAL_STATE = {
    isAdded : false,
    errors : [],
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
       errors:[],
    }

 }

 export const auditplanReducer = (state = INITIAL_STATE, action) => {
     switch(action.type) {
        case AUDITPLAN_ADD_SUCCESS:
        return Object.assign({}, state, {isAdded: true, errors: [], auditData:action.auditData});
        case AUDITPLAN_ADD_FAIL:
        return Object.assign({}, state, {isAdded: false, errors: action.errors,auditData:[]});
        case FETCH_AUDITPLANS_INIT:
        return Object.assign({}, state, {isAdded: false, errors:[]},state.auditplans,{data:[],errors:[]},state.auditData,{data:[],errors:[]},state.auditPlannedStatus,{data:[],errors:[]})
        case FETCH_AUDITPLANS_SUCCESS:
        return Object.assign({}, state, {isAdded: false, errors:[]},state.auditplans,{data:action.auditPlans,errors:[]},state.auditData,{data:[],errors:[]},state.auditPlannedStatus,{data:[],errors:[]})
        case FETCH_AUDITPLANS_FAIL:
        return Object.assign({}, state, {isAdded: false, errors:[]},state.auditplans,{data:[],errors:action.errors},state.auditData,{data:[],errors:[]},state.auditPlannedStatus,{data:[],errors:[]})
        case FETCH_AUDITPLANNEDSTATUS_INIT:
        return Object.assign({}, state, {isAdded: false, errors:[]},state.auditplans,{data:[],errors:[]},state.auditData,{data:[],errors:[]},state.auditPlannedStatus,{data:[],errors:[]})
        case FETCH_AUDITPLANNEDSTATUS_SUCCESS:
        return Object.assign({}, state, {isAdded: false, errors:[]},state.auditplans,{data:[],errors:[]},state.auditData,{data:[],errors:[]},state.auditPlannedStatus,{data:action.auditPlannedStatus,errors:[]})
        case FETCH_AUDITPLANNEDSTATUS_FAIL:
        return Object.assign({}, state, {isAdded: false, errors:[]},state.auditplans,{data:[],errors:[]},state.auditData,{data:[],errors:[]},state.auditPlannedStatus,{data:[],errors:action.errors})
        default:
        return state;
     }
 }