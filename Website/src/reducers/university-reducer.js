import { FETCH_UNIVERSITIES_SUCCESS,
         FETCH_UNIVERSITIES_FAIL,
         FETCH_UNIVERSITIES_INIT,
         FETCH_UNIVERSITIESBYID_INIT,
         FETCH_UNIVERSITIESBYID_SUCCESS,
         FETCH_UNIVERSITIESBYID_FAIL,
         UNIVERSITIES_ADD_SUCCESS,
         UNIVERSITIES_ADD_FAIL,
         UNIVERSITIES_UPDATE_FAIL,
         UNIVERSITIES_UPDATE_SUCCESS,        
         UNIVERSITIES_DELETE_SUCCESS
        } from '../actions/types';

const INITIAL_STATE = {
    universities : {
        data: [],
        universityAreas:[],
        universityOwners:[],
        errors: [],
        redirectAdd:false,
        redirectEdit:false

    },
    universityData : {
        data: [],
        errors: [],
        redirectEdit:false
    }
}

export const universityReducer = (state = INITIAL_STATE.universities, action) => {
  
    switch(action.type) {
      case FETCH_UNIVERSITIES_INIT:
       return Object.assign({}, state, {data:[], universityAreas:[], universityOwners:[], errors:[], redirectAdd:false,redirectEdit:false})
      case FETCH_UNIVERSITIES_SUCCESS:
       return Object.assign({}, state,{data: action.universities, universityAreas: action.universityAreas, universityOwners: action.universityOwners, errors:[], redirectAdd:false, redirectEdit:false});
      case FETCH_UNIVERSITIES_FAIL:
       return Object.assign({}, state, {errors: action.errors, data: [], universityOwners: [], universityAreas: [], redirectAdd:false, redirectEdit:false});
      case UNIVERSITIES_ADD_SUCCESS:
       return Object.assign({}, state, {errors: [], data: [], universityOwners: [], universityAreas: [], redirectAdd:true, redirectEdit:false});
      case UNIVERSITIES_ADD_FAIL:
       return Object.assign({}, state, {errors: action.errors, data: [], universityOwners: [], universityAreas: [], redirectAdd:false, redirectEdit:false});
      case UNIVERSITIES_UPDATE_SUCCESS:
       return Object.assign({}, state, {errors: [], data: [], universityOwners: [], universityAreas: [], redirectAdd:false, redirectEdit:true});
      case UNIVERSITIES_UPDATE_FAIL:
       return Object.assign({}, state, {errors: action.errors, data: [], universityOwners: [], universityAreas: [], redirectAdd:false,redirectEdit:false});
      case UNIVERSITIES_DELETE_SUCCESS:
      var test = state.data.filter(({ _id }) => _id !== action.universityId);
      return Object.assign({}, state, {errors: [], data: state.data.filter(({ _id }) => _id !== action.universityId ), universityOwners: [], universityAreas: [], redirectAdd:false,redirectEdit:false});
      default:
        return state;
    }
  }

  export const universityEditReducer = (state = INITIAL_STATE.universityData, action) => {
  
    switch(action.type) {
      case FETCH_UNIVERSITIESBYID_INIT:
        //return {...state, data: [], errors: []};
        return Object.assign({}, state, {data:[], errors:[], redirectEdit:false})
      case FETCH_UNIVERSITIESBYID_SUCCESS:
        return Object.assign({}, state,{data: action.universityData, errors:[], redirectEdit:false});
      case FETCH_UNIVERSITIESBYID_FAIL:
        return Object.assign({}, state, {errors: action.errors, data: [], redirectEdit:false});
      default:
        return state;
    }
  }




