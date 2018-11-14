import { FETCH_UNIVERSITIES_SUCCESS,
         FETCH_UNIVERSITIES_FAIL,
         FETCH_UNIVERSITIES_INIT } from '../actions/types';

const INITIAL_STATE = {
    universities : {
        data: [],
        errors: []
    }
}

export const universityReducer = (state = INITIAL_STATE.universities, action) => {
    switch(action.type) {
      case FETCH_UNIVERSITIES_INIT:
        return {...state, data: [], errors: []};
      case FETCH_UNIVERSITIES_SUCCESS:
        return {...state, data: action.universities};
      case FETCH_UNIVERSITIES_FAIL:
        return Object.assign({}, state, {errors: action.errors, data: []});
      default:
        return state;
    }
  }