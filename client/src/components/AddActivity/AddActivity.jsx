import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getActivities, getCountries, postActivity } from '../../actions'
import "../AddActivity/AddActivity.css"

const AddActivity = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector(state => state.countries)
    const activities = useSelector(state => state.activities)
    const [error, setError] = useState({})
    const [activity, setActivity] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
    })
    useEffect(()=>{
        dispatch(getCountries())
        dispatch(getActivities())
    },[])


    function validation(activity){
        let errors = {}
        if(!activity.name){
            errors.name = "How do we call this Activity?"
        }
        if(!activity.difficulty){
            errors.difficulty = "Please select a valid difficulty number from 1 to 5"
        }
        if(!activity.duration){
            errors.duration = "Please select a valid duration number from 1 to 10"
        }
        if(!activity.season){
            errors.season = "Please insert a valid season"
        }
        if(!activity.countries[0]){
            errors.countries = "Please insert a country"
        }
        return errors
    }

    function handleChange(e){
        e.preventDefault()
        setActivity({
            ...activity,
            [e.target.name] : e.target.value
        })
        setError(validation({
            ...activity,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e){
        e.preventDefault()
        setActivity({
            ...activity,
            [e.target.name] : e.target.value
        })
        setError(validation({
            ...activity,
            [e.target.name] : e.target.value
        }))
    }
   
    
    function handleSubmit(e){
        e.preventDefault()
        setError(validation(activity))
        const errors = validation(activity)
        if(Object.values(errors).length === 0){
        dispatch(postActivity(activity))
        alert("Activiy created")
        setActivity({
            name: "",
            difficulty: "",
            duration: "",
            season: "",
            countries: [],
        })
        history.push("/home")
    }
    }

    
    

  return (
    <div className='containeract'>
        <div>
            <div className='btnConainerhome'>
                <Link to={"/home"}>
                    <button className='btnhomeinact'>Home</button>
                </Link>
            </div>
            <div className='container_activity'>
            <h2 className='lettersLabel2'>Create Activity</h2>
                    <div className=''>
                        <form onSubmit={(e)=>handleSubmit(e)}>
                            <div className="">
                                <label className='lettersLabel2'>Activity: </label>
                                <input type="text" value={activity.name} name="name" onChange={(e)=>handleChange(e)} placeholder="Insert a name..." className='activityLabel' />
                                {error.name && (
                                    <p className={"errorValidation"}>{error.name}</p>
                                )}
                            </div>
                            <div className={""}>
                                <label className='lettersLabel2'>Difficulty: </label>
                                <select onChange={(e)=> handleSelect(e)} name="difficulty" className='select2'>
                                    <option value={""} hidden>Select difficulty</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                {error.difficulty && (
                                    <p className={"errorValidation"}>{error.difficulty}</p>
                                )}
                                </div>
                            <div>
                                <label className='lettersLabel2'>Duration: </label>
                                <select onChange={(e)=>handleSelect(e)} name="duration" className='select2'>
                                <option value="" hidden>Select duration</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                </select>
                                {error.duration && (
                                    <p className={"errorValidation"}>{error.duration}</p>
                                )}
                            </div>
                            <div>
                            <label className='lettersLabel2'>Season: </label>
                            <select onChange={(e)=>handleSelect(e)} name="season" className='select2'>
                                <option value="" hidden>Select season</option>
                                <option value="Fall">Fall</option>
                                <option value="Winter">Winter</option>
                                <option value="Spring">Spring</option>
                                <option value="Summer">Summer</option>
                            </select>
                            {error.season && (<p className='errorValidation'>{error.season}</p>)}
                            </div>                 
                            <div>
                            <label className='lettersLabel2'>Country: </label>
                                <select onChange={handleSelect} name="countries" className='select2'>
                                    <option value="" hidden>Select country</option>
                                    {countries.map(e=>(
                                        <option value={e.id} name="countries" key={e.id}>{e.name}</option>
                                    ))}
                                </select>
                                {error.countries && (
                                    <p className={"errorValidation"}>{error.countries}</p>
                                )}
                            </div>
                            
                            <button type='submit' className='btnAddAct'>Add Activity</button>
                            </form>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default AddActivity