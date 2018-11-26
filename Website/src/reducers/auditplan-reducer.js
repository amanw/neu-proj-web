import {
        AUDITPLAN_ADD_SUCCESS,
        AUDITPLAN_ADD_FAIL 
       } from '../actions/types'

 const INITIAL_STATE = {
    isAdded : false,
    errors : [],
    auditData:{
      Month: "Select",
      Year: "Select",
      DaysRequired: 0,
      ElapsedMonths: 0,
      RiskFactor: 0,
      RiskLevel: "None"
    }
 }

 export const auditplanReducer = (state = INITIAL_STATE, action) => {
     switch(action.type) {
        case AUDITPLAN_ADD_SUCCESS:
        return Object.assign({}, state, {isAdded: true, errors: [], auditData:action.auditData});
        case AUDITPLAN_ADD_FAIL:
        return Object.assign({}, state, {isAdded: false, errors: action.errors,auditData:[]});
        default:
        return state;
     }
 }