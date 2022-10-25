import React from 'react'
import { Link } from 'react-router-dom'
import "../LandingPage/LandingPage.css"

const LandingPage = () => {
  return (
    <div className='background'>
        <div className='container'>
            <h4 className='developed'>developed By luisjonath</h4>
            <Link to={"/home"}>
                <button className='btn'>home</button>
            </Link>
        </div>
    </div>

  )
}

export default LandingPage