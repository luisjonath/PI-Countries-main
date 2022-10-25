import React from 'react'
import "../Pagination/Pagination.css"

const Pagination = ({countriesPerPage, allCountries, paginate}) => {
     const pages = []
    for (let i = 0; i < Math.ceil(allCountries/countriesPerPage); i++) {
        pages.push(i)
        
    }
  return (
    <nav>
        <ul className='ul'>
            {pages?.map((p, i) =>{
                return(
                    <ul key={i} className="">
                        <button className='btnPagination' onClick={() => paginate(p)}>{p}</button>
                        
                    </ul> 
                    
                )
            })}
        </ul>
    </nav>
    
  ) 
  
}

export default Pagination