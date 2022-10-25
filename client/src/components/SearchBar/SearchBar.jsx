import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getByName, getCountries } from '../../actions'
import "../SearchBar/SearchBar.css"

const SearchBar = ({setCurrentPage}) => {
  const dispatch = useDispatch();
	const [name, setName] = useState('');
	
	const handleInputChange = (e) => {
		// e.preventDefault();
		setName(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(getByName(name))
		setCurrentPage(1);
		setName('')
	}

	return(
		<div className="">
    	<button onClick={(e) => handleSubmit(e)} className="btnSearch"><i className=""></i>🛬</button>
    	<input onChange={(e) => handleInputChange(e)} type="text" className="search" placeholder="Type to Search..." />
  		</div>
	)
}

export default SearchBar