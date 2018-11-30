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
         UNIVERSITIES_ADD_FAIL,
         UNIVERSITIES_UPDATE_SUCCESS,
         UNIVERSITIES_UPDATE_FAIL,
         UNIVERSITIES_DELETE_FAIL,
         UNIVERSITIES_DELETE_SUCCESS,
         AUDITPLAN_ADD_SUCCESS,
         AUDITPLAN_ADD_FAIL,
         FETCH_AUDITPLANS_INIT,
         FETCH_AUDITPLANS_SUCCESS,
         FETCH_AUDITPLANS_FAIL,
         FETCH_AUDITPLANBYID_INIT,
         FETCH_AUDITPLANBYID_SUCCESS,
         FETCH_AUDITPLANBYID_FAIL,
         FETCH_AUDITPLANNEDSTATUS_INIT,
         FETCH_AUDITPLANNEDSTATUS_SUCCESS,
         FETCH_AUDITPLANNEDSTATUS_FAIL,
         AUDITPLAN_DELETE_SUCCESS,
         AUDITPLAN_DELETE_FAIL,
         AUDITPLAN_UPDATE_SUCCESS,
         AUDITPLAN_UPDATE_FAIL,
         FETCH_USEREMAILS_INIT,
         FETCH_USEREMAILS_SUCCESS,
         FETCH_USEREMAILS_FAIL
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
// Universities Actions
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

const universityUpdateSucces = (updatedUniversity) => {
  return {
    type: UNIVERSITIES_UPDATE_SUCCESS,
    updatedUniversity
  }
}

const universityUpdateFail = (errors) => {
  return {
    type: UNIVERSITIES_UPDATE_FAIL,
    errors
  }
}

export const universityUpdate = (id,updatedUniversity) => dispatch => {
  return axiosInstance.patch(`/universities/${id}`, updatedUniversity)
    .then(res=>res.data)
    .then(updatedUniversity => {
      dispatch(universityUpdateSucces(updatedUniversity));})
    .catch(({response}) => dispatch(universityUpdateFail(response.data.errors)))
}

const universityDeleteSuccess = (universityId) => {
  //alert()
  debugger;
  return {
    type: UNIVERSITIES_DELETE_SUCCESS,
    universityId
  } 
}

const universityDeleteFail = (errors) => {
  return {
    type: UNIVERSITIES_DELETE_FAIL,
    errors
  }
}

export const universityDelete = (universityId) => {
  return  dispatch => {
  axiosInstance.delete(`/universities/${universityId}`)
  .then(res => res.data)
  .then(universities => {
    dispatch(universityDeleteSuccess(universityId));})
    .catch(({response}) => dispatch(universityDeleteFail(response.data.errors)))

}
}

// Audit Planning Actions
const auditAddSuccess = (auditPlan) => {
  return {
    type: AUDITPLAN_ADD_SUCCESS,
    auditPlan

  }
}

const auditAddFail = (errors) =>{
  return {
   type:AUDITPLAN_ADD_FAIL,
   errors
  }
}

export const auditAdd = (auditData) => {
  return dispatch => {
  return axios.post('/api/v1/auditplans/create',auditData)
  .then(res => res.data)
  .then(dispatch(auditAddSuccess(auditData)))
  .catch(({response}) => {
    dispatch(auditAddFail(response.data.errors));
  })
  }
}

const fetchAuditPlansSuccess = (auditplans) => {

  return {
    type: FETCH_AUDITPLANS_SUCCESS,
    auditplans,
  }
}

const fetchAuditPlansInit = () => {
  return {
    type: FETCH_AUDITPLANS_INIT
  }
}

const fetchAuditPlansFail = (errors) => {
  debugger;
  return {
    type: FETCH_AUDITPLANS_FAIL,
    errors
  }
}

export const fetchAuditPlans = () => {
  const url = '/api/v1/auditplans';
  return dispatch => {
    dispatch(fetchAuditPlansInit());
    axios.get(url)
    .then(res => res.data)
    .then(auditplans => dispatch(fetchAuditPlansSuccess(auditplans)))
    .catch(({response}) => dispatch(fetchAuditPlansFail(response.data.errors)))
  }
}

const fetchAuditPlannedStatusSuccess = (auditPlannedStatus) => {

  return {
    type: FETCH_AUDITPLANNEDSTATUS_SUCCESS,
    auditPlannedStatus,
  }
}

const fetchAuditPlannedStatusInit = () => {
  return {
    type: FETCH_AUDITPLANNEDSTATUS_INIT
  }
}

const fetchAuditPlannedStatusFail = (errors) => {
  return {
    type: FETCH_AUDITPLANNEDSTATUS_FAIL,
    errors
  }
}

export const fetchAuditPlannedStatus = (status) => {
  const url = `/api/v1/auditplans/getStatus/${status}`;
  return dispatch => {
    dispatch(fetchAuditPlannedStatusInit());
    axios.get(url)
    .then(res => res.data )
    .then(auditPlannedStatus => dispatch(fetchAuditPlannedStatusSuccess(auditPlannedStatus)))
    .catch(({response}) => dispatch(fetchAuditPlannedStatusFail(response.data.errors)))
  }
}

const auditDeleteSuccess = (auditId) => {
  return {
    type: AUDITPLAN_DELETE_SUCCESS,
    auditId
  } 
}

const auditDeleteFail = (errors) => {
  return {
    type: AUDITPLAN_DELETE_FAIL,
    errors
  }
}

export const auditDelete = (auditId) => {
  return  dispatch => {
  axiosInstance.delete(`/auditplans/${auditId}`)
  .then(res => res.data)
  .then(audits => {
    dispatch(auditDeleteSuccess(auditId));})
    .catch(({response}) => dispatch(auditDeleteFail(response.data.errors)))

}
}


const fetchAuditPlansByIdInit = () => {
  return {
    type:FETCH_AUDITPLANBYID_INIT
  }
}

const fetchAuditPlansByIdSucces = (auditData) => {
  debugger;
  var value_array = auditData.NextAuditDate.split('-');
  var newData = {
    Month:value_array[0],
    Year:value_array[1],
    DaysRequired:auditData.DaysRequired,
    ElapsedMonths:auditData.ElapsedMonths,
    RiskFactor:auditData.RiskFactor,
    RiskLevel:auditData.RiskLevel,
    unversitydata_id: auditData.unversitydata_id,
    status:auditData.status
  };
  return {
    type:FETCH_AUDITPLANBYID_SUCCESS,
    newData
  }
}

const fetchAuditPlansByIdFail = (errors) => {
  return {
    type:FETCH_AUDITPLANBYID_FAIL,
    errors
  }
}

export const fetchAuditPlansById = (auditId) => {
  const url = `/api/v1/auditplans/audit/${auditId}`;
  return dispatch => {
    dispatch(fetchAuditPlansByIdInit());
    axios.get(url)
    .then(res => res.data)
    .then(auditData => dispatch(fetchAuditPlansByIdSucces(auditData)))
    .catch(({response}) => dispatch(fetchAuditPlansByIdFail(response.data.errors)))
  }
}


const auditPlanUpdateSucces = (updatedaudit) => {
  debugger;
  return {
    type: AUDITPLAN_UPDATE_SUCCESS,
    updatedaudit
  }
}

const auditPlanUpdateFail = (errors) => {
  debugger;
  return {
    type: AUDITPLAN_UPDATE_FAIL,
    errors
  }
}

export const auditPlanUpdate = (id,updatedauditPlan) => dispatch => {
  debugger;
  return axiosInstance.patch(`/auditplans/${id}`, updatedauditPlan)
    .then(res=>console.log(res.data))
    .then(x => console.log(x))
    .then(updatedaudit => {
      dispatch(auditPlanUpdateSucces(updatedaudit));})
    .catch(({response}) => dispatch(auditPlanUpdateFail(response.data.errors)))
}


const fetchUserEmailsInit = () => {
  return {
    type: FETCH_USEREMAILS_INIT
  }
}

const fetchUserEmailsFail = (errors) => {
  return {
    type: FETCH_USEREMAILS_FAIL,
    errors
  }
}

const fetchUserEmailsSuccess = (emails) => {
  return {
    type: FETCH_USEREMAILS_SUCCESS,
    emails
  }
}

export const fetchUserEmails = () => {
  const url = '/api/v1/auditplans/users';
  return dispatch => {
    dispatch(fetchUserEmailsInit());
    axios.get(url)
    .then(res => res.data)
    .then(emails => dispatch(fetchUserEmailsSuccess(emails)))
    .catch(({response}) => dispatch(fetchUserEmailsFail(response.data.errors)))
  }
}







