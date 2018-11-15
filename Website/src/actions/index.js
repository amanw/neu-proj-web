import axios from 'axios';
import authService from 'services/auth-service';
import axiosService from 'services/axios-service';

import { 
         LOGIN_SUCCESS,
         LOGIN_FAILURE,
         LOGOUT,
         FETCH_UNIVERSITIES_SUCCESS,
         FETCH_UNIVERSITIES_INIT,
         FETCH_UNIVERSITIES_FAIL,
         FETCH_UNIVERSITIESBYID_INIT,
         FETCH_UNIVERSITIESBYID_SUCCESS,
         FETCH_UNIVERSITIESBYID_FAIL,
         UNIVERSITIES_ADD_SUCCESS,
         UNIVERSITIES_ADD_FAIL
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

  const universityAreas = [...new Set(universities.map(item => item.UniversityArea))]//universities.map(item=>item.UniversityArea);
  const universityOwners = [...new Set(universities.map(item => item.Owner))];
  return {
    type: FETCH_UNIVERSITIES_SUCCESS,
    universities,
    universityAreas,
    universityOwners
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
    axios.get(url)
    .then(res => res.data )
    .then(universities => dispatch(fetchUniversitiesSuccess(universities)))
    .catch(({response}) => dispatch(fetchUniversitiesFail(response.data.errors)))
  }
}

const universityAddSuccess = () => {
  return {
    type: UNIVERSITIES_ADD_SUCCESS
  }
}

const universityAddFail = (errors) => {
  return {
    type: UNIVERSITIES_ADD_FAIL,
    errors
  }
}


export const universityAdd = (universityData) => {
  return dispatch => {
  return axios.post('/api/v1/universities/create', universityData).then(
    res => res.data).then(dispatch(universityAddSuccess())).catch(({response}) => {
     //Promise.reject(response.data.errors)
      dispatch(universityAddFail(response.data.errors));
    })
  }
}

const fetchUniversitiesByIdInit = () => {
  return {
    type:FETCH_UNIVERSITIESBYID_INIT
  }
}

const fetchUniversitiesByIdSucces = (universityData) => {
  return {
    type:FETCH_UNIVERSITIESBYID_SUCCESS,
    universityData
  }
}

const fetchUniversitiesByIdFail = (errors) => {
  return {
    type:FETCH_UNIVERSITIESBYID_FAIL,
    errors
  }
}

export const fetchUniversitiesById = (universityId) => {
  const url = `/api/v1/universities/${universityId}`;
  return dispatch => {
    dispatch(fetchUniversitiesByIdInit());
    axios.get(url)
    .then(res => res.data )
    .then(universityData => dispatch(fetchUniversitiesByIdSucces(universityData)))
    .catch(({response}) => dispatch(fetchUniversitiesByIdFail(response.data.errors)))
  }
}




