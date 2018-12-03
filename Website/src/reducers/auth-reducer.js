import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/types';

const INITIAL_STATE = {
  isAuth: false,
  errors: [],
  data : []
}

export const authReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {isAuth: true, errors: [], data: action.newData});
    case LOGIN_FAILURE:
      return Object.assign({}, state, {errors: action.errors});
    case LOGOUT:
      return Object.assign({}, state, {isAuth: false, data:[]});
    default:
      return state;
  }
}

