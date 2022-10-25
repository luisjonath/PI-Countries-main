import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {filterByActivities, filterByContinent, getActivities, getByName, getCountries, orderBy, orderByPopulation} from "../../actions/index"
import Card from "../Card/Card"
import SearchBar from '../SearchBar/SearchBar'
import Pagination from '../Pagination/Pagination'
import Loading from '../Loading/Loading'
import "../Home/Home.css"


const Home = () => {
  
  const dispatch = useDispatch()
   const allCountries = useSelector((state)=> state.countries)
   const activities = useSelector((state)=> state.activities)
   const [currentPage, setCurrentPage] = useState(1)
   const [countriesPerPage, setCountriesPerPage] = useState(10)
   const lastCountry = currentPage === 1 ? 9 : currentPage * countriesPerPage // 10
   const firstCountry = currentPage === 1 ? 0 : lastCountry - countriesPerPage // 0
   const currentCountries = allCountries.slice(firstCountry, lastCountry);
 
   const paginate = (pages) =>{
    setCurrentPage(pages)
   }

  useEffect(()=>{
    dispatch(getCountries())
    dispatch(getActivities())
  },[dispatch])

  const [order, setOrder] = useState("")

  function handleClick(e){
    e.preventDefault()
    dispatch(getCountries())
  }

  function handleOrder(e) {
    dispatch(orderBy(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
  }
  function handleOrderByPopulation(e){
    dispatch(orderByPopulation(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
  }

  function handleFilterByActivity(e){
    e.preventDefault(e)
    dispatch(filterByActivities(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
  }
  function handleFilterByContinent(e){
    e.preventDefault(e)
    dispatch(filterByContinent(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
  }


  return (
    <div className='backgroundHome'>
      <div className='container_navbar'>
      <div className='orders'>
      <label className='lettersLabel'>Alphabetic Order: </label>
      <select onChange={(e)=>handleOrder(e)} className="select">
        <option value="" hidden>to select</option>
        <option value="asc">Ascending</option>
        <option value="des">Descending</option>
      </select>
      <label className='lettersLabel'> Population Order:</label>
      <select onChange={(e)=>handleOrderByPopulation(e)} className="select">
        <option value="" hidden>to select</option>
        <option value="high">Highest Population</option>
        <option value="low">Lowest Population</option>
      </select>
      </div>
      <div className='filters'>
        <label className='lettersLabel'>Continent Filter: </label>
        <select onChange={(e)=>handleFilterByContinent(e)} className="select">
          <option value="" hidden>to select</option>
          <option value="All" key="All">All continents</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
        </select>
        <label className='lettersLabel'> Activity Filter: </label>
        <select onChange={(e)=>handleFilterByActivity(e)} className="select">
        <option value="all">All activities</option>
        {activities && activities.map((e) =>(
          <option value={e.name} key={e.id}>{e.name}</option>
        ))}
        </select>
        </div>
        <div>
        <button onClick={(e)=>handleClick(e)} className="reloadbtn">Reload countries</button>
        </div>
        <div>
          <Link to={"/activities"}>
            <button className='btnCreate'>Create Activity</button>
          </Link>
        </div>
          <div>
       <SearchBar setCurrentPage={setCurrentPage}/>

          </div>
          </div>
        <h1 className='countryApp'>Countries App</h1>
        <div>
          </div>
          <Pagination 
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            paginate={paginate}
          />
          <div className='countries_container'>
          {currentCountries.length === 0 
          ? <Loading />
          :  currentCountries.map((c) => (
              <Card
                key={c.id}
                id={c.id}
                name={c.name}
                flag={c.flag}
                continent={c.continent}
              />
            ))}
          </div>
        </div>
  )
}

export default Home