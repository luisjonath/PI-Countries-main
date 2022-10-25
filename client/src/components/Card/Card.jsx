import React from 'react'
import { Link } from 'react-router-dom';
import "../Card/Card.css"

const Card = ({id, flag, name, continent}) => {
  return (
    <div className="containerCard">
        <div className="countryContainer">
          <Link to={`/detail/${id}`}>
            <img src={`${flag}`} alt='image not found' className='flag'  />
          </Link>
        <h3 className='countryName'>{name}</h3>
          <p className='countryContinent'>{continent}</p>
        </div>
    </div>
  );
};


export default Card