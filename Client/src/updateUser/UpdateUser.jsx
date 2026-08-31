import React, { useEffect, useState } from 'react'
import "./updateUser.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from "react-hot-toast"
import API from "../api"


const updateUser = () => {
    const Users =  {
        name:"",
        email:"",
        address:""
    }

    const [user, setUser] = useState(Users)
    const navigate = useNavigate()
    const {id} = useParams()

    const inputHandler = (e) =>{
       const {name, value} = e.target
       console.log(name, value)
       setUser({...user, [name]:value})
    }

    useEffect(() =>{
     const person=   API.get(`/api/user/${id}`)
        .then((response) =>{
            setUser(response.data)
            console.log("hello");
        })
        
        
        .catch((err) =>{
            console.log(err)
            console.log("hello from error");
            
        })  
    }, [id])


    const submitForm = async(e) => {
        e.preventDefault()
        await API.put(`/api/update/user/${id}`, user)
        .then((response) =>{
           toast.success(response.data.message, {position:"top-right"})
            navigate("/")
        })
        .catch((error) =>{
            console.log(error)
        })
    }
 console.log(user.name);
    return (
       
        
        <div className='addUser'>
             <Link to="/" type="button" className="btn btn-secondary">
             <i class="fa-solid fa-backward-fast"></i> Back
             </Link>
            <h2> Update User</h2>
            <form className='addUserform' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="name">Name</label>
                    <input 
                    type="text"
                    id='name'
                    value={user.name}
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
                    value={user.email}
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
                    value={user.address}
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

export default updateUser
