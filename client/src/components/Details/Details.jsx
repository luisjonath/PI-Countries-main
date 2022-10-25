import React, { useEffect } from 'react'
 import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDetail } from '../../actions/index' 
import "../Details/Details.css"

/* Ruta de detalle de país: debe contener

[ ] Los campos mostrados en la ruta principal para cada país (imagen de la bandera, nombre, código de país de 3 letras y continente)
[ ] Código de país de 3 letras (id)
[ ] Capital
[ ] Subregión
[ ] Área (Mostrarla en km2 o millones de km2)
[ ] Población
[ ] Actividades turísticas con toda su información asociada */

const Details = (props) => {

  const dispatch = useDispatch()
  const country = useSelector(state => state.detail)

  useEffect(()=>{
    dispatch(getDetail(props.match.params.id))
  },[dispatch])
    

  return (
    <div className='backgroundDetail'>
      <div className='buttonsDetails'>

       <Link to="/home"><button className='btnHome'>Home</button></Link>
       <Link to="/activities"><button className='btnActivity'>Add Activity</button></Link>
       </div>
       <div className='containerDetail'>
       {country.info? (
        <div className=''>
          <div>
            <div>
              <img src={`${country.info && country.info.flag}`} alt="flag" width={"200"} height="150"></img>
            </div>
            <div className='containerinfo'>
              <h1 className='countryname'>{country.info.name}</h1>
              <label className='countryid'>{country.info.id}</label>
              <br />
              <label className='label'>Capital: {country.info.capital}</label>
              <label className='label'>Subregion: {country.info.subregion}</label>
              <label className='label'>Area: {country.info.area} Km²</label>
              <label className='label'>Population: {country.info.population}</label>
            </div>
            <hr />
            <h3 className='countryactivity'>Activities</h3>
            
            {country.info.activities.length > 0 ? (
              country.info.activities.map((c)=> (
                <div key={c.id} className="containeractivity">
                  <label className='label'>Name: {c.name}</label>
                  <label className='label'>Difficulty: {c.difficulty}</label>
                  <label className='label'>Duration: {c.duration}</label>
                  <label className='label'>Season: {c.season}</label>
                  <hr />
                </div>
              ))
            ) : (
              <label className='label'>Activity not found in this country</label>
            )}
          </div>
        </div>
       ) : ("")}
    </div>
    </div>
  )
}

export default Details