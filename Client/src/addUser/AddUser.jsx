import React, { useState } from 'react'
import "./adduser.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from "react-hot-toast"
// import API from "../api.js";

const addUser = () => {
    const Users =  {
        name:"",
        email:"",
        address:""
    }

    const [user, setUser] = useState(Users)
    const navigate = useNavigate()

    const inputHandler = (e) =>{
       const {name, value} = e.target
       console.log(name, value)
       setUser({...user, [name]:value})
    }


    const submitForm = async(e) => {
        e.preventDefault()
        await axios.post(`http://localhost:5000/api/user`, user)
        .then((response) =>{
           toast.success(response.data.message, {position:"top-right"})
            navigate("/")
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    return (
        <div className='addUser'>
             <Link to="/" type="button" class="btn btn-secondary">
             <i class="fa-solid fa-backward-fast"></i> Back
             </Link>
            <h2>add User Form</h2>
            <form className='addUserform' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="name">Name</label>
                    <input 
                    type="text"
                    id='name'
                    onChange={inputHandler}
                    name='name'
                    placeholder='Enter Your name'
                    autoComplete='off'
                     />
                </div>

                <div className="inputGroup">
                    <label htmlFor="Email">Email</label>
                    <input 
                    type="email"
                    id='email'
                    name='email'
                    onChange={inputHandler}
                    placeholder='Enter Your Email'
                    autoComplete='off'
                     />
                </div>

                <div className="inputGroup">
                    <label htmlFor="Address">Address</label>
                    <input 
                    type="text"
                    id='address'
                    name='address'
                    onChange={inputHandler}
                    placeholder='Enter Your Address'
                    autoComplete='off'
                     />
                </div>

                <div className="inputGroup">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default addUser
