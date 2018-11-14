import axios from 'axios';
import authService from 'services/auth-service';
import axiosService from 'services/axios-service';

import { 
         LOGIN_SUCCESS,
         LOGIN_FAILURE,
         LOGOUT,
         FETCH_UNIVERSITIES_SUCCESS,
         FETCH_UNIVERSITIES_INIT,
         FETCH_UNIVERSITIES_FAIL
         } from './types';

const axiosInstance = axiosService.getInstance();

// AUTH ACTIONS ---------------------------

const loginSuccess = () => {
  const username = authService.getUsername();

  return {
    type: LOGIN_SUCCESS,
    username
  }
}

const loginFailure = (errors) => {
  debugger;
  return {
    type: LOGIN_FAILURE,
    errors
  }
}

export const register = (userData) => {
  return axios.post('/api/v1/users/register', userData).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  )
}

export const checkAuthState = () => {
  return dispatch => {
    if (authService.isAuthenticated()) {
      dispatch(loginSuccess());
    }
  }
}

export const login = (userData) => {
  return dispatch => {
    return axios.post('/api/v1/users/auth', userData)
      .then(res => res.data)
      .then(token => {
        authService.saveToken(token);
        dispatch(loginSuccess());
      })
      .catch(({response}) => {
        debugger;
        dispatch(loginFailure(response.data.errors));
      })
  }
}

export const logout = () => {
  authService.invalidateUser();

  return {
    type: LOGOUT
  }
}

const fetchUniversitiesSuccess = (universities) => {
  return {
    type: FETCH_UNIVERSITIES_SUCCESS,
    universities
  }
}

const fetchUniversitiesInit = () => {
  return {
    type: FETCH_UNIVERSITIES_INIT
  }
}

const fetchUniversitiesFail = (errors) => {
  return {
    type: FETCH_UNIVERSITIES_FAIL,
    errors
  }
}

export const fetchUniversities = () => {
  const url = '/api/v1/universities';
  return dispatch => {
    dispatch(fetchUniversitiesInit());
    console.log(fetchUniversities);
    axios.get(url)
    .then(res => res.data )
    .then(universities => dispatch(fetchUniversitiesSuccess(universities)))
    .catch(({response}) => dispatch(fetchUniversitiesFail(response.data.errors)))
  }
}