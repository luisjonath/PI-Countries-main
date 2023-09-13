import axios from "axios";
import {
  GET_COUNTRIES,
  GET_DETAIL,
  GET_ACTIVITIES,
  POST_ACTIVITY,
  GET_BY_NAME,
  FILTER_BY_CONTINENT,
  ORDER_BY_POPULATION,
  FILTER_BY_ACTIVITIES,
  ORDER_BY,
} from "./actionTypes";

/* http://localhost:3001 */

const URL = process.env.REACT_APP_API_KEY;

export function getCountries() {
  return async function (dispatch) {
    
      const json = await axios.get(`${URL}/countries`);
      return dispatch({
        type: GET_COUNTRIES,
        payload: json.data,
      });
    
  };
}

export function getDetail(id) {
  return async function (dispatch) {
      const country = await axios.get(`${URL}/countries/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: country.data,
      });
  };
}

export function getActivities() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/activities`);
      return dispatch({
        type: GET_ACTIVITIES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postActivity(payload){
  return async function(dispatch){
    const activity = await axios.post(`${URL}/activities`, payload)
    return activity
  }
}

export function getByName(name) {
  return async function (dispatch) {
    try {
      const country = await axios.get(`${URL}/countries/name?name=${name}`);
      return dispatch({
        type: GET_BY_NAME,
        payload: country.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
}

export function filterByPopulation(){
  return{
    type: "FILTER_BY_POPULATION"
  }
}

export function filterByActivities(payload) {
  return {
    type: FILTER_BY_ACTIVITIES,
    payload,
  };
}

export function orderBy(payload) {
  return {
    type: ORDER_BY,
    payload,
  };
}
