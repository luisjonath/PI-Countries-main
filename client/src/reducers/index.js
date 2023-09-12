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
    FILTER_BY_POPULATION
    } from "../actions/actionTypes"

const initialState = {
    countries: [],
    allCountries: [],
    detail: [],
    activities: [],
}
export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_COUNTRIES:{
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }}
        case GET_DETAIL:{
            return{
                ...state,
                detail: action.payload,
                loading:false
            }}
        case GET_ACTIVITIES:{
            return {
                ...state,
                activities: action.payload,
            }}
        case POST_ACTIVITY:{
            return{
                ...state
            }}
        case GET_BY_NAME:{
            return{
                ...state,
                countries: action.payload
            }}
        case FILTER_BY_CONTINENT:{
            const allCountries = state.allCountries;
            const continentFiltered = action.payload === 'All' ? allCountries :
                allCountries.filter(e => e.continent === action.payload)
            return {
                ...state,
                countries: continentFiltered
            }}
        case ORDER_BY_POPULATION:{
            let orderByPopulation = action.payload === "low" ?
            state.countries.sort(function (a, b) {
                if (a.population > b.population){
                    return 1
                }
                if (b.population > a.population){
                    return -1
                }
                return 0
            }) :
            state.countries.sort(function(a, b) {
                if (a.population > b.population){
                    return -1
                }
                if (b.population > a.population){
                    return 1
                }
                return 0
            })
            return {
                ...state,
                population: orderByPopulation
            }}
        case FILTER_BY_ACTIVITIES:{
            const allActivities = [...state.allCountries]
            const activitiesFiltered = action.payload === 'all' ? allActivities : allActivities.filter((e) => e.activities && e.activities.map((c) => c.name).includes(action.payload))
            return {
              ...state,
              countries: activitiesFiltered
            }
          }
            
          case FILTER_BY_POPULATION:{
            const allPopulation = [...state.allCountries]
            const populationFiltered = allPopulation.filter((e)=> e.population > 200000000)
            return {state,
            countries: populationFiltered
        }
          }

        case ORDER_BY:{
            let orderByCountries = action.payload === "asc" ?
            state.countries.sort(function (a, b) {
                if (a.name > b.name){
                    return 1
                }
                if (b.name > a.name){
                    return -1
                }
                return 0
            }) :
            state.countries.sort(function(a, b) {
                if (a.name > b.name){
                    return -1
                }
                if (b.name > a.name){
                    return 1
                }
                return 0
            })
            return {
                ...state,
                countries: orderByCountries
            }}
        
        default: 
            return state
    }
}